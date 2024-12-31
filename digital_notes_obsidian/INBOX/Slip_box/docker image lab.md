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
### Notes Based on Docker Commands and Output

1. **Listing Docker Images:**
    
    - **Command**: `docker images`
    - **Output**: Lists all Docker images with their repository, tag, image ID, creation date, and size.
    - **Example Output**:
        
        ```
        REPOSITORY                      TAG       IMAGE ID       CREATED        SIZE
        alpine                          latest    91ef0af61f39   3 months ago   7.79MB
        nginx                           alpine    c7b4f26a7d93   4 months ago   43.2MB
        nginx                           latest    39286ab8a5e1   4 months ago   188MB
        postgres                        latest    b781f3a53e61   4 months ago   432MB
        ubuntu                          latest    edbfe74c41f8   4 months ago   78MB
        redis                           latest    590b81f2fea1   4 months ago   117MB
        mysql                           latest    a82a8f162e18   5 months ago   586MB
        kodekloud/simple-webapp-mysql   latest    129dd9f67367   6 years ago    96.6MB
        kodekloud/simple-webapp         latest    c6e3cd9aae36   6 years ago    84.8MB
        ```
        
2. **Counting the Number of Docker Images:**
    
    - **Command**: `docker images -q | wc -l`
    - **Output**: Shows the total number of Docker images available.
    - **Example Output**:
        
        ```
        9
        ```
        
3. **Displaying Docker Image IDs:**
    
    - **Command**: `docker images -q`
    - **Output**: Lists the image IDs of all Docker images.
    - **Example Output**:
        
        ```
        91ef0af61f39
        c7b4f26a7d93
        39286ab8a5e1
        b781f3a53e61
        edbfe74c41f8
        590b81f2fea1
        a82a8f162e18
        129dd9f67367
        c6e3cd9aae36
        ```
        
4. **Getting the Size of a Specific Docker Image (e.g., `ubuntu`):**
    
    - **Command**: `docker images ubuntu --format "{{.Size}}"`
    - **Output**: Displays the size of the `ubuntu` image.
    - **Example Output**:
        
        ```
        78MB
        ```
        
5. **Building a Docker Image from a Dockerfile:**
    
    - **Command**: `docker build -t webapp-color .`
    - **Output**: Displays the process of building the Docker image, including pulling the base image, installing dependencies, copying files, and setting up the container.
    - **Example Output**:
        
        ```
        Sending build context to Docker daemon  65.02kB
        Step 1/6 : FROM python:3.6
        3.6: Pulling from library/python
        0e29546d541c: Pull complete
        9b829c73b52b: Pull complete
        cb5b7ae36172: Pull complete
        Digest: sha256:f8652afaf88c25f0d22354d547d892591067aa4026a7fa9a6819df9f300af6fc
        Status: Downloaded newer image for python:3.6
        ---> 54260638d07c
        Step 2/6 : RUN pip install flask
        ---> Running in d6c035f0296b
        ...
        Successfully built de44acd5407b
        Successfully tagged webapp-color:latest
        ```
        
6. **Viewing Updated List of Docker Images After Build:**
    
    - **Command**: `docker images`
    - **Output**: Displays the list of Docker images after building the `webapp-color` image.
    - **Example Output**:
        
        ```
        REPOSITORY                      TAG           IMAGE ID       CREATED          SIZE
        webapp-color                    latest        de44acd5407b   40 seconds ago   913MB
        alpine                          latest        91ef0af61f39   3 months ago     7.79MB
        nginx                           alpine        c7b4f26a7d93   4 months ago     43.2MB
        nginx                           latest        39286ab8a5e1   4 months ago     188MB
        postgres                        latest        b781f3a53e61   4 months ago     432MB
        ubuntu                          latest        edbfe74c41f8   4 months ago     78MB
        redis                           latest        590b81f2fea1   4 months ago     117MB
        mysql                           latest        a82a8f162e18   5 months ago     586MB
        python                          3.6           54260638d07c   3 years ago      902MB
        kodekloud/simple-webapp-mysql   latest        129dd9f67367   6 years ago      96.6MB
        kodekloud/simple-webapp         latest        c6e3cd9aae36   6 years ago      84.8MB
        ```
        

### Summary:

- Commands such as `docker images`, `docker images -q`, `docker build`, and others are used to manage and inspect Docker images.
- The output from these commands provides essential information like image sizes, IDs, and statuses during the build process.


Build a new smaller docker image by modifying the same Dockerfile and name it `webapp-color` and tag it `lite`.
Hint: Find a smaller base image for `python:3.6`. Make sure the final image is less than `150MB`.
Name: webapp-color:lite
Image size less than 150MB.

In the `webapp-color` directory, run the `ls -l` command to list the Dockerfile and other files.

And modify Dockerfile to use `python:3.6-alpine` image and then build using `docker build -t webapp-color:lite .`

```c
    1  docker images
    2  docker images -q | wc -l\n
    3  docker images -q\n
    4  docker images ubuntu --format "{{.Size}}"\n
    5  docker images
    6  ls
    7  cd webapp-color
    8  ls
    9  cat Dockerfile
   10  docker build -t webapp-color .
   11  docker images
   12  docker run -d -p 8282:8080 webapp-color
   13  docker run -p 8282:8080 webapp-color
   14  which apt
   15  docker run python:3.6 cat /etc/*release*/
   16  docker images
   17  ls
   18  cat Dockerfile
   19  vi Dockerfile
   20  docker build -d -t webapp-color:lite
   21  docker build -d  webapp-color:lite
   22  docker build -t webapp-color:lite
   23  history
   24  docker build -t webapp-color:lite
   25  docker images
   26  docker ps
   27  docker stop 611
   28  docker ps
   29  docker images
   30  ls
   31  cat Dockerfile
   32  docker build -t webapp-color:lite
   33  docker build --help
   34  docker build -t webapp-color:lite .
   35  docker run -d -p 8383:8080 webapp-color:lite
```


Run an instance of the new image `webapp-color:lite` and publish port `8080` on the container to `8383` on the host.
Container with image `webapp-color:lite`
Container to publish port 8080 to 8383


Command: `docker run -p 8383:8080 webapp-color:lite`  
  
To run the container in the background, add the `-d` flag.
docker run -d -p 8383:8080 webapp-color:lite

[[Environment variable docker lab]]
