// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import { app } from '../server.js'; 
// import { userModel, leaveModel } from '../schema.js'; // assuming your app is exported from a file named 'app.js'

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('POST request for displaying employees /employees', () => {
//   it('should return a list of employees', (done) => {
//     const userModelStub = sinon.stub(userModel, 'find');
//     const mockUsers = [
//       {
//         _id: '1',
//         name: 'chandu',
//         empid: 'DBIN496',
//         role: 'intern',
//         contact: '1234567890',
//         Address: 'Hyderabad',
//         total: 5
//       }
//     ];

//     userModelStub.withArgs({ empid: 'DBIN496' }).resolves(mockUsers);

//     chai.request(app)
//       .post('/employees')
//       .send({ empid: 'DBIN496' })
//       .end((err, res) => {
//         if (err) {
//           console.error("Error occurred:", err);
//           userModelStub.restore();
//           return done(err);
//         }

//         expect(res.body.success).to.be.true;
//         expect(res.body.content).to.be.an('array');
//         userModelStub.restore();
//         done();
//       });
//   }).timeout(5000); // Set a longer timeout for the test
// });

// describe('POST request for Approving the Leave /approval', () => {
//   it('should return a list of Approvals of the manager', (done) => {
//     const leaveModelStub = sinon.stub(leaveModel, 'find');
//     const mockApprovals = [
//       {
//         _id: '1',
//         empid: 'DBIN496', // Ensure empid matches the one provided in the request body
//         head: 'DBIN500',
//         from: '22-03-2024',
//         to: '23-03-2024',
//         message: 'sick',
//         status: 'pending'
//       },
//       {
//         _id: '2',
//         empid: 'DBIN496', // Ensure empid matches the one provided in the request body
//         head: 'DBIN500',
//         from: '27-03-2024',
//         to: '29-03-2024',
//         message: 'festival',
//         status: 'pending'
//       }
//     ];

//     leaveModelStub.withArgs({ empid: 'DBIN500' }).resolves(mockApprovals);

//     chai.request(app)
//       .post('/approval')
//       .send({ empid: 'DBIN500' })
//       .end((err, res) => {
//         if (err) {
//           console.error("Error occurred:", err);
//           leaveModelStub.restore();
//           return done(err);
//         }

//         expect(res.body.success).to.be.true;
//         expect(res.body.content).to.be.an('array');
//         leaveModelStub.restore();
//         done();
//       });
//   }).timeout(5000); // Set a longer timeout for the test
// });


import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import {app} from '../server.js'; 
import {userModel,leaveModel} from '../schema.js'// assuming your app is exported from a file named 'app.js'
chai.use(chaiHttp);
const { expect } = chai;

describe('POST  request for displaying employees /employees', () => {
  it('should return a list of employees', (done) => {
    const userModelMock = sinon.mock(userModel);
    const mockUsers = [
      {
        _id: '1',
        name: 'chandu',
        empid: 'DBIN496',
        role: 'intern',
        contact: '1234567890',
        Address: 'Hyderabad',
        total: 5
      },

    ];

    userModelMock.expects('find').resolves(mockUsers);
    chai.request(app)
      .post('/employees')
      .send({ empid: 'DBIN496' })
      .end(
        (err, res) => {
        // expect(res).to.have.status(200);
        console.log(res.body);
        expect(res.body.success).to.be.true;
        expect(res.body.content).to.be.an('array');
        userModelMock.verify();
        userModelMock.restore();
        done();
      });
  });
});
describe('POST request for Approvals of the manager  /approval', function() {
  this.timeout(5000);
  it('should return a list of Approvals of the manager', function(done) {
    const leaveModelMock = sinon.mock(leaveModel);

    const mockApprovals = [{
        _id: '1',
        empid: 'DBIN496', 
        head: 'DBIN500',
        from: '22-03-2024',
        to: '23-03-2024',
        message: 'sick',
        status: 'pending'
      },
      {
        _id: '2',
        empid: 'DBIN496', 
        head: 'DBIN500',
        from: '27-03-2024',
        to: '29-03-2024',
        message: 'festival',
        status: 'pending'
      }
    ];
    leaveModelMock.expects('find').resolves(mockApprovals);
    chai.request(app)
      .post('/approval')
      .send({
        empid:'DBIN500'})
      .end(function(err, res)
       {
          expect(res.body.success).to.be.true;
          expect(res.body.content).to.be.an('array');
          leaveModelMock.verify();
          leaveModelMock.restore();
          done();
      });
      
  });
});
describe('POST request for Leaves of the Employees  /leaves', function() {
  this.timeout(5000);
  it('should return a list of Approvals of the manager', function(done) {
    const leaveModelMock = sinon.mock(leaveModel);
    const mockLeaves = [{
        _id: '1',
        empid: 'DBIN496', 
        head: 'DBIN500',
        from: '22-03-2024',
        to: '23-03-2024',
        message: 'sick',
        status: 'pending'
      },
      {
        _id: '2',
        empid: 'DBIN496', 
        head: 'DBIN500',
        from: '27-03-2024',
        to: '29-03-2024',
        message: 'festival',
        status: 'pending'
      }
    ];
    leaveModelMock.expects('find').resolves(mockLeaves);
    chai.request(app)
      .post('/leaves')
      .send({
        empid:'DBIN496'})
      .end(function(err, res)
       {
          expect(res.body.success).to.be.true;
          expect(res.body.content).to.be.an('array');
          leaveModelMock.verify();
          leaveModelMock.restore();
          done();
      });
      
  });
});
// describe('Authentication',async () => {
//   let token;
//   let userName='DBIN500';
//   let pass='DBIN500'
//   before(async () =>{
//     try{
//       const loginRes = await chai.request(app)
//       .post('/')
//         .send({
//           empid: userName,
//           password: pass
//         });
//         //expect(loginRes).to.have.property('cookies');
//         console.log("Login res",loginRes);
//         token = loginRes.body.token;
//         console.log("token = ",token);
//       }
//     catch(error){
//       console.log("Error in before ",error)
//       throw(error);
//     }
//   })
//   it('Check Employees of your team ', async () => {
//     try {
//       let temp = {
//         jwt:token
//       }
//       console.log(temp);
//       const res = await chai.request(app)
//       .post('/employees')
//       expect(res.body).to.have.property('message').that.equal('Employees of your team');
//       expect(res.body).to.have.property('success').that.equal(true);
//       expect(res.body).to.have.property('content');

    
//       agent.close();
//     } catch (error) {
//       throw error;
//     }
//   }).timeout(10000);
  
// });
 