---
title: create own docker image
tags:
  - Devops/Containers/Docker
  - How_to
  - Notetaking/Zettlekasten/Fleeting_notes
category: Devops/docker
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
To create your own [Docker image](obsidian://open?vault=digital_notes_obsidian&file=Docker%20Images):

1. Write a [Dockerfile](obsidian://open?vault=digital_notes_obsidian&file=What%20is%20Dockerfile)  that defines the base image, dependencies, and commands.
2. Build the image using `docker build`.
```c
docker build Dockerfile —t mmumshad/my-custom-app
```

1. Run the image using `docker run`.
2. Optionally, push the image to Docker Hub for sharing.

[[What is Dockerfile]]

