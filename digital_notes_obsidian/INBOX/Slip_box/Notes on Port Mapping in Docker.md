---
tags:
  - Devops/Containers/Docker
  - Devops/CICD/Jenkins
  - Notes_on
  - Notetaking/Zettlekasten/Fleeting_notes
  - Devops
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---

**Port mapping** in Docker is the process of exposing a port on the host machine to a port inside a Docker container. This allows external access to services running within containers.

#### Key Points:

- **Syntax for Port Mapping**:
    
    ```
    docker run -p <host-port>:<container-port> <image-name>
    ```
    
    - `<host-port>`: Port on the host machine.
    - `<container-port>`: Port inside the container.
- **Example**:
    
    ```
    docker run -p 8080:80 nginx
    ```
    
    This maps port `8080` on the host to port `80` inside the container (where Nginx runs).
    
- **Exposing Multiple Ports**:  
    Use multiple `-p` options:
    
    ```
    docker run -p 8080:80 -p 443:443 nginx
    ```
    
- **Host Binding to All Interfaces**:  
    Bind ports to all interfaces with `0.0.0.0`:
    
    ```
    docker run -p 0.0.0.0:8080:80 nginx
    ```
    
- **Docker Compose**:  
    Port mappings can also be defined in the `docker-compose.yml` file:
    
    ```yaml
    version: '3'
    services:
      web:
        image: nginx
        ports:
          - "8080:80"
    ```
    

#### Notes:

- Ensure the host port is not already in use.
- Use port mapping carefully, especially in production environments, to avoid security risks.