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

**Title: Running Jenkins in a [Docker Container](obsidian://open?vault=digital_notes_obsidian&file=What%20is%20docker%20Container)**

- **Prerequisites:**
	- Docker installed on your machine.
	- Access to the Jenkins Docker image.
- **Steps:**
    
    1. **Pull Jenkins Docker Image:**
	- Pull the latest Jenkins image using:
	    
	    ```bash
	    docker pull jenkins/jenkins:lts
	    ```
	    
	  2. **Run Jenkins Container:**
	- Run the container with port mappings for web interface and agent communication:
	    
	    ```bash
	    docker run --name jenkins -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
	    ```
	- Key flags:
		- `--name jenkins`: Name the container.
		- `-d`: Run in detached mode.
		- `-p 8080:8080`: Map Jenkins web interface port.
		- `-p 50000:50000`: Map port for Jenkins agent.
		  3. **Check Jenkins Logs:**
	- Monitor logs to track Jenkins setup:
	    
	    ```bash
	    docker logs -f jenkins
	    ```
	    
	  4. **Access Jenkins:**
	- Open browser and navigate to `http://localhost:8080`.
	- Retrieve the initial admin password using:
	    
	    ```bash
	    docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
	    ```
	- Paste the password to unlock Jenkins.
	  5. **Complete Setup:**
	- Install recommended plugins.
	- Create an admin user.
- **Optional: Persist Jenkins Data**
	- To ensure data persists across container restarts, use Docker volumes:
	    
	    ```bash
	    docker run --name jenkins -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
	    ```
	- This mounts a volume (`jenkins_home`) to store data persistently.
	  
	[[What is docker Container]]