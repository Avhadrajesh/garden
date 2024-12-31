---
title: Jenkins Volume Mapping in Docker
tags:
  - Devops/Containers/Docker
  - Devops/CICD/Jenkins
  - How_to
  - Notetaking/Zettlekasten/Fleeting_notes
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
### How to Map Jenkins Volume in Docker

When running Jenkins in Docker, data inside the container (like jobs and configurations) will be lost if the container restarts. To prevent this, you need to **map Jenkins' data directory** to a persistent location on your host machine.

#### How to Map Jenkins Volume:

Use the `-v` flag to map a host directory to the Jenkins home directory inside the container:

```
docker run -d -p 8080:8080 -p 50000:50000 -v /path/to/host/directory:/var/jenkins_home jenkins/jenkins:lts
```

- `/path/to/host/directory`: Host directory to store Jenkins data.
- `/var/jenkins_home`: Jenkins' default data directory inside the container.

#### Benefits:

- **Data Persistence**: Jenkins data is stored on the host, preventing loss after container restarts.
- **Easy Backup**: Access and back up Jenkins data from the host directory.

This ensures your Jenkins data is safe even when the container restarts.

[[Docker Images]]
