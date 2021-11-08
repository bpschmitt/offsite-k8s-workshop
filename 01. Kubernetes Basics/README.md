## 01. Kubernetes Basics

In this module, you'll cover some of the very basic `kubectl` commands and their output.  The goal is to get you comfortable with interacting with a Kubernetes cluster and interpreting the output of the various commands.

PROTIP: Set an alias for kubectl so you can move even faster.

```
alias k='kubectl'
k get pods -A
```

**Reading:**
* Learn about [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
* Learn about [Kubernetes Cluster Resources](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/)

---

## [Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)

**Description:** Kubernetes runs your workload by placing containers into Pods to run on Nodes. A node may be a virtual or physical machine, depending on the cluster. Each node is managed by the control plane and contains the services necessary to run Pods.

The `kubectl get nodes` command outputs the following columns.

* NAME - name of the cluster node
* STATUS - the current status of the cluster node. A status of `NotReady` will potentially cause issues in your cluster.
* ROLES - Node roles are simply labels with the format `node-role.kubernetes.io/<role>`
* AGE - the age of the Node
* VERSION - the Kubernetes version running on the node

```
[~]$ kubectl get nodes
NAME                STATUS   ROLES                  AGE   VERSION
minikube-workshop   Ready    control-plane,master   11m   v1.20.7
```



## [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

Namespaces provide a mechanism for isolating groups of resources within a single cluster. Namespaces are intended for use in environments with many users spread across multiple teams, or projects.

* NAME - name of the namespace
* STATUS - status of the namespace. Will almost always be `Active` but be `Terminating` (though very rare).
* AGE - age of the namespace

```
[~]$ kubectl get namespaces
NAME              STATUS   AGE
default           Active   13m
kube-node-lease   Active   13m
kube-public       Active   13m
kube-system       Active   13m
```

## [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

A Pod (as in a pod of whales or pea pod) is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. A Pod's contents are always co-located and co-scheduled, and run in a shared context.

```
[~]$ kubectl get pods -n kube-system
NAME                                        READY   STATUS    RESTARTS   AGE
coredns-74ff55c5b-d2vpb                     1/1     Running   0          11m
etcd-minikube-workshop                      1/1     Running   0          11m
kube-apiserver-minikube-workshop            1/1     Running   0          11m
kube-controller-manager-minikube-workshop   1/1     Running   0          11m
kube-proxy-kgggq                            1/1     Running   0          11m
kube-scheduler-minikube-workshop            1/1     Running   0          11m
storage-provisioner                         1/1     Running   1          11m
```


## Services

```
[~]$ kubectl get services -A
NAMESPACE     NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
default       kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP                  17m
kube-system   kube-dns     ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   17m
```

## Deployments
```
[~]$ kubectl get deployments -n kube-system
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
coredns   1/1     1            1           16m
```

```
[~]$ kubectl get daemonsets -A
NAMESPACE     NAME         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   kube-proxy   1         1         1       1            1           kubernetes.io/os=linux   18m
```



## API Server
```
[~]$ k get --raw /api/v1/namespaces
{"kind":"NamespaceList","apiVersion":"v1","metadata":{"resourceVersion":"1387"},"items":[{"metadata":{"name":"default","uid":"016aae31-d9f7-4a95-bb18-50a6e082e592","resourceVersion":"203","creationTimestamp":"2021-10-27T20:05:55Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:55Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-node-lease","uid":"f6cf8ff5-67cb-4541-ba79-d2af699bc7fd","resourceVersion":"27","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-public","uid":"dac858aa-4be4-4ea1-91f8-4248dbbc228b","resourceVersion":"12","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-system","uid":"98d134e2-16ee-4e85-9d87-8b48fc6743fe","resourceVersion":"4","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}}]}
```