---
up: 
related: 
created: 2024-12-29
tags:
  - Other/K8s
  - Devops/Container_Orchestration/Kubernetes/MiniKube
  - Notetaking/Zettlekasten/Fleeting_notes
---
[Install and Set Up kubectl on Windows \| Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/)
[Install and Set Up kubectl on Linux \| Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
[Install and Set Up kubectl on macOS \| Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)

Download the latest release with the command:
```c
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```
Validate the kubectl binary against the checksum file: (Optional)
```c
# download the kubectl checksum file
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"

echo "$(cat kubectl.sha256) kubectl" | sha256sum --check

```

Install kubect;l
```c
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

if u do not have permission then Make kubectl binary executable
```c
chmod +X ./kubectl

or

chmod +x kubectl
mkdir -p ~/.local/bin
mv ./kubectl ~/.local/bin/kubectl
# and then append (or prepend) ~/.local/bin to $PATH

```

move this to bin location
```c
sudo mv ./kubectl /user/local/bin/kubectl
```

1. Test to ensure the version you installed is up-to-date:
    
    ```bash
    kubectl version --client
    ```
    
    Or use this for detailed view of version:
    
    ```cmd
    kubectl version --client --output=yaml
    ```

Check that kubectl is properly configured by getting the cluster state:

```shell
kubectl cluster-info
```

Install Minikube
This page shows you how to install Minikube, a tool that runs a single-node
Kubernetes cluster in a virtual machine on your personal computer.
Before you begin
To check if virtualization is supported on Linux, run the following command and verify that
the output is non-empty:
```c
grep -E --color 'vmxl svm' /proc/cpuinfo it
```

![[Pasted image 20241229161517.png]]


Install and set up the kubectl tool: –
https://kubernetes.io/docs/tasks/tools/

Install Minikube: –
https://minikube.sigs.k8s.io/docs/start/

Install VirtualBox: –
https://www.virtualbox.org/wiki/Downloads
https://www.virtualbox.org/wiki/Linux_Downloads

Minikube Tutorial: –
https://kubernetes.io/docs/tutorials/hello-minikube/

If the minikube installation has been done on the macOS, then to access the URL on the local browser, we need to do a few steps to get the service URL to work. Those steps are covered on this documentation page: –
https://minikube.sigs.k8s.io/docs/handbook/accessing/#using-minikube-service-with-tunnel