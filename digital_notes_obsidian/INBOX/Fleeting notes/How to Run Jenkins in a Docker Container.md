---
tags:
  - Devops/Containers/Docker
  - Devops/Containers/Docker
  - Devops/Devops_tools
  - Devops/CICD/Jenkins
  - Notetaking/Zettlekasten/Fleeting_notes
  - How_to
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
  Question
  what is jenkins ?
  Jenkins is continuous Integration CI & delivery server Jenkin is a web server which can be accessible through browser or web UI.

```c
# Run jenkins container
docker run jenkins

# check jenkins running on which port
docker ps
```


  For Jenkins container service is not accessible to outside host for that Port mapping is required [[How to do Port Mapping in docker]]
  After port mapping jenkins will start but if we create project and after creating some changes whenever we restart container we will lost data for that we need to map jenkins volume [[How to Map Jenkins Volume in Docker]]
  When running Jenkins in a Docker container, **port mapping** allows external access, but any data stored inside the container (like project configurations, job histories, and other Jenkins data) will be lost if the container is restarted. To persist Jenkins data, you need to **map Jenkins volume** to a persistent storage location on your host machine.

```c
# create local dir called my-jenkins-data
mkdir my-jenkins-data

# stop running container

# map jenkins volume to it
docker run -p 8080:8080 -v /root/my-jenkins-data:/var/jenkins_home -u root jenkins
# not it will store all data locally on system


```

```c
# exposing multiple ports --> Use multiple `-p` options:
docker run -p 8080:80 -p 443:443 nginx

# **Host Binding to All Interfaces**: --> Bind ports to all interfaces with `0.0.0.0`:
docker run -p 0.0.0.0:8080:80 nginx


```



[[How to find Internal IP in Running container]]
[[Run Jenkins in a Docker Container]]





```dataview
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
  
 ```
