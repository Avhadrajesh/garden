---
tags:
  - Notetaking
  - Notetaking/digital_notes/Obsidian
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
#Notetaking/Digital_notes
#Notetaking/Paper_note

script to view file with docker tag 
```txt
  TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
  WHERE contains(tags, "Docker") 
  SORT file.cday DESC
  LIMIT 30
```


```txt
TABLE 
  file.mtime AS "Created", 
  tags AS "Tags", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") AND startswith(file.name, "How to")
SORT file.cday DESC
LIMIT 30

```

```txt
TABLE 
  file.mtime AS "Created", 
  tags AS "Tags", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") AND startswith(file.name, "How to")
SORT file.cday DESC
LIMIT 30

```

```txt
TABLE 
  file.mtime AS "Created", 
  length(file.inlinks) AS "Backlinks"
WHERE contains(tags, "How_to") AND startswith(file.name, "How to")
SORT file.cday DESC
LIMIT 30

```

```txt
TABLE 
  file.mtime AS "Created", 
  tags AS "Tags", 
  length(file.inlinks) AS "Backlinks"
SORT file.cday DESC
LIMIT 30

```

```txt
TABLE file.mtime AS Created, length(file.inlinks) AS Backlink_Count
SORT file.cday DESC
LIMIT 300

```