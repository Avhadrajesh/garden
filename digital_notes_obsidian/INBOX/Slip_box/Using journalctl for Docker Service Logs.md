---
title: journalctl
category: Devops/docker
tags:
  - Devops/Containers/Docker
  - How_to
Zettlekasten Type:
  - Fleeting Notes
  - " Permanent Notes"
  - " Literature Notes"
Zettlekasten Status:
  - Finished
  - " In process"
  - " Ready to Process"
---
### Command Overview

- **Command**: journalctl -u docker.service
- **Purpose**: View logs for the Docker service managed by systemd.

### Common Usage

1. **View Logs**:
    - Command:`journalctl -u docker.service`
        
2. **Follow Logs in Real-Time**:
    - Command:`journalctl -u docker.service -f`
        
3. **Limit Log Entries**:
    - Command to view the last 100 entries:`journalctl -u docker.service -n 100`
        
4. **Filter by Time Frame**:`journalctl -u docker.service --since "YYYY-MM-DD" --until "YYYY-MM-DD"`
    
5. **Priority Filtering**:
    - Command to show only error messages:`journalctl -u docker.service -p err`
        

### Example Output

- Typical log entries might look like:

`1 -- Logs begin at Mon 2023-10-01 12:00:00 UTC, end at Mon 2023-10-02 12:00:00 UTC. -- 2 Oct 01 12:00:00 hostname dockerd[1234]: time="2023-10-01T12:00:00.000000000Z" level=info msg="Starting up" 3 Oct 01 12:00:01 hostname dockerd[1234]: time="2023-10-01T12:00:01.000000000Z" level=info msg="API listen on /var/run/docker.sock" 4 Oct 01 12:00:02 hostname dockerd[1234]: time="2023-10-01T12:00:02.000000000Z" level=error msg="Failed to start container"`

### Troubleshooting Tips

- **Check for Errors**: Look for error messages in the logs to diagnose issues:
    - Docker daemon not starting.
    - Issues with container creation or networking.
    - Problems with storage drivers or permissions.
- **Additional Context**: Use the command journalctl -xe for broader system log context.

---

These notes provide a quick reference for using journalctl to manage and troubleshoot the Docker service logs effectively.