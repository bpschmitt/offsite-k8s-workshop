## 01. Kubernetes Basics

In this module, you'll cover some of the very basic `kubectl` commands and their output.  The goal is to get you comfortable with interacting with a Kubernetes cluster and interpreting the output of the various commands.

**Reading:** Learn about [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)

## Nodes

```
[~]$ kubectl get nodes
NAME                STATUS   ROLES                  AGE   VERSION
minikube-workshop   Ready    control-plane,master   11m   v1.20.7
```

PROTIP: Set an alias for kubectl so you can move even faster.

```
alias k='kubectl'
k get pods -A
```

## Namespaces

```
[~]$ kubectl get namespaces
NAME              STATUS   AGE
default           Active   13m
kube-node-lease   Active   13m
kube-public       Active   13m
kube-system       Active   13m
```

## Pods
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

```
[~]$ kubectl describe pod coredns-74ff55c5b-d2vpb -n kube-system
Name:                 coredns-74ff55c5b-d2vpb
Namespace:            kube-system
Priority:             2000000000
Priority Class Name:  system-cluster-critical
Node:                 minikube-workshop/192.168.49.2
Start Time:           Wed, 27 Oct 2021 15:06:12 -0500
Labels:               k8s-app=kube-dns
                      pod-template-hash=74ff55c5b
Annotations:          <none>
Status:               Running
IP:                   172.17.0.2
IPs:
  IP:           172.17.0.2
Controlled By:  ReplicaSet/coredns-74ff55c5b
Containers:
  coredns:
    Container ID:  docker://2f8b82db645bfe4135bc8e4b9ac1611181c08895d4682ddc3b5477e51030634d
    Image:         k8s.gcr.io/coredns:1.7.0
    Image ID:      docker-pullable://k8s.gcr.io/coredns@sha256:73ca82b4ce829766d4f1f10947c3a338888f876fbed0540dc849c89ff256e90c
    Ports:         53/UDP, 53/TCP, 9153/TCP
    Host Ports:    0/UDP, 0/TCP, 0/TCP
    Args:
      -conf
      /etc/coredns/Corefile
    State:          Running
      Started:      Wed, 27 Oct 2021 15:06:14 -0500
    Ready:          True
    Restart Count:  0
    Limits:
      memory:  170Mi
    Requests:
      cpu:        100m
      memory:     70Mi
    Liveness:     http-get http://:8080/health delay=60s timeout=5s period=10s #success=1 #failure=5
    Readiness:    http-get http://:8181/ready delay=0s timeout=1s period=10s #success=1 #failure=3
    Environment:  <none>
    Mounts:
      /etc/coredns from config-volume (ro)
      /var/run/secrets/kubernetes.io/serviceaccount from coredns-token-8b4xf (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  config-volume:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      coredns
    Optional:  false
  coredns-token-8b4xf:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  coredns-token-8b4xf
    Optional:    false
QoS Class:       Burstable
Node-Selectors:  kubernetes.io/os=linux
Tolerations:     CriticalAddonsOnly op=Exists
                 node-role.kubernetes.io/control-plane:NoSchedule
                 node-role.kubernetes.io/master:NoSchedule
                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  12m   default-scheduler  Successfully assigned kube-system/coredns-74ff55c5b-d2vpb to minikube-workshop
  Normal  Pulled     12m   kubelet            Container image "k8s.gcr.io/coredns:1.7.0" already present on machine
  Normal  Created    11m   kubelet            Created container coredns
  Normal  Started    11m   kubelet            Started container coredns
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


## Events

```
  [~]$ kubectl get events -n kube-system
LAST SEEN   TYPE      REASON              OBJECT                               MESSAGE
12m         Normal    Scheduled           pod/coredns-74ff55c5b-d2vpb          Successfully assigned kube-system/coredns-74ff55c5b-d2vpb to minikube-workshop
12m         Normal    Pulled              pod/coredns-74ff55c5b-d2vpb          Container image "k8s.gcr.io/coredns:1.7.0" already present on machine
12m         Normal    Created             pod/coredns-74ff55c5b-d2vpb          Created container coredns
12m         Normal    Started             pod/coredns-74ff55c5b-d2vpb          Started container coredns
12m         Normal    SuccessfulCreate    replicaset/coredns-74ff55c5b         Created pod: coredns-74ff55c5b-d2vpb
12m         Normal    ScalingReplicaSet   deployment/coredns                   Scaled up replica set coredns-74ff55c5b to 1
12m         Normal    LeaderElection      endpoints/k8s.io-minikube-hostpath   minikube-workshop_0a4bd673-a799-423a-a386-6b9619e73d8b became leader
12m         Normal    Scheduled           pod/kube-proxy-kgggq                 Successfully assigned kube-system/kube-proxy-kgggq to minikube-workshop
12m         Normal    Pulled              pod/kube-proxy-kgggq                 Container image "k8s.gcr.io/kube-proxy:v1.20.7" already present on machine
12m         Normal    Created             pod/kube-proxy-kgggq                 Created container kube-proxy
12m         Normal    Started             pod/kube-proxy-kgggq                 Started container kube-proxy
12m         Normal    SuccessfulCreate    daemonset/kube-proxy                 Created pod: kube-proxy-kgggq
12m         Warning   FailedScheduling    pod/storage-provisioner              0/1 nodes are available: 1 node(s) had taint {node.kubernetes.io/not-ready: }, that the pod didn't tolerate.
12m         Normal    Scheduled           pod/storage-provisioner              Successfully assigned kube-system/storage-provisioner to minikube-workshop
12m         Normal    Pulled              pod/storage-provisioner              Container image "gcr.io/k8s-minikube/storage-provisioner:v5" already present on machine
12m         Normal    Created             pod/storage-provisioner              Created container storage-provisioner
12m         Normal    Started             pod/storage-provisioner              Started container storage-provisioner
```

## API Server
```
[~]$ k get --raw /api/v1/namespaces
{"kind":"NamespaceList","apiVersion":"v1","metadata":{"resourceVersion":"1387"},"items":[{"metadata":{"name":"default","uid":"016aae31-d9f7-4a95-bb18-50a6e082e592","resourceVersion":"203","creationTimestamp":"2021-10-27T20:05:55Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:55Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-node-lease","uid":"f6cf8ff5-67cb-4541-ba79-d2af699bc7fd","resourceVersion":"27","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-public","uid":"dac858aa-4be4-4ea1-91f8-4248dbbc228b","resourceVersion":"12","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}},{"metadata":{"name":"kube-system","uid":"98d134e2-16ee-4e85-9d87-8b48fc6743fe","resourceVersion":"4","creationTimestamp":"2021-10-27T20:05:53Z","managedFields":[{"manager":"kube-apiserver","operation":"Update","apiVersion":"v1","time":"2021-10-27T20:05:53Z","fieldsType":"FieldsV1","fieldsV1":{"f:status":{"f:phase":{}}}}]},"spec":{"finalizers":["kubernetes"]},"status":{"phase":"Active"}}]}
```