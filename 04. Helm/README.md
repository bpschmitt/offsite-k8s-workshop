## 03. Helm

Quite simply, Helm is a tool that streamlines the installation and management of Kubernetes applications.  It's a package manager, but it's also so much more.  Helm provides a templating engine for your Kubernetes manifest files, complete with support for variables and functions. A "Chart" is a Helm package that contains information sufficient for installing a set of Kubernetes resources into a Kubernetes cluster.

New Relic's [helm chart repo](https://github.com/newrelic/helm-charts) contains the charts used in New Relic's Guided Install for Kubernetes.

Let's get New Relic up and running in your cluster.  Navigate to the Guided Install for Kubernetes in New Relic's UI and follow the prompts.  For this workshop, make the folloing selections:

![Guided Install](https://p191.p3.n0.cdn.getcloudapp.com/items/2NuPPg7z/0c8e6b5e-bd71-4fca-9fc0-5add7cfb5a4f.jpg?v=0981942fbdfb62d1d0aefd320e8cf2d1)

When you get to the `Choose install method` prompt, you should see a command that looks similar to this.  Note that the `--set` command is being used to configure specific chart variables during the install process.  These variables (e.g. `prometheus.enabled=true`) are enabling [subcharts](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/) in the `nri-bundle` chart. You're also setting a `global.cluster` name and a `global.licenseKey` used by all subcharts.

Copy the command and run it on your command line to install New Relic in your cluster.

```
$ helm repo add newrelic https://helm-charts.newrelic.com && helm repo update && \
kubectl create namespace newrelic ; helm upgrade --install newrelic-bundle newrelic/nri-bundle \
 --set global.licenseKey=<REDACTED> \
 --set global.cluster=minikube-lab \
 --namespace=newrelic \
 --set newrelic-infrastructure.privileged=true \
 --set ksm.enabled=true \
 --set prometheus.enabled=true \
 --set kubeEvents.enabled=true \
 --set logging.enabled=true
"newrelic" already exists with the same configuration, skipping
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "descheduler" chart repository
...Successfully got an update from the "pixie-operator" chart repository
...Successfully got an update from the "pixie" chart repository
...Successfully got an update from the "grafana" chart repository
...Successfully got an update from the "prometheus-community" chart repository
...Successfully got an update from the "newrelic" chart repository
...Successfully got an update from the "bitnami" chart repository
Update Complete. ⎈Happy Helming!⎈
Error from server (AlreadyExists): namespaces "newrelic" already exists
Release "newrelic-bundle" does not exist. Installing it now.
NAME: newrelic-bundle
LAST DEPLOYED: Mon Nov  8 21:14:35 2021
NAMESPACE: newrelic
STATUS: deployed
REVISION: 1
TEST SUITE: None
 ```

To view the installed charts, run the command below.
 ```
$ helm list -n newrelic
NAME           	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
newrelic-bundle	newrelic 	1       	2021-11-08 21:14:35.692135 -0600 CST	deployed	nri-bundle-3.2.4	1.0
```
After a minute or two, you should see the following pods running in the `newrelic` namespace in your cluster.

```
$ kubectl get pods -n newrelic
NAME                                                      READY   STATUS    RESTARTS   AGE
newrelic-bundle-kube-state-metrics-584569bf65-89xx2       1/1     Running   0          5m17s
newrelic-bundle-newrelic-infrastructure-xtdkg             1/1     Running   0          5m17s
newrelic-bundle-newrelic-logging-2xvpb                    1/1     Running   0          5m16s
newrelic-bundle-nri-kube-events-68778447d6-hvfrv          2/2     Running   0          5m17s
newrelic-bundle-nri-metadata-injection-57858b7697-6q6sg   1/1     Running   0          5m17s
newrelic-bundle-nri-prometheus-5544d858fb-rwtf9           1/1     Running   0          5m17s
```

Congrats!  You've successfully installed New Relic and you should see your cluster in the Kubernetes Cluster Explorer in a minute or two.

## Conclusion

In this module, you installed New Relic into your cluster using the `nri-bundle` helm chart.  You also learned that in the Guided Install, the `--set` parameter is used to enable and/or configure variables for helm subcharts contained within the `nri-bundle` chart.  In the next few modules, you'll learn more about how to work with custom configurations.