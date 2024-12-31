---
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
Run a container named `blue-app` using image `kodekloud/simple-webapp` and set the environment variable `APP_COLOR` to `blue`. Make the application available on port `38282` on the host. The application listens on port `8080`.

Run the command : `docker run -p 38282:8080 --name blue-app -e APP_COLOR=blue -d kodekloud/simple-webapp`  

`docker run -d -p 38282:8080 --name blue-app -e APP_COLOR=blue kodekloud/simple-webapp`

### Explanation:

- `docker run`: This command is used to start a new Docker container.
- `-d`: This flag runs the container in **detached mode** (background).
- `-p 38282:8080`: This flag maps port `8080` inside the container (where the app listens) to port `38282` on the host.
- `--name blue-app`: This flag names the container `blue-app`.
- `-e APP_COLOR=blue`: This flag sets the environment variable `APP_COLOR` to `blue` inside the container.
- `kodekloud/simple-webapp`: This is the image used to run the container.
  To know the env field from within a `webapp` container, run `docker exec -it blue-app env`


Deploy a `mysql` database using the `mysql` image and name it `mysql-db`.

```c
docker run -d --name mysql-db -e   
docker run -d --name mysql-db -e MYSQL_ROOT_PASSWORD=db_pass123 mysql

```

Set the database password to use `db_pass123`. Lookup the mysql image on Docker Hub and identify the correct environment variable to use for setting the root password.
Run the command: `docker run -d -e MYSQL_ROOT_PASSWORD=db_pass123 --name mysql-db mysql`  
  
To know the env field from within a `mysql-db` container, run `docker exec -it mysql-db env`

The command you provided is almost correct for deploying a MySQL container, but it's missing the required port mapping for MySQL to be accessible from outside the container. By default, MySQL runs on port `3306` inside the container, so you'll need to expose this port to access MySQL from your host machine.

Here’s the corrected command:

### Correct Command:

```bash
docker run -d -e MYSQL_ROOT_PASSWORD=db_pass123 -p 3306:3306 --name mysql-db mysql
```

### Explanation:

- `docker run`: This command runs a new container.
- `-d`: Runs the container in **detached mode** (background).
- `-e MYSQL_ROOT_PASSWORD=db_pass123`: Sets the root password for the MySQL database to `db_pass123`.
- `-p 3306:3306`: Maps port `3306` on the host machine to port `3306` inside the container, allowing you to connect to the MySQL instance from the host.
- `--name mysql-db`: Names the container `mysql-db`.
- `mysql`: Specifies the MySQL image from Docker Hub.

### Step 1: Verify the container is running

After running the command, you can check if the container is running:

```bash
docker ps
```

You should see output similar to this:

```
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                  NAMES
<container_id> mysql        "docker-entrypoint.s…"   <time>           Up <time>       0.0.0.0:3306->3306/tcp   mysql-db
```

### Step 2: Access the MySQL Database

To access MySQL inside the container, run the following command:

```bash
docker exec -it mysql-db mysql -u root -p
```

When prompted, enter the root password `db_pass123` and you should be inside the MySQL shell.

### Conclusion:

This command successfully deploys a MySQL container with the root password set to `db_pass123`, making the MySQL service available on port `3306` on your host.