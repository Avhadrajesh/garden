# Book Tracker with table views. 

## [[Completed Books]] 
```dataview
Table ("![|100](" + cover + ")") as "Cover", author as "Author", total as "Pages", category as "Category", rating as "Rating"
From #book
where contains(status,"Completed")
```

---
## [[Reading List]]
```dataview
Table ("![|100](" + cover + ")") as "Cover", author as "Author", total as "Pages", category as "Category"
From #book
where contains(status,"Unread")
```