## 01. Kubernetes Basics

In this module, you'll cover some of the very basic `kubectl` commands and their output.  The goal is to get you comfortable with interacting with a Kubernetes cluster and interpreting the output of the various commands.

**Reading:**
* Learn about [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
* Learn about [Kubernetes Cluster Resources](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/)

---

## [Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)

Kubernetes runs your workload by placing containers into Pods to run on Nodes. A node may be a virtual or physical machine, depending on the cluster. Each node is managed by the control plane and contains the services necessary to run Pods.

The `kubectl get nodes` command outputs the following columns.

|Column|Description|
---|---
|NAME|name of the cluster node|
|STATUS|the current status of the cluster node. A status of `NotReady` will potentially cause issues in your cluster.|
|ROLES|Node roles are simply labels with the format `node-role.kubernetes.io/<role>`|
|AGE|the age of the Node|
|VERSION|the Kubernetes version running on the node|

```
[~]$ kubectl get nodes
NAME                STATUS   ROLES                  AGE   VERSION
minikube-workshop   Ready    control-plane,master   11m   v1.20.7
```



## [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

Namespaces provide a mechanism for isolating groups of resources within a single cluster. Namespaces are intended for use in environments with many users spread across multiple teams, or projects.
|Column|Description|
---|---
|NAME|name of the namespace|
|STATUS|status of the namespace. Will almost always be `Active` but be `Terminating` (though very rare).|
|AGE|age of the namespace|

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

|Column|Description|
---|---
|NAME|name of the pod|
|READY|count of containers in the pod and whether they are ready or not. A pod can be `Running`, but the containers within it may not be `Ready` according to K8s.  See [container probes](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#container-probes) for more detail on this topic.|
|STATUS|status phase of the pod.  Includes `Running`, `Pending`, `Succeeded`, `Failed`, and `Unknown`.  More details [here](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase).|
|RESTARTS|a cumulative counter of container restarts within the pod.|
|AGE|age of the pod|

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


## [Services](https://kubernetes.io/docs/concepts/services-networking/service/)

An abstract way to expose an application running on a set of Pods as a network service.
With Kubernetes you don't need to modify your application to use an unfamiliar service discovery mechanism. Kubernetes gives Pods their own IP addresses and a single DNS name for a set of Pods, and can load-balance across them.

|Column|Description|
---|---
|NAMESPACE|namespace containing the service|
|NAME|the service name|
|TYPE|the type of Service.  Options are `ClusterIP`, `NodePort`, and `LoadBalancer`.  [This article](https://medium.com/swlh/kubernetes-services-simply-visually-explained-2d84e58d70e5) has some really nice explanations. |
|CLUSTER-IP|internal IP address of the service|
|EXTERNAL-IP|external IP address of the service (if available)|
|PORT(S)|ports and protocols being exposed by the service. Format: _\<external port\>:\<internal port\>_|

```
[~]$ kubectl get services -A
NAMESPACE     NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
default       kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP                  17m
kube-system   kube-dns     ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   17m
```

## [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

A Deployment provides declarative updates for Pods and ReplicaSets.

You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments.

|Column|Description|
---|---
|NAME|name of the deployment|
|READY|pods ready vs. total pods|
|UP-TO-DATE|displays the number of pod replicas that have been updated to achieve the desired state|
|AVAILABLE|displays how many pod replicas of the application are available to your users|
|AGE|displays the amount of time that the application has been running|
```
[~]$ kubectl get deployments -n kube-system
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
coredns   1/1     1            1           16m
```

## [Daemonsets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

A DaemonSet ensures that all (or some) Nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are garbage collected. Deleting a DaemonSet will clean up the Pods it created.

|Column|Description|
---|---
|NAMESPACE|namespace containing the daemonset|
|NAME|name of the daemonset|
|DESIRED|total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod).|
|CURRENT|number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod|
|READY|number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready|
|UP-TO-DATE|displays the number of daemon pods that have been updated to achieve the desired state|
|AVAILABLE|number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available|
|NODE SELECTOR|for the daemon pod to be eligible to run on a node, the node must have each of the indicated key-value pairs as labels|
|AGE|amount of time the daemonset has been running|
```
[~]$ kubectl get daemonsets -A
NAMESPACE     NAME         DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   kube-proxy   1         1         1       1            1           kubernetes.io/os=linux   18m
```