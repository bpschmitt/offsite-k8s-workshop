## 03. Helm

Quite simply, Helm is a tool that streamlines the installation and management of Kubernetes applications.  It's a package manager, but it's also so much more.  Helm provides a templating engine for your Kubernetes manifest files, complete with support for variables and functions. A "Chart" is a Helm package that contains information sufficient for installing a set of Kubernetes resources into a Kubernetes cluster.

New Relic's [helm chart repo](https://github.com/newrelic/helm-charts) contains the charts used in New Relic's Guided Install for Kubernetes.

Let's get New Relic up and running in your cluster.  First, download the `values.yaml` file for the `nri-bundle` Helm chart using the command below:

```
curl -s https://raw.githubusercontent.com/newrelic/helm-charts/master/charts/nri-bundle/values.yaml -o values.yaml
```

Navigate to the Guided Install for Kubernetes in New Relic's UI and follow the prompts.  For this workshop, make the folloing selections:

![Guided Install](https://p191.p3.n0.cdn.getcloudapp.com/items/2NuPPg7z/0c8e6b5e-bd71-4fca-9fc0-5add7cfb5a4f.jpg?v=0981942fbdfb62d1d0aefd320e8cf2d1)

When you get to the `Choose install method` prompt, you should see a command that looks similar to this.  Copy the command and run it on your command line.

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

 ```
$ helm list -A
NAME           	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART           	APP VERSION
newrelic-bundle	newrelic 	1       	2021-11-08 21:14:35.692135 -0600 CST	deployed	nri-bundle-3.2.4	1.0