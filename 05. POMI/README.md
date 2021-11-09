## 04. Working with the Prometheus OpenMetrics Integration (POMI)

```
$ kubectl port-forward pod/prometheus-demo-metrics-6bbbc65c75-9xvwf -n demo 9999:8080
Forwarding from 127.0.0.1:9999 -> 8080
Forwarding from [::1]:9999 -> 8080
```

```
$ kubectl label svc prometheus-demo -n demo prometheus.io/scrape=true
```

```
FROM Metric select uniques(metricName) where instrumentation.name = 'nri-prometheus' and clusterName = 'minikube-lab' and metricName like 'python%'
```

```
http://localhost:9999/metrics
```

![Prometheus Metrics](https://p191.p3.n0.cdn.getcloudapp.com/items/2NuPvdZ4/1dff9035-e7e6-4990-a1df-9c31371ff0c3.jpg?v=6bcd82fe330e8c18bee65e7878a048e0)

## To-Do: Better NRQL Query Examples for all Metric types

* Reference: https://docs.newrelic.com/docs/infrastructure/prometheus-integrations/view-query-data/translate-promql-queries-nrql/