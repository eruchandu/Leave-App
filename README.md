
# Leave Application

The Staff Leave Application is a web-based system designed to simplify the leave application process for employees within an organization. This application allows employees to submit leave requests with accompanying messages, and managers can review, accept, or reject those requests. The leave status remains pending until a decision is made by the manager.


## Features
#### Employee
- Leave History : Employees can view their leave history, which can be in any of this state pending, approved, and rejected, if it is in pending state it can be Revoked.

- Leave Application: Employees can submit leave application specifying the duration and providing additional messages and Attachment.

#### Manager
- Leave Approval/Rejection: Managers can review pending leave requests and either approve or reject them.

- Employees : These are Reportees of a Manager. Manager can increase their total leaves ,can make changes in Employee data by clicking Edit ,He/she can also remove an employee from his/her team.

- AddEmployes : Manager can search for unassigned EMployees and them to their team if required.

- Manager has all the features of Employee.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`S3_REGION`

`S3_BUCKET`

`DB_PASS`

`DB_USER`

`RECIVE_MAIL`

`SEND_MAIL`

`SEND_PASS`

`SECRET_KEY`
## Installation
- Clone this project using git clone 
```bash
    git clone https://github.com/eruchandu/Leave-App.git
```
- Navigate to backend folder
```bash
    cd backend
```
- install Node Modules
```
npm install
```
- Run the server using following Commands
```
npm start 
or 
node server.js 
```


## 🔗 Links
http://3.111.168.62/

Login :-  MANAGER EMPID & PASS DBIN500
          Employee EMPID & PASS DBIN496
