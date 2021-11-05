## 06. HPA and OHIs

![Image](https://docs.newrelic.com/550f34a8085779979e628c68bc885d1a/adapter-diagram.svg)

![HPA](https://p191.p3.n0.cdn.getcloudapp.com/items/llukoOQ7/32d5526f-83d3-49fd-8af4-81c2889f69ca.jpg?v=a2c0724fe96de61fd87c4955a6de0a53)


```
from Metric select average(nginx.server.net.requestsPerSecond) where k8s.namespaceName = 'demo' since 30 minutes ago TIMESERIES 30 seconds
```

```
FROM K8sPodSample select uniqueCount(podName) as 'Pod Count' where podName like 'nginx%' since 30 minutes ago TIMESERIES 30 seconds
```

```
kubectl get --raw "/apis/external.metrics.k8s.io/v1beta1/namespaces/*/nginx_average_requests?labelSelector=k8s.namespaceName=demo" | jq .
```