## 03. Helm
```
curl -s https://raw.githubusercontent.com/newrelic/helm-charts/master/charts/nri-bundle/values.yaml -o values.yaml
```

```
helm repo add newrelic https://helm-charts.newrelic.com && helm repo update && \
kubectl create namespace newrelic ; helm upgrade --install newrelic-bundle newrelic/nri-bundle \
 --set global.licenseKey=<REDACTED> \
 --set global.cluster=minikube-workshop \
 --namespace=newrelic \
 --set newrelic-infrastructure.privileged=true \
 --set ksm.enabled=true \
 --set prometheus.enabled=true \
 --set kubeEvents.enabled=true \
 --set logging.enabled=true
 ```