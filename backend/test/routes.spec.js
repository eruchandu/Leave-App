// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import { app } from '../server.js'; 
import { userModel, leaveModel } from '../schema.js'; // assuming your app is exported from a file named 'app.js'
import { verifyToken } from '../server.js';
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


// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import {app} from '../server.js'; 
// import {userModel,leaveModel} from '../schema.js'// assuming your app is exported from a file named 'app.js'
// chai.use(chaiHttp);
// const { expect } = chai;

// describe('POST  request for displaying employees /employees', () => {
//   it('should return a list of employees', (done) => {
//     const userModelMock = sinon.mock(userModel);
//     const mockUsers = [
//       {
//         _id: '1',
//         name: 'chandu',
//         empid: 'DBIN496',
//         role: 'intern',
//         contact: '1234567890',
//         Address: 'Hyderabad',
//         total: 5
//       },

//     ];

//     userModelMock.expects('find').resolves(mockUsers);
//     chai.request(app)
//       .post('/employees')
//       .send({ empid: 'DBIN496' })
//       .end(
//         (err, res) => {
//         // expect(res).to.have.status(200);
//         console.log(res.body);
//         expect(res.body.success).to.be.true;
//         expect(res.body.content).to.be.an('array');
//         userModelMock.verify();
//         userModelMock.restore();
//         done();
//       });
//   });
// });
// describe('POST request for Approvals of the manager  /approval', function() {
//   this.timeout(5000);
//   it('should return a list of Approvals of the manager', function(done) {
//     const leaveModelMock = sinon.mock(leaveModel);

//     const mockApprovals = [{
//         _id: '1',
//         empid: 'DBIN496', 
//         head: 'DBIN500',
//         from: '22-03-2024',
//         to: '23-03-2024',
//         message: 'sick',
//         status: 'pending'
//       },
//       {
//         _id: '2',
//         empid: 'DBIN496', 
//         head: 'DBIN500',
//         from: '27-03-2024',
//         to: '29-03-2024',
//         message: 'festival',
//         status: 'pending'
//       }
//     ];
//     leaveModelMock.expects('find').resolves(mockApprovals);
//     chai.request(app)
//       .post('/approval')
//       .send({
//         empid:'DBIN500'})
//       .end(function(err, res)
//        {
//           expect(res.body.success).to.be.true;
//           expect(res.body.content).to.be.an('array');
//           leaveModelMock.verify();
//           leaveModelMock.restore();
//           done();
//       });
      
//   });
// });
// describe('POST request for Leaves of the Employees  /leaves', function() {
//   this.timeout(5000);
//   it('should return a list of Approvals of the manager', function(done) {
//     const leaveModelMock = sinon.mock(leaveModel);
//     const mockLeaves = [{
//         _id: '1',
//         empid: 'DBIN496', 
//         head: 'DBIN500',
//         from: '22-03-2024',
//         to: '23-03-2024',
//         message: 'sick',
//         status: 'pending'
//       },
//       {
//         _id: '2',
//         empid: 'DBIN496', 
//         head: 'DBIN500',
//         from: '27-03-2024',
//         to: '29-03-2024',
//         message: 'festival',
//         status: 'pending'
//       }
//     ];
//     leaveModelMock.expects('find').resolves(mockLeaves);
//     chai.request(app)
//       .post('/leaves')
//       .send({
//         empid:'DBIN496'})
//       .end(function(err, res)
//        {
//           expect(res.body.success).to.be.true;
//           expect(res.body.content).to.be.an('array');
//           leaveModelMock.verify();
//           leaveModelMock.restore();
//           done();
//       });
      
//   });
// });
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

import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { app } from '../server.js'; // Provide the correct path to your Express app

 // Provide the correct path to your Express app

const { expect } = chai;

chai.use(chaiHttp);

describe('POST /approval', () => {
  let verifyTokenStub;
  let findStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findStub = sinon.stub();
  });

  afterEach(() => {
    verifyTokenStub.restore();
  });

  

  it('should return an error if no token is provided',  (done) => {
     chai.request(app)
      .post('/approval')
      .send({ empid: '496' }).end((err,res)=>{
        expect(res.body).to.have.property('auth').to.equal(false);
        expect(res.body).to.have.property('message').to.equal('No token provided.');
        done();
      })

    //expect(res).to.have.status(403);
    
  });

  it('should return an error if token is invalid', async () => {
    verifyTokenStub.callsArgWith(2, new Error('Invalid token'));

    const res = await chai.request(app)
      .post('/approval')
      .set('Cookie', ['jwt=invalid_token'])
      .send({ empid: '496' }).end((err,res)=>
      { 
      expect(res.body).to.have.property('auth').to.equal(false);
      expect(res.body).to.have.property('message').to.equal('Failed to authenticate token.');
      })
  });



  it('should return approvals for a given employee ID if token is provided and valid',(done) => {
    const mockToken = 'mock_token';
    const mockDecoded = { id: '496' };
    const mockApprovals = [{ id: '496', head: '500', status: 'pending'}];

    verifyTokenStub.callsArgWith(2, null, mockDecoded);
    findStub.withArgs({ head: '500', status: 'pending' }).returns(mockApprovals);

     chai.request(app)
      .post('/approval')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid: '500' })
      .end((err,res)=>{
        expect(res.body).to.have.property('success').to.equal(true);
        expect(res.body).to.have.property('content').to.an('array');
        done();
      })
  
  }).timeout(10000);

})

describe('POST /', () => {
  it('should return success true with valid credentials', async () => {
    const password = await bcrypt.hash('testpassword', 10); // Hash a test password
    const user = { empid: 'testEmpId', password: password }; // Create a test user

    userModel.findOne = async () => user;

    const res = await chai.request(app)
      .post('/')
      .send({ empid: 'testEmpId', password: 'testpassword' }); // Send a request with valid credentials

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.be.true;
    expect(res.body).to.have.property('message').to.equal('Found');
    expect(res.body).to.have.property('content').to.deep.equal(user);
    expect(res.body).to.have.property('token').to.be.a('string');
  });

  it('should return "Invalid Password" with invalid password', async () => {
    const password = await bcrypt.hash('testpassword', 10); 
    const user = { empid: 'testEmpId', password: password }; 
    userModel.findOne = async () => user;
    const res = await chai.request(app)
      .post('/')
      .send({ empid: 'testEmpId', password: 'wrongpassword' }); 

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.be.false;
    expect(res.body).to.have.property('message').to.equal('Invalid Password');
  });

  it('should return "User Not found" when user does not exist', async () => {
    userModel.findOne = async () => null;
    const res = await chai.request(app)
      .post('/')
      .send({ empid: 'nonExistingEmpId', password: 'somepassword' }); // Send a request with non-existing user
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.be.false;
    expect(res.body).to.have.property('message').to.equal('User Not found');
  });
});

describe('POST /employees', () => {
  let verifyTokenStub;
  let findStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findStub = sinon.stub();
  });

  afterEach(() => {
    verifyTokenStub.restore();
  });

  

  it('should return an error if no token is provided',  (done) => {
     chai.request(app)
      .post('/employees')
      .send({ empid: '500' }).end((err,res)=>{
        expect(res.body).to.have.property('auth').to.equal(false);
        expect(res.body).to.have.property('message').to.equal('No token provided.');
        done();
      })

   
    
  });

  it('should return an error if token is invalid', async () => {
    verifyTokenStub.callsArgWith(2, new Error('Invalid token'));

    const res = await chai.request(app)
      .post('/employees')
      .set('Cookie', ['jwt=invalid_token'])
      .send({ empid: '500' }).end((err,res)=>
      { 
      expect(res.body).to.have.property('auth').to.equal(false);
      expect(res.body).to.have.property('message').to.equal('Failed to authenticate token.');
      })
  });
  it('should return employees for a given Manager  employee ID if token is provided and valid',(done) => {
    const mockToken = 'mock_token';
    const mockDecoded = { id: '496' };
    const mockApprovals = [{ id: '496', head: '500'}];

    verifyTokenStub.callsArgWith(2, null, mockDecoded);
    findStub.withArgs({ head: '500', status: 'pending' }).returns(mockApprovals);

     chai.request(app)
      .post('/employees')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid: '500' })
      .end((err,res)=>{
        expect(res.body).to.have.property('success').to.equal(true);
        expect(res.body).to.have.property('content').to.an('array');
        done();
      })
  
  }).timeout(10000);

})


describe('POST /employees/list', () => {
  let verifyTokenStub;
  let findStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findStub = sinon.stub(userModel, 'find');
  });

  afterEach(() => {
    verifyTokenStub.restore();
    findStub.restore();
  });

  it('should return unassigned employees of a specific role', (done) => {
    const mockToken = 'mock_token';
    const role = 'intern';
    const mockUsers = [{ _id: '1', name: 'John', empid: 'EMP001', role: 'intern', head: '', contact: '1234567890', Address: 'Address', total: 5 }];
    findStub.resolves(mockUsers);
    verifyTokenStub.callsArgWith(2, null, { id: 'testUserId' }); 

    chai.request(app)
      .post('/employees/list')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ role })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.content).to.be.an('array');
        expect(res.body.content).to.have.lengthOf(1);
        expect(res.body.message).to.equal(`Unassigned ${role}`);
        done();
      });
  });

  it('should return message when no employees of the specified role are available', (done) => {
    const mockToken = 'mock_token';
    const role = 'Manager';
    findStub.resolves([]);
    verifyTokenStub.callsArgWith(2, null, { id: 'testUserId' }); 

    chai.request(app)
      .post('/employees/list')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ role })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.content).to.be.an('array').that.is.empty;
        expect(res.body.message).to.equal(`No ${role} Aviliable`);
        done();
      });
  });

});
describe('POST /employees/del', () => {
  let verifyTokenStub;
  let findOneAndUpdateStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findOneAndUpdateStub = sinon.stub(userModel, 'findOneAndUpdate');
  });

  afterEach(() => {
    verifyTokenStub.restore();
    findOneAndUpdateStub.restore();
  });

  it('should delete an employee', (done) => {
    const mock_token='mock_token'
    const empid = 'EMP001';
    findOneAndUpdateStub.resolves({ empid: 'EMP001', name: 'John' });
    verifyTokenStub.callsArgWith(2, null, { id: 'testUserId' }); // Simulate successful token verification

    chai.request(app)
      .post('/employees/del')
      .set('Cookie', [`jwt=${mock_token}`])
      .send({ empid })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        done();
      });
  });
  it('should return an error when employee ID is missing', (done) => {
    
    const mock_token='mock_token'
    findOneAndUpdateStub.resolves({});
    verifyTokenStub.callsArgWith(2, null, { id: 'testUserId' }); 
    chai.request(app)
      .post('/employees/del')
      .set('Cookie', [`jwt=${mock_token}`])
      .send({}) 
      .end((err, res) => {
        expect(res).to.have.status(404); 
        expect(res.body.error).to.equal('Employee ID is required');
        done();
      });
  });
  
});

describe('POST /revoke', () => {
  let verifyTokenStub;
  let deleteOneStub;
  let findOneAndUpdateStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    deleteOneStub = sinon.stub(leaveModel, 'deleteOne');
    findOneAndUpdateStub = sinon.stub(userModel, 'findOneAndUpdate');
  });

  afterEach(() => {
    verifyTokenStub.restore();
    deleteOneStub.restore();
    findOneAndUpdateStub.restore();
  });

  it('should revoke leave and update user pending leaves count', (done) => {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP001';
    const from = '2024-02-01';
    const to = '2024-02-05';
    const diff = 5; 

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId });
    deleteOneStub.resolves({ deletedCount: 1 }); 
    findOneAndUpdateStub.resolves({ empid: 'EMP001', pending: 10 });

    chai.request(app)
      .post('/revoke')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid, from, to })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        // Add more assertions here if needed
        done();
      });
  });

  it('should handle scenario when leave to revoke does not exist', (done) => {
    const mockToken = 'mockToken';
    const empid = 'EMP001';
    const from = '2024-02-01';
    const to = '2024-02-05';
  
    verifyTokenStub.callsArgWith(2, null, { id: 'mockUserId' }); 
    deleteOneStub.resolves({ deletedCount: 0 }); 
    chai.request(app)
      .post('/revoke')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid, from, to })
      .end((err, res) => {
        expect(res).to.have.status(404); 
        expect(res.body.error).to.equal('No matching leave document found to delete'); 
        done();
      });
  });
  
  
});
