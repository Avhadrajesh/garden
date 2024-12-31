


Here's a short and simple note on linking Linux commands with example code snippets:

### 1. **Semicolon (`;`)**

- **Usage**: Run commands sequentially, regardless of success.
- **Example**:
    
    ```bash
    echo "Hello"; echo "World"
    ```
    
    - Both commands will run one after the other.

### 2. **Double Ampersand (`&&`)**

- **Usage**: Run the second command only if the first succeeds (exit status 0).
- **Example**:
    
    ```bash
    mkdir new_folder && cd new_folder
    ```
    
    - `cd` will run only if `mkdir` is successful.

### 3. **Double Pipe (`||`)**

- **Usage**: Run the second command only if the first fails (non-zero exit status).
- **Example**:
    
    ```bash
    mkdir existing_folder || echo "Directory already exists!"
    ```
    
    - If `mkdir` fails, the message "Directory already exists!" will be shown.

### 4. **Pipe (`|`)**

- **Usage**: Use the output of one command as input for another.
- **Example**:
    
    ```bash
    ls | grep "txt"
    ```
    
    - The output of `ls` (file list) is passed to `grep` to search for files containing "txt".

### 5. **Tee (`| tee`)**

- **Usage**: Pipe output to a file and another command simultaneously.
- **Example**:
    
    ```bash
    echo "Hello World" | tee output.txt | grep "World"
    ```
    
    - The text "Hello World" is saved in `output.txt` and also passed to `grep`.

### 6. **Subshell (`( )`)**

- **Usage**: Group commands to run in a separate process (subshell).
- **Example**:
    
    ```bash
    (cd /tmp && ls)
    ```
    
    - The `cd` and `ls` run in a subshell without affecting the current shell.

### 7. **Background (`&`)**

- **Usage**: Run a command in the background.
- **Example**:
    
    ```bash
    long_running_command & echo "This runs immediately"
    ```
    
    - `long_running_command` runs in the background, and the second command executes right away.

These operators allow you to control how multiple commands interact and execute in Linux!

```c
sudo apt install $$ sudo apt install ranchor dsktop
```