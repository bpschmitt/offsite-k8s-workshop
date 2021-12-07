## 03. Troubleshooting

In this module you'll learn about some of the more common troubleshooting commands used when troubleshooting issues with a Kubernetes deployment.  Those commands are:

* `kubectl describe pod` (or other resources like `node`, `deployment`, etc)
* `kubectl logs pod`
* `kubectl get events`

### Describing Resources

Describing a Kubernetes resource (in this case, a pod) will output its current configuration as well as any related Kubernetes events.  This can be extremely useful in identifying why a pod might not be starting properly.

There are a few things of note here:

* The container state and reason (`State: Waiting` - `Reason: CreateContainerConfigError`)
* The conditions: `Ready: False` and `ContainersReady: False`
* The pod events, specifically `Error: secret "nrlicensekey" not found`

You've found the culprit.  A required secret is missing so the pod is unable to start successfully.  This happens to be the secret that contains your New Relic license key.  In the next step, you'll create it to resolve the issue.

```
[~]$ kubectl describe pod logs-demo-f764d7569-cvh89 -n demo
Name:         logs-demo-f764d7569-cvh89
Namespace:    demo
Priority:     0
Node:         minikube-lab/192.168.64.12
Start Time:   Mon, 08 Nov 2021 17:17:17 -0600
Labels:       app=logs-demo
              pod-template-hash=f764d7569
Annotations:  <none>
Status:       Pending
IP:           10.244.0.94
IPs:
  IP:           10.244.0.94
Controlled By:  ReplicaSet/logs-demo-f764d7569
Containers:
  nodejs-logs-k8s:
    Container ID:
    Image:          bpschmitt/nodejs-logs-k8s:0.5
    Image ID:
    Port:           4000/TCP
    Host Port:      0/TCP
    State:          Waiting
      Reason:       CreateContainerConfigError
    Ready:          False
    Restart Count:  0
    Limits:
      cpu:     250m
      memory:  256M
    Requests:
      cpu:     250m
      memory:  256M
    Environment:
      NEW_RELIC_LICENSE_KEY:                               <set to the key 'nrlicensekey' in secret 'nrlicensekey'>  Optional: false
      NEW_RELIC_APP_NAME:                                  myDemoApp
      APP_TITLE:                                           myDemoApp
      NEW_RELIC_METADATA_KUBERNETES_CLUSTER_NAME:          minikube-lab
      NEW_RELIC_METADATA_KUBERNETES_NODE_NAME:              (v1:spec.nodeName)
      NEW_RELIC_METADATA_KUBERNETES_NAMESPACE_NAME:        demo (v1:metadata.namespace)
      NEW_RELIC_METADATA_KUBERNETES_POD_NAME:              logs-demo-f764d7569-cvh89 (v1:metadata.name)
      NEW_RELIC_METADATA_KUBERNETES_CONTAINER_NAME:        nodejs-logs-k8s
      NEW_RELIC_METADATA_KUBERNETES_CONTAINER_IMAGE_NAME:  bpschmitt/nodejs-logs-k8s:0.5
      NEW_RELIC_METADATA_KUBERNETES_DEPLOYMENT_NAME:       logs-demo
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-75ldr (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  default-token-75ldr:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-75ldr
    Optional:    false
QoS Class:       Guaranteed
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                 node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                  From               Message
  ----     ------     ----                 ----               -------
  Normal   Scheduled  51m                  default-scheduler  Successfully assigned demo/logs-demo-f764d7569-cvh89 to minikube-lab
  Warning  Failed     30m (x94 over 51m)   kubelet            Error: secret "nrlicensekey" not found
  Normal   Pulled     68s (x231 over 51m)  kubelet            Container image "bpschmitt/nodejs-logs-k8s:0.5" already present on machine
```

To fix this issue, create a secret called `nrlicensekey` which contains your New Relic license key with the following command:
```
kubectl create secret generic nrlicensekey --from-literal=nrlicensekey=<NR LICENSE KEY> -n demo
```

### Events

Sometimes the root cause of a cranky deployment may not be completely obvious from the pod events and you'll need to take a broader look at the cluster events.  You can do this with the `kubectl get event` command.  Note that the example below is scoped to the `demo` namespace.
```
[~]$ kubectl get events -n demo
LAST SEEN   TYPE      REASON              OBJECT                                          MESSAGE
...
4m36s       Normal    Pulled              pod/logs-demo-f764d7569-cvh89                   Container image "bpschmitt/nodejs-logs-k8s:0.5" already present on machine
39m         Warning   Failed              pod/logs-demo-f764d7569-cvh89                   Error: secret "nrlicensekey" not found
59m         Normal    SuccessfulCreate    replicaset/logs-demo-f764d7569                  Created pod: logs-demo-f764d7569-cvh89
59m         Normal    ScalingReplicaSet   deployment/logs-demo                            Scaled up replica set logs-demo-f764d7569 to 1
59m         Normal    Scheduled           pod/nginx-557dcdb56b-v4d4c                      Successfully assigned demo/nginx-557dcdb56b-v4d4c to minikube-lab
59m         Normal    Pulling             pod/nginx-557dcdb56b-v4d4c                      Pulling image "nginx"
59m         Normal    Pulled              pod/nginx-557dcdb56b-v4d4c                      Successfully pulled image "nginx" in 1.079547333s
59m         Normal    Created             pod/nginx-557dcdb56b-v4d4c                      Created container nginx
59m         Normal    Started             pod/nginx-557dcdb56b-v4d4c                      Started container nginx
59m         Normal    SuccessfulCreate    replicaset/nginx-557dcdb56b                     Created pod: nginx-557dcdb56b-v4d4c
59m         Normal    ScalingReplicaSet   deployment/nginx                                Scaled up replica set nginx-557dcdb56b to 1
...
```


### Logs

The `kubectl logs` command will show you the container logs for applications running in your pods.  Typically, this is also a great source of information when trying to troubleshoot a problem.  In this example, you'll look at the logs for the `crasher-*` pod and it will be very obvious what's wrong.

```
$ kubectl logs crasher-6f4bccdddd-7hnp8 -n demo
Traceback (most recent call last):
  File "./app.py", line 9, in <module>
    with open('Data.txt') as f:
FileNotFoundError: [Errno 2] No such file or directory: 'Data.txt'
```

If you describe that pod, take a closer look at the `Containers` section for more detail as to what's happening.  You'll see the container exit code is `1` because of the error above.  The container is not able to successfully start and the `restartPolicy` for the container is `Always`.  This means that Kubernetes will try to restart the container if it fails, which is why the restart count continues to go up.

```
$ kubectl describe pod crasher-6f4bccdddd-7hnp8 -n demo
... Truncated ...

Containers:
  crasher:
    Container ID:   docker://49a799e1cd9709974ed621799289bb7de95ea128100ad7d246b48b12378a3450
    Image:          mlda065/crasher
    Image ID:       docker-pullable://mlda065/crasher@sha256:3f41331adf0362ab245866a8f1a346d867c934b63b2733c0c714b3d4183a490d
    Port:           <none>
    Host Port:      <none>
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    1
      Started:      Mon, 08 Nov 2021 21:49:11 -0600
      Finished:     Mon, 08 Nov 2021 21:49:11 -0600
    Ready:          False
    Restart Count:  58

  ... Truncated ...
  ```
