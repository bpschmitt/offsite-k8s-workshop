## 04. Working with the Prometheus OpenMetrics Integration (POMI)

Prometheus metrics are a standard when it comes to Kubernetes clusters.  Many resources in a cluster expose Prometheus metrics using a `/metrics` endpoint.  Solutions like New Relic, Prometheus Server, and others are able to "scrape" these endpoints and collect metrics at various intervals.

One of the main sources of metrics for New Relic's Infrastructure agent is Kube State Metrics (KSM).  This is an optional install as part of the Guided Install and often times, a KSM instance may already exist in the cluster.

## Raw metrics exposed by endpoints

Use the following command to identify the name of the KSM service in the `newrelic` name space.  Note that this service is exposing port 8080.  You'll need this in the next command.

```
$ kubectl get svc -n newrelic
NAME                                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
newrelic-bundle-kube-state-metrics       ClusterIP   10.107.95.111   <none>        8080/TCP   15h
newrelic-bundle-nri-metadata-injection   ClusterIP   10.105.206.11   <none>        443/TCP    15h
```

By using `kubectl port-forward`, you can forward ports from your local machine to cluster end points like the KSM service.  In this example, you'll forward the KSM service on port 8080 to your local machine on port 9999.  The local port is configurable so feel free to choose your own.  Just be careful not to choose something that's already in use.

```
$ kubectl port-forward svc/newrelic-bundle-kube-state-metrics -n newrelic 9999:8080
Forwarding from 127.0.0.1:9999 -> 8080
Forwarding from [::1]:9999 -> 8080
```


Open a browser and visit `http://localhost:9999/metrics`.  You should now see a list of metrics that the KSM service is exposing within the cluster.  As previously mentioned, New Relic's Infrastructure agent uses these metrics as part of its normal data collection process.

![KSM](https://p191.p3.n0.cdn.getcloudapp.com/items/bLudxKED/4368687f-5551-4462-b1b9-066f98ee134b.jpg?v=2017c2177ba2662fc2a06454e133824a)

Use Control + C to cancel the `kubectl port-forward` command in your terminal.

## Applying Kubernetes Labels

But what if you've built an application that exposes custom Prometheus metrics?  This is where the Prometheus OpenMetrics Integration (POMI) can provide additional value.  It's able to dynamically collect any Prometheus metric exposed by an endpoint with a specific label or annotation.  The default label is `prometheus.io/scrape=true`, but can be customized in the POMI configuration.

Run the following NRQL query in Query Builder.  You'll see that nothing is returned.  This is because our application that is exposing the custom Prometheus metrics does not have the proper label, therefore, POMI is not able to discover the `/metrics` endpoint.

```
FROM Metric select uniques(metricName) where instrumentation.name = 'nri-prometheus' and clusterName = 'minikube-lab' and metricName like 'python%' since 2 minutes ago
```
![Query Builder](https://p191.p3.n0.cdn.getcloudapp.com/items/qGuRrOy1/f82df250-3ca6-4839-8aab-19650cb55267.jpg?v=b5b4307b9867cb29c0522a008a0ee363)

Use the following command to apply the `prometheus.io/scrape=true` label to the `prometheus-demo` service in the `demo` namespace.  POMI will now be able to discover this service by its label and immediately start collecting the metrics it exposes when the next scrape occurs.

```
$ kubectl label svc prometheus-demo -n demo prometheus.io/scrape=true
```
Now re-run the NRQL query and what do you see?

_(It may take 30 seconds due to the polling interval - be patient and run the query a few times if you don't see anything returned immediately)_

```
FROM Metric select uniques(metricName) where instrumentation.name = 'nri-prometheus' and clusterName = 'minikube-workshop' and metricName like 'python%' since 2 minutes ago
```
![Moar metrics](https://p191.p3.n0.cdn.getcloudapp.com/items/7KuAq6qZ/0ac47e14-a90b-4d4b-b6d0-0a321d15b519.jpg?v=68192dbc4f559d64744d1c1d0988be26
)

## Updating the POMI configuration to Filter Metrics

What if you only want to collect a subset of metrics in the cluster?  Open the `values.yaml` file in this directory and find the `nri-prometheus` section.  In this section, you are configuring the `nri-prometheus` subchart to filter out all metrics that have the `python` prefix _except_ `python_my_gauge` and `python_my_counter`.  You're also setting the `scrape_enabled_label` which tells POMI which resources to scrape metrics from in the cluster.

```
nri-prometheus:
  config:
    scrape_enabled_label: prometheus.io/scrape
    transformations:
      - description: "Workshop example"
        ignore_metrics:
          - prefixes:
              - python
            except:
              - python_my_gauge
              - python_my_counter
```
## Upgrading `newrelic-bundle`

In order to make this configuration active, you'll need to upgrade the `newrelic-bundle` again.  Run the command below to apply the changes to your cluster.
```
$ helm upgrade newrelic-bundle newrelic/nri-bundle -n newrelic --reuse-values -f ./values.yaml
Release "newrelic-bundle" has been upgraded. Happy Helming!
NAME: newrelic-bundle
LAST DEPLOYED: Tue Nov  9 12:57:10 2021
NAMESPACE: newrelic
STATUS: deployed
REVISION: 2
TEST SUITE: None
```

A [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/) is an object used to store non-confidential data in key-value pairs.  Pods can consume ConfigMaps as environment variables, command-line arguments, or as configuration files in a volume.

Validate that the changes were made to the `newrelic-bundle-nri-prometheus-config` ConfigMap by running the command below.  You should see the `transformations` section.

```
$ kubectl describe configmap newrelic-bundle-nri-prometheus-config -n newrelic
Name:         newrelic-bundle-nri-prometheus-config
Namespace:    newrelic
Labels:       app.kubernetes.io/instance=newrelic-bundle
              app.kubernetes.io/managed-by=Helm
              app.kubernetes.io/name=nri-prometheus
              app.kubernetes.io/version=2.9.0
              helm.sh/chart=nri-prometheus-1.10.0
Annotations:  meta.helm.sh/release-name: newrelic-bundle
              meta.helm.sh/release-namespace: newrelic

Data
====
config.yaml:
----
cluster_name: minikube-lab
audit: false
insecure_skip_verify: false
require_scrape_enabled_label_for_nodes: true
scrape_enabled_label: prometheus.io/scrape
scrape_endpoints: false
scrape_services: true
transformations:
- description: Workshop example
  ignore_metrics:
  - except:
    - python_my_gauge
    - python_my_counter
    prefixes:
    - python
verbose: false
```
Updating a ConfigMap does not always cause the associated pods to automatically restart and pick up the changes.  Restart the `newrelic-bundle-nri-prometheus-*` pod so that the new configuration is picked up.

```
$ kubectl delete pod newrelic-bundle-nri-prometheus-5544d858fb-rwtf9 -n newrelic
pod "newrelic-bundle-nri-prometheus-5544d858fb-rwtf9" deleted
```

After a minute or so, validate that you're now _only_ seeing the `python_my_gauge` and `python_my_counter` metrics in the following NRQL query.

```
FROM Metric select uniques(metricName) where instrumentation.name = 'nri-prometheus' and clusterName = 'minikube-workshop' and metricName like 'python%' since 1 minutes ago
```
![no more metrics](https://p191.p3.n0.cdn.getcloudapp.com/items/d5u6Nnxq/3c64cf1b-46fa-4f32-942e-f6289628d279.jpg?v=e588426d95bcf87ddd90b605c74168e3)

## To-Do: Better NRQL Query Examples for all Metric types

* Reference: https://docs.newrelic.com/docs/infrastructure/prometheus-integrations/view-query-data/translate-promql-queries-nrql/

## Resources

* Prometheus Live Demo: http://demo.robustperception.io:9090/consoles/index.html