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

	
	
	6  cd test_dir
    7  find /home/thor/test_dir -type d | wc -l
    8  find /home/thor/test_dir -type f | wc -l
    9  find /home/thor/test_dir -mindepth 1 -type d | wc -l
    10  tree /home/thor/test_dir/
    11  history
	12 touch empty_file.txt

```c
thor@host01 ~$ pwd
/home/thor
thor@host01 ~$ touch empty_file.txt
thor@host01 ~$ cat <<EOF > contents_file.txt
> This is not empty file
> 
> EOF
thor@host01 ~$ 
thor@host01 ~$ ls
contents_file.txt  empty_file.txt  test_dir
thor@host01 ~$ cat contents_file.txt
This is not empty file
```


6.Create directory hierarchy inside `/home/thor/` directory.
directory hierarchy: `/home/thor/asia/india/bangalore`
```c
thor@host01 ~$ ls
contents_file.txt  empty_dir  empty_file.txt  test_dir
thor@host01 ~$ mkdir -p /home/thor/asia/india/bangalore
thor@host01 ~$ 
thor@host01 ~$ cd /home/thor/asia/india/bangalore
thor@host01 ~/asia/india/bangalore$ pwd
/home/thor/asia/india/bangalore
thor@host01 ~/asia/india/bangalore$ 
```

1. Copy target file to target directory
  target file name : /home/thor/asia/bangalore.txt
  target directory : /home/thor/asia/india/bangalore


```c

```

Copy source directory to target location
source directory name : `/home/thor/asia/india/bangalore`
target location: `/home/thor/`

```c
cp -r /home/thor/asia/india/bangalore /home/thor/

```

Remove target directory and its contents.
target directory : `/home/thor/asia/india/bangalore`


Let us first inspect the environment. How many containers are running on this host?
```c
docker ps
```

What is the image used by the container?
```c
docker ps
```

Which of the below ports are the published on the `CONTAINER`?
```c
docker inspect 36c24dcdeabf --format '{{len .NetworkSettings.Ports}}'
```


Which of the below ports are the exposed on the `CONTAINER`?
    1  docker ps
    2  docker inspect 36c24dcdeabf
    3  docker inspect 36c24dcdeabf --format '{{len .NetworkSettings.Ports}}'\n
    4  docker ps --format '{{.ID}}: {{.Ports}}'\n
    5  docker ps
    6  docker inspect 36c24dcdeabf --format '{{json .NetworkSettings.Ports}}'\n

```c
docker ps --format '{{.ID}}: {{.Ports}}'\n
```

Which of the ports are published on `Host`?


Run an instance of `kodekloud/simple-webapp` with a tag `blue` and map port `8080` on the container to `38282` on the host.

Run the command: `docker run -p 38282:8080 kodekloud/simple-webapp:blue`  
  
You can run this container in the background after adding the `-d` flag.

To run an instance of the `kodekloud/simple-webapp` with the tag `blue` and map port `8080` on the container to `38282` on the host, you can use the following `docker run` command:

```bash
docker run -d -p 38282:8080 kodekloud/simple-webapp:blue
```

### Explanation:
- `docker run`: This command is used to run a new container.
- `-d`: This flag runs the container in detached mode (in the background).
- `-p 38282:8080`: This option maps port `8080` inside the container to port `38282` on the host.
- `kodekloud/simple-webapp:blue`: This specifies the image (`kodekloud/simple-webapp`) and the tag (`blue`) to use for the container.

### Result:

- The container will start with the `kodekloud/simple-webapp:blue` image.
- Port `8080` inside the container will be mapped to port `38282` on the host.
- You can access the web application by browsing to `http://<host_ip>:38282` (where `<host_ip>` is your host's IP address).

This command should successfully run the container as per your requirements.


[[docker image lab]]
