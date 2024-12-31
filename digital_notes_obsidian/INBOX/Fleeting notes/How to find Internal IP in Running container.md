---
tags:
  - Devops
  - Devops/Containers/Docker
  - Devops/Containers/Docker
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
```c
docker ps

docker inspect <Container_ID>
# In bridge ---> ip address --> 172.17.0.2/8080 ---> unlock jenkins
``` 
  
  
  
  ```dataview
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
  
  ```