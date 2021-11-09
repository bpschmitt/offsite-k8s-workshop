PROTIP: Use the `-A` parameter to run commands across all namespaces.

```
kubectl get pods -A
```

PROTIP: Use `-o wide` for additional detail for most `kubectl get` commands.
```
kubectl get svc -A -o wide
```

PROTIP: Set an alias for kubectl so you can move even faster. Who wants to type `kubectl` a million times a day?

```
alias k='kubectl'
k get pods -A
```

PROTIP: Sort Kubenetes events by the `lastTimestap`.

```
kubectl get events -A --sort-by='.lastTimestamp'
```

PROTIP: View the pod logs for a previous instantiation of a container
```
kubectl logs crasher-6f4bccdddd-7hnp8 -n demo --previous
```

PROTIP: You can query API server endpoints directly with `kubectl get --raw /api/v1/<endpoint>`
```
[~]$ kubectl get --raw /api/v1/namespaces
{"kind":"NamespaceList","apiVersion":"v1","metadata":{"resourceVersion":"1387"},"items":[{"metadata":{"name":"default","uid":"016aae31-d9f7-4a95-bb18-50a6e082e592","resourceVersion":"203","creationTimestamp":"2021-10-27T20:05:55Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:55Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-node-lease","uid":"f6cf8ff5-67cb-4541-ba79-d2af699bc7fd","resourceVersion":"27","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-public","uid":"dac858aa-4be4-4ea1-91f8-4248dbbc228b","resourceVersion":"12","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-system","uid":"98d134e2-16ee-4e85-9d87-8b48fc6743fe","resourceVersion":"4","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}}]}
```