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
1. [[Evolution of Waterfall, Agile, and DevOps]]
2. [[What is DevOps]]
3. [[Why DevOps]]
4. [[Benefits of DevOps]]
5. [[DevOps Stages]]
6. [[DevOps Lifecycle]]
7. [[Various Automation in DevOps]]
8. [[Overview of CICD]]

IT 
	
	Develop the Software Applications :::
	
	SDLC - Software Development Life Cycle ::
	
	
	Software - Any Computer Application
	
		Desktop Applications
		
		Web Applications
		
		Mobile Applications
		
		Embedded Applications
	
	SDLC - Software Development Life Cycle ::
	
		Desktop Application ::

	- SuperMarket Billing System  
	  Functions :
		- User Interface Design
		- Stock_Maintainence
		- Payment Module
			- Cash
			- Card
		- Billing
		- Print_Bills
		  
		  Stages of SDLC ::
		  
		  Requirement Analysis
		  Design/Document
		  Code/Develop
		  Test 
		  Implementation 
		  Monitor/Maintain
- ## Evolution of Software Development
  
  1. **Waterfall Model**
	- Linear, top-down approach
	- Used for monolithic applications
	- Less flexible to changes
	- Long development cycles (12+ months)
	  2. **Agile Methodology**
	- Iterative development approach
	- Breaks work into smaller iterations
	- More flexible to changes
	- Continuous delivery with manual approvals
	  3. **DevOps Approach**
	- Combines development and operations
	- Focuses on automation
	- Enables continuous deployment
	- Reduces manual interventions
- ## DevOps Lifecycle
  
  1. Source Code Creation
  2. Code Commit to Repository
  3. Automated Build
  4. Automated Testing
  5. Production Deployment
  6. Continuous Monitoring
  7. Customer Feedback
- ## Key Components
- ### Teams Involved
- Infrastructure Management
- Application Development
- Testing
- Release Management
- Production Support
- Production Monitoring
- IT Security
- ### Environments
  
  ```
  Non-Production          Production
  ---------------        ------------
  - Dev                  - Production
  - Build                  Servers
  - Test (QA/UAT)
  ```
- ### Common Tools
- **Source Control**: GitHub, AWS CodeCommit, Azure Repos
- **CI/CD**: Jenkins, AWS CodePipeline, Azure Pipeline
- **Containerization**: Docker, Kubernetes
- **Configuration**: Ansible
- **Monitoring**: Prometheus, Grafana, AppDynamics
- ## Key Capabilities
- Continuous Development
- Continuous Integration
- Continuous Testing
- Continuous Delivery/Deployment
- Continuous Monitoring
- ## Architecture Types
  
  1. **Monolithic**
	- Tightly coupled
	- Limited to continuous delivery
	- Difficult to deploy independently
	  2. **Microservices**
	- Loosely coupled
	- Enables continuous deployment
	- Independent service deployment
	  
	  Links : :   [[Devops]] ,
-