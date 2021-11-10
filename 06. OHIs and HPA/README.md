## 06. On-Host Integrations (OHIs) and Horizontal Pod Autoscaling (HPA)

In this module, you will:

* Configure the NGINX OHI to auto-discover NGINX instances running in the cluster
* Enable the custom metrics adapter for HPA and configured a custom metric (`nginx_average_requests` for auto-scaling)
* Create the `nginx-scaler` HPA resource
* Generate load to the `nginx` service in order to trigger the auto-scaling process

__Reading__:

* Learn about the [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
* Learn about options when running [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/)
* NGINX OHI config [examples](https://github.com/newrelic/nri-nginx/blob/master/nginx-config.yml.k8s_sample)

---

New Relic's On-Host Integrations use [Kubernetes service auto-discovery](https://github.com/newrelic/nri-discovery-kubernetes) to identify available 3rd party services running in the cluster.  All supported OHIs are shipped with the New Relic Infrastructure agent in a Kubernetes cluster.  All you need to do is provided a valid configuration when you install the `newrelic-infrastructure` subchart.

## Enabling the NGINX OHI

In the `values.yaml` file found in this directory, you'll see a section of the config called `newrelic-infrastructure`.  Any configuration options defined in this section are passed down to the the `newrelic-infrastructure` subchart from `nri-bundle`.  Uncomment the `newrelic-infrastructure` section and everything nested underneath it.

A few things to call out:
* `name` - this is the integration file name that will reside in `/etc/newrelic-infra/integrations.d` inside each New Relic Infrastructure container.
* `nri-discovery-kubernetes` - this is used to auto-discover the services in the cluster matching the label `app: nginx`.
* `integrations` - this is where you configure the integration details.  Note that the variable `${discovery.ip}` is used in the NGINX status page URL.  This is dynamic for every instance that matches the `app: nginx` label.

```
newrelic-infrastructure:
  integrations_config:
    - name: nri-nginx.yaml
      data:
        discovery:
          command:
            # Use the following optional arguments:
            # --namespaces: Comma separated list of namespaces to discover pods on
            # --tls: Use secure (TLS) connection
            # --port: Port used to connect to the kubelet. Default is 10255
            exec: /var/db/newrelic-infra/nri-discovery-kubernetes
            match:
              label.app: nginx
        integrations:
          - name: nri-nginx
            env:
              # If you're using ngx_http_api_module be certain to use the full path up to and including the version number
              # Use the discovered IP as the host address
              STATUS_URL: http://${discovery.ip}/nginx_status
              # Name of Nginx status module OHI is to query against. discover | ngx_http_stub_status_module | ngx_http_status_module | ngx_http_api_module
              STATUS_MODULE: discover
              METRICS: 1
              REMOTE_MONITORING: 1
```

## Custom Metrics Adapter for Horizontal Pod Autoscaling

[New Relic's Kubernetes Metric Adapter](https://github.com/newrelic/helm-charts/tree/master/charts/newrelic-k8s-metrics-adapter) enables developers to scale their deployments using the Kubernetes [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).  Imagine needing to dynamically scale your services to support an increase in throughput during your biggest day?  With the metric adapter, you can now query New Relic using NRQL and use the value returned for evaluation within HPA.

![Image](https://docs.newrelic.com/550f34a8085779979e628c68bc885d1a/adapter-diagram.svg)

In the `values.yaml` file in this directory, uncomment the `newrelic-k8s-metrics-adapter` section and everything nested underneath it.  You'll need to provide the following:

* `personalAPIKey` - this is NOT a license key.  This is a User API key.
* `accountID` - this is the New Relic Account ID to query.

The metric adapter uses the [Nerdgraph API](https://docs.newrelic.com/docs/apis/nerdgraph/get-started/introduction-new-relic-nerdgraph/) to query New Relic using NRQL.  In the example, you'll be creating a custom metric to be stored in Kubernetes called `nginx_average_requests` and the value for this metric will be the result of the supplied NRQL query.

```
newrelic-k8s-metrics-adapter:
  personalAPIKey: <REDACTED>
  config:
    accountID: <REDACTED>
    externalMetrics:
      nginx_average_requests:
        query: "from Metric select average(nginx.server.net.requestsPerSecond) since 2 minutes ago"
```


## Upgrading the `newrelic-bundle` Helm release

Now that you've modified your `values.yaml` for both the NGINX OHI and the metrics adapter, it's time to upgrade the `newrelic-bundle` release with the new configuration.

You'll notice this command is a lot shorter than the original one from the Guided Install UI.  That's because you're upgrading an existing release and you've moved all configuration to a `values.yaml` file. A couple new options are being used for the [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/):

* `--reuse-values` - when upgrading, reuse the last release's values and merge in any overrides from the command line via `--set` and `-f`.
* `-f` - specify values in a YAML file or a URL (can specify multiple)
```
$ helm upgrade newrelic-bundle newrelic/nri-bundle -n newrelic --reuse-values -f ./values.yaml
Release "newrelic-bundle" has been upgraded. Happy Helming!
NAME: newrelic-bundle
LAST DEPLOYED: Tue Nov  9 21:46:03 2021
NAMESPACE: newrelic
STATUS: deployed
REVISION: 7
TEST SUITE: None
```

You can run a quick validation using NRQL that the NGINX OHI has been configured successfully.  You should see rows returned in query builder.
```
FROM NginxSample select podName, net.connectionsActive where clusterName = 'minikube-workshop'
```

## Create `nginx-scaler` HPA resource

Congrats! You've configured the NGINX OHI and the custom metrics adapter.  Now it's time to create the HPA resource in your cluster so that your NGINX deployment will autoscale based on metric data that exists in New Relic.

Let's take a look at the `hpa.yaml` file.  In this file, you're creating a custom metric called `nginx_average_requests` which is created and stored in Kubernetes.  Kubernetes will auto-scale the `nginx` deployment up or down so that the value returned by the NRQL query is below the `target.value` of `2`.

```
kind: HorizontalPodAutoscaler
apiVersion: autoscaling/v2beta2
metadata:
  name: nginx-scaler
  namespace: demo
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  minReplicas: 1
  maxReplicas: 10
  metrics:
    - type: External
      external:
        metric:
          name: nginx_average_requests
          selector:
            matchLabels:
              k8s.namespaceName: demo
        target:
          type: Value
          value: 2
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 90
    scaleUp:
      stabilizationWindowSeconds: 90
```

You can query the Kubernetes API directly to see the values being evaluated.

```
$ kubectl get --raw "/apis/external.metrics.k8s.io/v1beta1/namespaces/*/nginx_average_requests?labelSelector=k8s.namespaceName=demo"

{"kind":"ExternalMetricValueList","apiVersion":"external.metrics.k8s.io/v1beta1","metadata":{},"items":[{"metricName":"nginx_average_requests","metricLabels":{},"timestamp":"2021-11-10T04:25:00Z","value":"33333u"}]}
```

Run the following command to create the HPA resource in your cluster.

```
$ kubectl apply -f hpa.yaml -n demo
```

Validate that it was created and note the existing values under the `TARGETS` section.  Kubernetes uses `milliunits` so you'll see strange numbers like `3400m` show up here.  For illustration purposes, this means `3400 / 1000 = 3.4`.

Keep this command handy, you'll come back to it.

```
$ kubectl get hpa nginx-scaler -n demo
NAME           REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
nginx-scaler   Deployment/nginx   34m/2     1         10        1          15m
```

## Generate Load

Now that you've configured the NGINX OHI, configured the metrics adapter, and created the HPA resource - it's time to watch the magic happen.  Use the command below to create a load generation pod in your cluster which will hit the `nginx` service endpoint with a bunch of curl commands.

```
$ kubectl apply -f loadgen.yaml -n demo
pod/load-gen created
```

Immediately after starting your load gen, run this command to watch the `nginx-scaler` HPA resource as it scales up your `nginx` deployment.

```
$ kubectl get hpa -n demo -w
NAME           REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
nginx-scaler   Deployment/nginx   34m/2     1         10        1          40m
nginx-scaler   Deployment/nginx   192m/2    1         10        1          40m
nginx-scaler   Deployment/nginx   1367m/2   1         10        1          40m
nginx-scaler   Deployment/nginx   2534m/2   1         10        1          41m
nginx-scaler   Deployment/nginx   3709m/2   1         10        1          41m
nginx-scaler   Deployment/nginx   4717m/2   1         10        1          42m
nginx-scaler   Deployment/nginx   4717m/2   1         10        2          42m
nginx-scaler   Deployment/nginx   4209m/2   1         10        2          43m
nginx-scaler   Deployment/nginx   4209m/2   1         10        2          43m
nginx-scaler   Deployment/nginx   2467m/2   1         10        3          44m
nginx-scaler   Deployment/nginx   2467m/2   1         10        4          44m
nginx-scaler   Deployment/nginx   1880m/2   1         10        4          44m
```

You can watch this process visually by creating a multi-query chart in New Relic's query builder with the following NRQL queries:

```
from Metric select average(nginx.server.net.requestsPerSecond) where k8s.namespaceName = 'demo' since 30 minutes ago TIMESERIES 30 seconds
```

```
FROM K8sPodSample select uniqueCount(podName) as 'Pod Count' where podName like 'nginx%' since 30 minutes ago TIMESERIES 30 seconds
```

Here you can see as the average throughput increases, HPA kicks in and scales the deployment until the average throughput is below the target value of 2.

![Autoscale](https://p191.p3.n0.cdn.getcloudapp.com/items/DOu6mbWZ/68c68579-6c95-4940-8a88-923c2f607bb9.jpg?v=8db29e4462645dc093dbc5f445752972)

## Conclusion

In this module, you completed the following:

* Configured the NGINX OHI to auto-discover NGINX instances running in the cluster
* Enabled the custom metrics adapter for HPA and configured a custom metric (`nginx_average_requests` for auto-scaling)
* Created the `nginx-scaler` HPA resource
* Generated load to the `nginx` service in order to trigger the auto-scaling process