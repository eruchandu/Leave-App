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
describe('POST  request for Approving the Leave /approval', () => {
  it('should return a list of Approvals of the manager ', async() => {
    const leaveModelMock = sinon.mock(leaveModel);
    const mockApprovals = [
      {
        _id: '1',
        empid: 'DBIN496',
        head:'DBIN500',
        from:'22-03-2024',
        to:'23-03-2024',
        message:'sick',
        status:'pending'
      },
      {
        _id: '1',
        empid: 'DBIN496',
        head:'DBIN500',
        from:'27-03-2024',
        to:'29-03-2024',
        message:'festival',
        status:'pending'
      }

    ];
    leaveModelMock.expects('findOne').resolves(mockApprovals);
     try
     {
      let res=await chai.request(app)
      .post('/approval')
      .send({empid:'DBIN500'})
      expect(res.body.success).to.be.true;
      expect(res.body.content).to.be.an('array');
     }
     catch(err)
     {
      console.log("Error occured ",err);
     }
        leaveModelMock.verify();
        leaveModelMock.restore();
      
  });
});
// describe('Authentication', () => {
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
        
//         token = loginRes.body.token;
//       }
//     catch(error){
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
//       .set('cookies',temp);
//       // Assertions
      
//       expect(res.body).to.have.property('message').that.equal('Employees of your team');
//       expect(res.body).to.have.property('success').that.equal(true);
//       expect(res.body).to.have.property('content');

    
//       agent.close();
//     } catch (error) {
//       throw error;
//     }
//   }).timeout(10000);
  
// });
 