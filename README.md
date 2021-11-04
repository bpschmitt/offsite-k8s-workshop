# offsite-k8s-workshop
A Kubernetes workshop with a New Relic focus.

# Pre-requisites

This workshop was built and tested using Minikube.  Below are the pre-requisites that need to be installed before proceeding.

- [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [helm](https://helm.sh/docs/intro/install/#from-homebrew-macos)
- [git](https://git-scm.com/download/mac)

```
brew install minikube kubectl helm git
```

# Start your cluster

```
minikube start --driver=hyperkit --cni=flannel --cpus=4 --memory=8000 -p minikube-lab
```

# Recommended Reading

- One
- Two
- Three