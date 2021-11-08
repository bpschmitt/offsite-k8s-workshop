## 02. Deploy Apps

The apps in this directory can be used to demonstrate various Kubernetes concepts.

|Directory|Description|
---|---
crasher|Used to highlight use of `kubectl describe`, `kubectl logs`, and `kubectl get events`|
nginx|Used to demonstrate New Relic's Infrastructure On-Host Integrations as well as the custom metrics adapter for Horizontal Pod Autoscaling|
nodejs_lic|Used to demonstrate New Relic APM, Logs-in-Context, and the connectec experience in the Kubernetes Cluster Explorer|
prometheus_metrics|Provides custom Prometheus metrics exposed on a `/metrics` endpoint that can be scraped by the Prometheus OpenMetrics Integration (POMI)|