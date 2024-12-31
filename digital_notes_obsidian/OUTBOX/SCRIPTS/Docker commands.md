---
tags:
  - Devops/Containers/Docker
  - Devops/Containers/Docker
  - Devops
  - Devops/Devops_tools
---
```
 1  docker --version                        # Show the current version of Docker
 2  ps                                      # List running processes
 3  ps -a                             # List all processes, including those that are stopped
 4  docker ps                               # List running Docker containers
 5  docker ps -a                      # List all Docker containers, including stopped ones
 6  docker images                           # List all Docker images on the system
 7  docker run redis                        # Run a new container from the Redis image
 8  docker ps                               # List running Docker containers
 9  docker ps -a                            # List all Docker containers
10  docker stop 12b 3a9 817 2db 0c9 99f    # Stop specified running containers
11  docker rm 12b 3a9 817 2db 0c9 99f      # Remove specified stopped containers
12  docker ps -a                            # List all Docker containers
13  docker images                           # List all Docker images
14  docker rmi ubuntu                       # Remove the Ubuntu image
15  docker images                           # List all Docker images
16  docker pull nginx:1.14-alpine          # Pull the specified version of the NGINX image from the Docker registry
17  docker images                           # List all Docker images
18  docker ps -a                            # List all Docker containers
19  docker run nginx:1.14-alpine           # Run a new container from the NGINX image
20  docker ps -a                            # List all Docker containers
21  docker run -d --name webapp nginx:1.14-alpine  # Run a new NGINX container in detached mode with the name 'webapp'
22  docker ps                               # List running Docker containers
23  history                                  # Show command history
24  docker images                           # List all Docker images
25  docker ps -a                            # List all Docker containers
26  docker stop webapp                      # Stop the 'webapp' container
27  docker ps -a                            # List all Docker containers
28  docker ps                               # List running Docker containers
29  docker images                           # List all Docker images
30  docker rmi postgres:latest              # Remove the latest Postgres image
31  docker images                           # List all Docker images
32  docker rmi alpine:lateest              # Remove the 'alpine:lateest' image (typo: should be 'latest')
33  docker rmi alpine:latest                # Remove the 'alpine:latest' image
34  docker images                           # List all Docker images
35  docker rmi mysql:latest                 # Remove the latest MySQL image
36  docker images                           # List all Docker images
37  docker rmi $(docker images -aq)        # Delete all available Docker images
38  docker ps                               # List running Docker containers
39  docker ps -a                            # List all Docker containers
40  docker stop 4f8 528                     # Stop specified running containers
41  docker ps -a                            # List all Docker containers
42  docker ps                               # List running Docker containers
43  docker images                           # List all Docker images
44  docker rmi nginx:1.14-alpine           # Remove the NGINX image version 1.14-alpine
45  docker ps                               # List running Docker containers
46  docker ps -a                            # List all Docker containers
47  docker run -d --name jovial_chatelet nginx:1.14-alpine  # Run a new NGINX container in detached mode named 'jovial_chatelet'
48  ps                                      # List running processes
49  docker ps                               # List running Docker containers
50  docker ps -a                            # List all Docker containers
51  docker rm 4f85528084e1 5287d42e95e5    # Remove specified stopped containers
52  docker ps -a                            # List all Docker containers
53  docker rmi nginx:1.14-alpine           # Remove the NGINX image version 1.14-alpine
54  docker images                           # List all Docker images


```

### Notes on Docker Commands

#### General Commands
- **`docker --version`**: Displays the current version of Docker installed.
- **`ps` / `ps -a`**: Lists running processes or all processes (including stopped ones).

#### Managing Docker Containers
- **`docker ps`**: Lists running Docker containers.
- **`docker ps -a`**: Lists all Docker containers, including stopped ones.
- **`docker stop <container_ids>`**: Stops specified running containers.
- **`docker rm <container_ids>`**: Removes specified stopped containers.

#### Managing Docker Images
- **`docker images`**: Lists all Docker images on the system.
- **`docker rmi <image_name>`**: Removes a specific Docker image.
- **`docker rmi $(docker images -aq)`**: Deletes all available Docker images.

#### Pulling and Running Docker Containers
- **`docker pull <image_name>:<tag>`**: Pulls a specific version of an image from the Docker registry (e.g., `nginx:1.14-alpine`).
- **`docker run <image_name>`**: Runs a new container from the specified image (e.g., `redis`).
- **`docker run -d --name <container_name> <image_name>:<tag>`**: Runs a new container in detached mode with a specified name (e.g., `webapp` or `jovial_chatelet`).

#### Example Workflow
1. **Pull an image**: `docker pull nginx:1.14-alpine`.
2. **Run a container**: `docker run nginx:1.14-alpine` or `docker run -d --name webapp nginx:1.14-alpine`.
3. **Check containers**:
   - Running containers: `docker ps`.
   - All containers: `docker ps -a`.
4. **Stop a container**: `docker stop <container_id>` or `docker stop webapp`.
5. **Remove a container**: `docker rm <container_id>`.
6. **Remove an image**: `docker rmi <image_name>:<tag>`.

#### Common Scenarios
- **Remove unused images**:
  - `docker rmi $(docker images -aq)` to delete all images.
- **Fixing typos**:
  - Corrected example: `docker rmi alpine:latest` (instead of `alpine:lateest`).

#### Notes on Specific Images
- **Redis**: Example command to run: `docker run redis`.
- **NGINX**:
  - Pull: `docker pull nginx:1.14-alpine`.
  - Run: `docker run -d --name webapp nginx:1.14-alpine`.
  - Remove: `docker rmi nginx:1.14-alpine`.
- **MySQL / Postgres**:
  - Remove: `docker rmi mysql:latest` or `docker rmi postgres:latest`.

#### Miscellaneous
- **Command History**: Use `history` to view previously executed commands.

### Docker Commands - Quick Guide

1. **List Images**:  
    `docker images` – Shows images with details.
    
2. **Count Images**:  
    `docker images -q | wc -l` – Counts total images.
    
3. **List Image IDs**:  
    `docker images -q` – Shows image IDs.
    
4. **Image Size**:  
    `docker images ubuntu --format "{{.Size}}"` – Shows image size.
    
5. **Build Image**:  
    `docker build -t <name> .` – Builds a Docker image.
    
6. **View Updated Images**:  
    `docker images` – Shows updated images after building.
    

### Summary:

Use these commands to manage, inspect, and build Docker images.

[[Docker_tasks]]

```dataview
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "Docker") 
SORT file.cday DESC
LIMIT 30
```
