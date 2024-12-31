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

### Docker desktop installation on ubuntu

```bash
# Open GIt bash terminal 
cat etc/*release* # to check latest os release 
sudo apt install gnome-terminal # 
sudo apt-get update 
sudo apt-get install ./docker-desktop-<arch>.deb
```

[[Docker commands]]

```dataview
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "Docker") 
SORT file.cday DESC
LIMIT 30
```
