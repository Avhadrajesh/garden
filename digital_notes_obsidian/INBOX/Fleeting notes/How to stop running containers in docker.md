---
tags:
  - How_to
  - Devops/Containers/Docker
  - Devops/Containers/Docker
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---

  
  To stop running container we can use container ID or container name
  ```c
  # open new terminal
  docker ps                               # List running Docker containers
  
  # To stop running container we can use container ID or container name
  docker stop <container_ID>
  docker stop 12b 3a9 817 2db 0c9 99f    # Stop specified running containers
  ```
  
  

- [[How to Run Jenkins in a Docker Container]]

  ```dataview
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
  
  ```
  