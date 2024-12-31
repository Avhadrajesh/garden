---
tags:
  - Devops/Scripting_and_Programming/Linux
  - Devops/Scripting_and_Programming/Linux/Commands
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---

[[How to display Information about OS]]
[[How to check CPU Utilization]]

```dataview
TABLE 
  file.mtime AS "Created", 
  tags AS "Tags", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "Linux") AND contains(tags, "How_to")
SORT file.cday DESC
LIMIT 30
```
