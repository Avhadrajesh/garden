---
tags:
  - Devops/Containers/Docker
  - Devops/CICD/Jenkins
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---

[[What is Port mapping]]
```c
# To do port mapping we need to stop container first
docker stop <container_ids>

# map port host to container
docker run -p 8080:8080 Jenkins

```
[[Notes on Port Mapping in Docker]]
#### Managing Docker Containers
- **`docker ps`**: Lists running Docker containers.
- **`docker ps -a`**: Lists all Docker containers, including stopped ones.
- **`docker stop <container_ids>`**: Stops specified running containers.
- **`docker rm <container_ids>`**: Removes specified stopped containers.