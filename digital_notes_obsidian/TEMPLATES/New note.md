---
tags:
  - Devops
title: 
Zettlekasten Type:
  - Fleeting Notes
  - " Literature Notes"
  - " Permanent Notes"
Status:
  - Ready to Process
  - " In process"
  - " Finished"
---

  
  
  
  
  
  
  
  
  ```dataview
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
  
  ```