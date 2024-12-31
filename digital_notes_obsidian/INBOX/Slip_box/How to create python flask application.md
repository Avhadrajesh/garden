---
title: 
tags:
  - Devops/Containers/Docker
  - Devops/Scripting_and_Programming/Python
  - Devops/Scripting_and_Programming/Python/Flask
  - Notetaking/Zettlekasten/Fleeting_notes
  - How_to
category: Python
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
# Simple Web Application

This is a simple web application using [Python Flask](http://flask.pocoo.org/) and [MySQL](https://www.mysql.com/) database. 
This is used in the demonstration of the development of Ansible Playbooks.
```c
# Clone the repo
git clone https://github.com/mmumshad/simple-webapp-flask.git

```
  Below are the steps required to get this working on a base linux system.
    - **Install all required dependencies**
  - **Install and Configure Web Server**
  - **Start Web Server**
   [GitHub - mmumshad/simple-webapp-flask: Simple Flask based web application](https://github.com/mmumshad/simple-webapp-flask.git)
## 1. Install all required dependencies
Python and its dependencies
  ```bash
  apt-get install -y python3 python3-setuptools python3-dev build-essential python3-pip default-libmysqlclient-dev
  ```
   
## 2. Install and Configure Web Server
Install Python Flask dependency
```bash
pip3 install flask
pip3 install flask-mysql
```

- Copy `app.py` or download it from a source repository
- Configure database credentials and parameters 

## 3. Start Web Server
Start web server
```bash
FLASK_APP=app.py flask run --host=0.0.0.0
```

## 4. Test
Open a browser and go to URL
```
http://<IP>:5000                            => Welcome
http://<IP>:5000/how%20are%20you            => I am good, how about you?
```