# Leave-App
1. Introduction :
   
	The Staff Leave Application is a web-based system designed to simplify the leave application process for employees within an organization. This application allows employees 
        to submit leave requests with accompanying messages, and managers can review, accept, or reject these requests. The leave status remains pending 
        until a decision is made by the manager.

3. Features

    2.1 Employee Features:
   
	Leave Application: Employees can submit leave applications specifying the duration and providing additional messages and Attachment.

        Leave History: Employees can view their leave history, including pending, approved, and rejected leave requests,
                      
   
    2.2 Manager Features
   
	Leave Approval/Rejection: Managers can review pending leave requests and either approve or reject them.

	Leave History: Managers can have his own Leave history.

        Leave Application: Manager can also Apply leave which has to be approved by his reportie
   
        Employees : These are the Reporties of a Manager. Manager can increase their total leaves ,can make changes in his data by clicking Edit ,He/she can also remove an employee 
                    from his/her team.

   	AddEmployes : Manager can search for unassigned EMployees and them to their team  if required
	
5. Technology Stack 

	Frontend: React, Bootstrap

	Backend: Node.js, Express.js

	Database: MongoDB

	Authentication: JSON Web Tokens (JWT)

	Version Control: Git

I have Build the frontend using Reactjs and Bootstrap

React 
	useState - to hold the local state of the component
 
 	useEffect - Used for Rendering the page i.e when an action performed side effects is done by this hook
  
  	useContext - Used to store the the details in a local store and make them aviliable to required coponents instead of sending them as props 
	
 	toast   -  for Notifications
 
 	react-icons
	
Frontend i have Written components and i made Api calls to the Server which return me data and i REndered on the Browswer 

    Home page  (landing page)
    Login page  ->   post request for login  i.e localhost:3500/   => if yes -> /employee page else HOmepage
    
    Employee page => THis is the Dash board and side bar has 
    
			component                  api                           purpose
		      
			profile			localhost:3500/profile      	Display user deatils
		      
			ApplyLeave		/apply                        	Application form for applying leave with attachment also displays Leave count

			Leaves			/leaves                       	show the leaves of an Employee
		      
						/revoke                       	employee can delete his leave if it is pending state 

	--------------------------------------------Only for managers -----------------------------------------------------------
			      
		      Employees             /employees                    Displays All the employees under the manager
	
	                                    /employees:id                 update user deatils by edit buttton through model 
				     
				            /employees/del                Delete the employee
			
   			Add employee	    /employees/add                Add the new Employees to your team

					    /employees/list               get the list of unassigned Employees 


			Approvals          /approval                      Get he list of pending leave requests

					   /approving                     Updating the leave to ACCEPT / REJECT 
		                                                          Mail is sent using node mailer on Updating Leave 
	  
 		      
    
	
	
         
                       

