import { userModel, leaveModel } from '../schema.js';
import { verifyToken } from '../server.js';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { app } from '../server.js'; 
import request from 'supertest';
const { expect } = chai;
chai.use(chaiHttp);


describe('Login Route', () => {
  let findOneStub;
  beforeEach(() => {
    findOneStub = sinon.stub(userModel, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
  });

  it('should return success true with valid credentials', async () => {

    findOneStub.resolves({
      empid: 'testUser',
      password: await bcrypt.hash('testPassword', 10), 
    });
    const res = await request(app)
      .post('/')
      .send({ empid: 'testUser', password: 'testPassword' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success').to.be.true;
    expect(res.body).to.have.property('token');
    expect(res.body.message).to.equal('Found');
  });

  it('should return error message with invalid password', async () => {

    findOneStub.resolves({
      empid: 'testUser',
      password: await bcrypt.hash('testPassword', 10), 
    });
    const res = await request(app)
      .post('/')
      .send({ empid: 'testUser', password: 'wrongPassword' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success').to.be.false;
    expect(res.body.message).to.equal('Invalid Password');
  });

  it('should return error message with user not found', async () => {
  
    findOneStub.resolves(null);

    
    const res = await request(app)
      .post('/')
      .send({ empid: 'nonExistentUser', password: 'somePassword' });


    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success').to.be.false;
    expect(res.body.message).to.equal('User Not found');
  });
});

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

})

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
    verifyTokenStub.callsArgWith(2, null, { id: 'testUserId' }); 

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

describe('POST /employees/add', () => {
  let verifyTokenStub;
  let findOneStub;
  let findOneAndUpdateStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findOneStub = sinon.stub(userModel, 'findOne');
    findOneAndUpdateStub = sinon.stub(userModel, 'findOneAndUpdate');
  });

  afterEach(() => {
    verifyTokenStub.restore();
    findOneStub.restore();
    findOneAndUpdateStub.restore();
  });

  it('should handle scenario when employee is already assigned to someone', (done) =>
   {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP002';
    const name = 'John Doe';
    const role = 'Developer';
    const head = 'Manager';

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId }); 
    findOneStub.resolves({ empid: 'DBIN496', head: 'DBIN500' }); 

    chai.request(app)
      .post('/employees/add')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid, name, role, head })
      .end((err, res) => {
        if(err)
        {
        console.log(err)
        done();
        }
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.false;
        done();
      });
  })
});
describe('POST /employees/:id', () => {
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

  it('should update employee details', (done) => {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP002';
    const name = 'John Doe';
    const role = 'Developer';
    const contact = '1234567890';
    const Address = '123 Main St';
    const total = 10;

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId }); 
    findOneAndUpdateStub.resolves({ empid: 'EMP002', name, role, contact, Address, total }); 

    chai.request(app)
      .post(`/employees/${empid}`)
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ name, role, contact, Address, total })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;

        done();
      });
  });
});

describe('POST /leaves', () => {
  let verifyTokenStub;
  let findStub;

  beforeEach(() => {
    verifyTokenStub = sinon.stub(jwt, 'verify');
    findStub = sinon.stub(leaveModel, 'find');
  });

  afterEach(() => {
    verifyTokenStub.restore();
    findStub.restore();
  });

  it('should return leaves for a given employee ID if token is provided and valid', (done) => {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP001';
    const leaves = [
      { _id: '1', from: '2024-02-01', to: '2024-02-05', message: 'Vacation', empid: 'EMP001', head: 'Manager', status: 'approved' },
      { _id: '2', from: '2024-02-10', to: '2024-02-15', message: 'Sick leave', empid: 'EMP001', head: 'Manager', status: 'pending' }
    ];

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId }); 
    findStub.withArgs({ empid }).resolves(leaves); 

    chai.request(app)
      .post('/leaves')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.content).to.deep.equal(leaves);
        done();
      });
  });

  it('should handle errors when fetching leaves', (done) => {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP001';
    const errorMessage = 'Error fetching leaves';

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId }); 
    findStub.withArgs({ empid }).rejects(new Error(errorMessage)); 

    chai.request(app)
      .post('/leaves')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.error).to.equal('Internal server error');
        done();
      });
  });
});
describe('POST /getleaves', () => {
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

  it('should return user details for a given employee ID if token is provided and valid', (done) => {
    const mockToken = 'mockToken';
    const mockUserId = 'mockUserId';
    const empid = 'EMP001';
    const userDetails = [
      { _id: '1', name: 'John Doe', empid: 'EMP001', role: 'Manager', contact: '1234567890', Address: '123 Main St', total: 10 }
    ];

    verifyTokenStub.callsArgWith(2, null, { id: mockUserId }); 
    findStub.withArgs({ empid }).resolves(userDetails); 

    chai.request(app)
      .post('/getleaves')
      .set('Cookie', [`jwt=${mockToken}`])
      .send({ empid })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.be.true;
        expect(res.body.content).to.deep.equal(userDetails);
        done();
      });
  });
});






















































// it('should return approvals for a given employee ID if token is provided and valid',(done) => {
//   const mockToken = 'mock_token';
//   const mockDecoded = { id: '496' };
//   const mockApprovals = [{ id: '496', head: '500', status: 'pending'}];

//   verifyTokenStub.callsArgWith(2, null, mockDecoded);
//   findStub.withArgs({ head: '500', status: 'pending' }).returns(mockApprovals);
//    chai.request(app)
//     .post('/approval')
//     .set('Cookie', [`jwt=${mockToken}`])
//     .send({ empid: '500' })
//     .end((err,res)=>{
//       expect(res.body).to.have.property('success').to.equal(true);
//       expect(res.body).to.have.property('content').to.an('array');
//       done();
//     })

// }).timeout(10000);

// it('should return employees for a given Manager  employee ID if token is provided and valid',(done) => {
//   const mockToken = 'mock_token';
//   const mockDecoded = { id: '496' };
//   const mockApprovals = [{ id: '496', head: '500'}];

//   verifyTokenStub.callsArgWith(2, null, mockDecoded);
//   findStub.withArgs({ head: '500', status: 'pending' }).returns(mockApprovals);

//    chai.request(app)
//     .post('/employees')
//     .set('Cookie', [`jwt=${mockToken}`])
//     .send({ empid: '500' })
//     .end((err,res)=>{
//       expect(res.body).to.have.property('success').to.equal(true);
//       expect(res.body).to.have.property('content').to.an('array');
//       done();
//     })
// }).timeout(10000);



