---
title: Dockerfile
tags:
  - Devops/Containers/Docker
  - Notetaking/Zettlekasten/Fleeting_notes
  - What_is
category: 
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
##  *What is Dockerfile?*

A Dockerfile is a text file used to define the configuration of a [Docker container](obsidian://open?vault=digital_notes_obsidian&file=What%20is%20docker%20Container). 

The Dockerfile uses DSL (Domain Specific Language) and contains instructions for generating a Docker image. Dockerfile will define the processes to quickly produce an image. While creating your application, you should create a Dockerfile in order since the Docker daemon runs all of the instructions from top to bottom.

>  ==Dockerfile is the source code of the image==

Write down the steps before creating Dockerfile refer below example
1. OS- ubuntu
2. update apt repo
3. Install dependencies using apt
4. Install dependencies using pip
5. Copy source code to /apt folder
6. Run the web server using "flask" command.
![[Dockerfile.png]]
Create dockerfile named Dockerfile & write down the Instruction for setting up application
[[How to create python flask application]]

Dockerfile consist two things "Instruction" and "Arguments" also known as [Docker commands](obsidian://open?vault=digital_notes_obsidian&file=Dockerfile%20commands)
Instruction are Mention in Caps
Argument is commands or tasks which needs to be executed.


[[Dockerfile commands]]


