# offsite-k8s-workshop (NOTE: STILL A WORK IN PROGRESS)
A Kubernetes workshop with a New Relic focus.

# Pre-requisites

This workshop was built and tested using Minikube.  Below are the pre-requisites that need to be installed before proceeding.

- [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)
- [helm](https://helm.sh/docs/intro/install/#from-homebrew-macos)
- [git](https://git-scm.com/download/mac)
- hyperkit (if Docker Desktop is installed, you already have Hyperkit)

```
brew install minikube kubectl helm git hyperkit
```

# Start your cluster

```
minikube start --driver=hyperkit --cni=flannel --cpus=4 --memory=8000 -p minikube-workshop
```

# Recommended Reading

- [kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/?ref=hackernoon.com)