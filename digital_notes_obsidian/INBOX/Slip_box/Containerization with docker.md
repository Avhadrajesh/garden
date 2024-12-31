---
title: Containerization Using Docker
tags:
  - Devops/Containers/Docker
  - Notetaking/Zettlekasten/Fleeting_notes
  - Notes_on
Zettlekasten Type:
  - Fleeting Notes
Zettlekasten Status:
  - " In process"
---
### Containerization Using Docker
---

### What is Containerization?
- **Definition**: A process of packaging the application along with its dependencies.
---

### Virtualization
- **Definition**: Creating virtual versions of hardware or software.
### Hypervisor
- **Definition**: Software that creates and runs Virtual Machines (VMs).
- **Also Known As**: Virtual Machine Monitor (VMM).
### Virtualization
- **Definition**: Creating virtual versions of hardware or software.
- **Hypervisor**: Software that creates and manages virtual machines (VMs). There are two types:
    - **Type 1 (Bare Metal)**: Runs directly on hardware.
    - **Type 2 (Hosted)**: Runs on a host OS.

---

**Virtual Machines (VMs)**:

- Hardware-level virtualization.
- Created using a hypervisor.
- Run full operating systems.
- Remain active even without tasks.
- Consume more resources and take longer to start.

**Containers**:

- Application-level virtualization.
- Created using a container engine.
- Run applications, not full operating systems.
- Exit when there are no active tasks.
- Consume fewer resources and start quickly.
- Reduce the number of VMs but cannot completely eliminate them.
- Operate in isolated address spaces.

---

### Container Use Cases

### Infrastructure Perspective

- **Cost Efficiency**: Containers minimize the number of VMs, leading to reduced infrastructure costs.

**Example**:

- **Traditional Setup**:
    - Jenkins Master (VM) manages multiple Jenkins Slave Nodes (VMs) for various application builds.
- **Containerized Setup**:
    - Jenkins Master (VM) runs a Jenkins Build Server with multiple containers handling different application builds.

---

**Developer/Deployment Perspective**:

- Package applications and their dependencies for deployment across environments.

**Environments**:

1. **Development**:
    - Code creation, compilation, artifact generation (e.g., mywebapp.war), unit testing.
    - Package application (e.g., mywebapp.war + jdk_11, tomcat_8.0) into a container image.
2. **QA**:
    - Pull the application image from the container registry and run it for QA testing.

---

### Key Terminology

- **Container Engine**: Manages container images and running containers (e.g., Docker).
- **Container Images**: Static files defining properties and dependencies, composed of layers.
- **Containers**: Executable units derived from images.
- **Container Registry**: Repository for storing and versioning container images (e.g., Docker Hub).
- **Dockerfile**: Script containing instructions to build a container image.

---

### Working with Docker

1. **Installation**:
    - sudo -i apt update -y apt install docker.io -y
2. **Basic Commands**:
    - Check Docker version: docker --version
    - List images: docker images
    - List active containers: docker ps
    - Pull images: docker pull <Image_Name>
3. **Container Management**:
    - Run a container: docker run -d --name mycontainer ubuntu:latest
    - Stop a container: docker stop mycontainer
    - Remove a container: docker rm mycontainer

---

### Conclusion

Containerization with Docker significantly enhances application portability, scalability, and resource efficiency. It is essential for modern software development and DevOps practices.

install it on slave node if
![[Docker_engine.png]]

![[image-1375851749.png]]


![[image-3798953206.png]]

![[image-3636376985.png]]

![[image-3892175049.png]]
![[Pasted image 20241223000144.png]]![[Pasted image 20241223000202.png]]

![[image-2292784391.png]]