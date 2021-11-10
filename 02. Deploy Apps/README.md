## 02. Deploy Apps

In this module, you'll deploy some demo apps which will be used to illustrate the various concepts found within this workshop.

|Directory|Description|
---|---
crasher|Used to highlight use of `kubectl describe`, `kubectl logs`, and `kubectl get events`|
nginx|Used to demonstrate New Relic's Infrastructure On-Host Integrations as well as the custom metrics adapter for Horizontal Pod Autoscaling|
nodejs_lic|Used to demonstrate New Relic APM, Logs-in-Context, and the connectec experience in the Kubernetes Cluster Explorer|
prometheus_metrics|Provides custom Prometheus metrics exposed on a `/metrics` endpoint that can be scraped by the Prometheus OpenMetrics Integration (POMI)|
---


### Create a `demo` namespace

Use the following command to create a namespace for your apps.

```
[~]$ kubectl create namespace demo
namespace/demo created
```

### Run the `deploy-apps.sh` shell script

```
[~]$ ./deploy-apps.sh myDemoApp
deployment.apps/crasher created
configmap/nginx-conf created
deployment.apps/nginx created
service/nginx created
deployment.apps/prometheus-demo-metrics created
service/logs-demo created
deployment.apps/logs-demo created
```

### Check Pod Status

Your output should look similar to this.  Both the `crasher-*` pod and the `logs-demo-*` pod are expected to have errors.  Don't panic, we'll be fixing the `logs-demo-*` deployment in just a bit.  `crasher-*` will always be...crashing.

```
[~]$ kubectl get pods -n demo
NAME                                       READY   STATUS                       RESTARTS   AGE
crasher-6f4bccdddd-7hnp8                   0/1     Error                        2          24s
logs-demo-f764d7569-cvh89                  0/1     CreateContainerConfigError   0          23s
nginx-557dcdb56b-v4d4c                     1/1     Running                      0          23s
prometheus-demo-metrics-6bbbc65c75-9xvwf   1/1     Running                      0          23s
```

### Conclusion

In this module, you deployed some demo apps to a namespace called `demo`.  If you used the shell script to deploy the apps, be sure to check out the contents of the script and take note of the commands that were used.

---


Let's jump over to [03. Troubleshooting section](), learn some new commands, and fix the `logs-demo-*` pod.