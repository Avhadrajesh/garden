---
Zettlekasten Type:
  - Fleeting Notes
  - " Literature Notes"
  - " Permanent Notes"
Status:
  - Ready to Process
---

```start-multi-column
ID: ID_8tp4
Number of Columns: 2
Largest Column: standard
border: off
```

### <% moment(tp.file.title, "YYYY-MM-DD").format("dddd Do MMMM YYYY") %> 
<< [[<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').subtract(1, 'd').format('YYYY-MM-DD') %>|Yesterday]] | [[<% fileDate = moment(tp.file.title, 'YYYY-MM-DD').add(1, 'd').format('YYYY-MM-DD') %>|Tomorrow]] >>

<%*
const today = tp.date.now("YYYY-MM-DD");
// Filter out files that shouldn't be included
const filteredFiles = app.vault.getMarkdownFiles().filter(file => {
  const fileCache = app.metadataCache.getFileCache(file);
  // If the file has a createdOn field and it's value is today, include it
  return fileCache?.frontmatter?.createdOn === today;
});
// Convert list of files into list of links
const links = filteredFiles.map(file => `[[${file.basename}]]`).join("\n");
tR += links;
_%>
