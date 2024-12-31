---
tags:
  - Devops/Containers/Docker
  - How_to
  - Devops/Containers/Docker
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
```c
docker run ubuntu  # It will download ubuntu Image from Docker hub with latest tag and run

# to check list of running containers
docker ps

# sleep ubuntu for 15 sec
docker run ubuntu sleep 15

# sleep ubuntu for 1500 sec
docker run ubuntu sleep 1500

# Run Docker container in detached mode
docker run -d ubuntu sleep 1500

# print time on screen using docker run
docker run timer /it prints time on screen every sec
docker run -d timer # to run docker in detached mode

# Attached docker container
docker attach <container_ID>


```

[[How to stop running containers in docker]] 

  ```dataview
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
  
  ```

```dataview
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks", 
  file.ZettelkastenStatus AS "Fleeting Notes", 
  file.ZettelkastenType AS "Zettelkasten Type"
WHERE file.ZettelkastenType = "Fleeting" AND file.ZettelkastenStatus != null 
SORT file.cday DESC
LIMIT 30

```
