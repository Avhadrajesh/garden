---
tags:
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
```dataview
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") AND startswith(file.name, "How to")
SORT file.cday DESC
LIMIT 30

```

What_is 

```dataview
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") OR startswith(file.name, "What is")
SORT file.cday DESC
LIMIT 30

```



```dataview
TABLE 
  file.mtime AS "Created", 
  tags AS "Tags", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") AND startswith(file.name, "How to")
SORT file.cday DESC
LIMIT 30

```

