import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import {app} from '../server.js'; 
import {userModel} from '../schema.js'// assuming your app is exported from a file named 'app.js'
chai.use(chaiHttp);
const { expect } = chai;
// describe('POST /employees', () => {
//   it('should return a list of employees', (done) => {
//     const userModelMock = sinon.mock(userModel);
//     const mockUsers = [
//       {
//         _id: '1',
//         name: 'John Doe',
//         empid: 'EMP001',
//         role: 'Manager',
//         contact: '1234567890',
//         Address: '123 Main St',
//         total: 5
//       },

//     ];

//     userModelMock.expects('find').resolves(mockUsers);

//     chai.request(app)
//       .post('/employees')
//       .send({ empid: '1' })
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
describe('Authentication', () => {
  let token;
  let userName='DBIN500';
  let pass='DBIN500'
  before(async () =>{
    try{
      const loginRes = await chai.request(app)
      .post('/')
        .send({
          empid: userName,
          password: pass
        });
        // expect(loginRes).to.have.property('cookies');
        
        token = loginRes.body.token;
      }
    catch(error){
      throw(error);
    }
  })
  it('Check Employees of your team ', async () => {
    try {
      let temp = {
        jwt:token
      }
      console.log(temp);
      const res = await chai.request(app)
      .post('/employees')
      .set('cookies',temp);
      // Assertions
      
      expect(res.body).to.have.property('message').that.equal('Employees of your team');
      expect(res.body).to.have.property('success').that.equal(true);
      expect(res.body).to.have.property('content');

    
      agent.close();
    } catch (error) {
      throw error;
    }
  }).timeout(10000);
  
});
 