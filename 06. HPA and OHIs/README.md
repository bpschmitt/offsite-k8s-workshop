## 06. Horizontal Pod Autoscaling (HPA) and On-Host Integrations (OHIs)

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

## Horizontal Pod Autoscaling

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

## Updating the `newrelic-bundle` Helm release

Now that you've modified your `values.yaml` for both the NGINX OHI and the metrics adapter, it's time to update the `newrelic-bundle` release with the new configuration.

```
$ helm upgrade newrelic-bundle newrelic/nri-bundle -n newrelic --reuse-values -f ./values.yaml
```


```
from Metric select average(nginx.server.net.requestsPerSecond) where k8s.namespaceName = 'demo' since 30 minutes ago TIMESERIES 30 seconds
```

```
FROM K8sPodSample select uniqueCount(podName) as 'Pod Count' where podName like 'nginx%' since 30 minutes ago TIMESERIES 30 seconds
```

```
kubectl get --raw "/apis/external.metrics.k8s.io/v1beta1/namespaces/*/nginx_average_requests?labelSelector=k8s.namespaceName=demo" | jq .
```