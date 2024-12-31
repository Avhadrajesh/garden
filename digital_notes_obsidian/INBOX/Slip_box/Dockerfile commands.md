---
title: Dockerfile Commands
tags:
  - Devops/Containers/Docker
  - Notetaking/Zettlekasten/Fleeting_notes
category: Devops/docker
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
### **Dockerfile Commands - Notes**
---
#### 1. **FROM**
- **Purpose**: Sets the base image for the Docker image.
- **Function**: The starting point for creating a new image.
- **Example**:
    ```dockerfile
    FROM node:14
    ```

---
#### 2. **RUN**
- **Purpose**: Executes commands during the build process.
- **Function**: Used to install packages or run shell commands inside the container.
- **Example**:
    ```dockerfile
    RUN apt-get update && apt-get install -y <package>
    ```

---
#### 3. **COPY**
- **Purpose**: Copies files from the local filesystem into the Docker image.
- **Function**: Transfers application code or configuration files.
- **Example**:
    ```dockerfile
    COPY . /app
    ```
    
---
#### 4. **WORKDIR**
- **Purpose**: Sets the working directory for subsequent instructions.
- **Function**: Similar to `cd` in the terminal; defines where subsequent commands will run.
- **Example**:
    ```dockerfile
    WORKDIR /usr/src/app
    ```
    
---
#### 5. **EXPOSE**
- **Purpose**: Informs Docker about the ports the container will listen to.
- **Function**: Does not publish the port, but documents it.
- **Example**:
    ```dockerfile
    EXPOSE 3000
    ```
    
---
#### 6. **CMD**
- **Purpose**: Specifies the default command to run when the container starts.
- **Function**: Defines the entry point or preset command for the container.
- **Example**:
    ```dockerfile
    CMD ["node", "app.js"]
    ```
    
---
#### 7. **ENV**
- **Purpose**: Sets environment variables in the container.
- **Function**: Used to configure application behavior inside the container.
- **Example**:
    ```dockerfile
    ENV NODE_ENV=production
    ENV PORT=3000
    ```
    
---
#### 8. **USER**
- **Purpose**: Defines the user for the container.
- **Function**: Specifies the user or user ID (UID) to execute subsequent instructions, ensuring commands run with a specific user context (not root).
- **Example**:
    ```dockerfile
    USER nodeuser
    ```

---

