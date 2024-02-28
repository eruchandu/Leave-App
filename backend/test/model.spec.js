import chai from 'chai';
const { expect } = chai;
import mongoose from 'mongoose';
const { ValidationError } = mongoose.Error;
import { leaveModel, userModel } from '../schema.js';
describe('Testing Item model', () => {
  let sampleLeave,sampleLeave2;
  beforeEach(() => {
    sampleLeave = {
      empid: '496',
      head: '500',
      from: "2024-02-23",
      to: "2024-02-22",
      message: "abcd",
      image: "https://www.google.com",
      status:'pending',
      days:10
    },
     sampleLeave2={
      head: '500',
      from: "2024-02-23",
      to: "2024-02-22",
      message: "abcd",
      image: "https://www.google.com",
      status:'pending',
      days:10
    }
  });
  it('should throw an error due to missing fields', async () => {
    let item = new leaveModel();
    try {
      await item.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.empid).to.exist;
      expect(err.errors.head).to.exist;
      expect(err.errors.from).to.exist;
      expect(err.errors.to).to.exist;
      expect(err.errors.message).to.exist;
      expect(err.errors.image).to.exist;
      expect(err.errors.days).to.exist;

    }
  });
  it('shouldnot throw an error since we have all fields', async () => {
    let item = new leaveModel(sampleLeave);
    try {
      await item.validate();
      console.log("Result is as Expected");
    } catch(err) {
      console.log("error",err)
      throw new Error('Validation succeeded unexpectedly');
    }
  });
  it('should throw an error since Empid is missing', async () => {
    let item = new leaveModel(sampleLeave2);
    try {
      await item.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.empid).to.exist;
    }
  });
});
describe('Testing Leave model', () => {
  let sampleLeave, sampleLeave2;
  beforeEach(() => {
    sampleLeave = {
      empid: '496',
      head: '500',
      from: "2024-02-23",
      to: "2024-02-22",
      message: "abcd",
      image: "https://www.google.com",
      status: 'pending',
      days:10
    },
    sampleLeave2 = {
      head: '500',
      from: "2024-02-23",
      to: "2024-02-22",
      message: "abcd",
      image: "https://www.google.com",
      status: 'pending'
    }
  });
  it('should throw an error due to missing fields', async () => {
    let item = new leaveModel();
    try {
      await item.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.empid).to.exist;
      expect(err.errors.head).to.exist;
      expect(err.errors.from).to.exist;
      expect(err.errors.to).to.exist;
      expect(err.errors.message).to.exist;
      expect(err.errors.image).to.exist;
      expect(err.errors.days).to.exist;
    }
  });
  it('should not throw an error since all fields are provided', async () => {
    let item = new leaveModel(sampleLeave);
    try {
      await item.validate();
      console.log("Result is as Expected");
    } catch(err) {
      console.log("error", err)
      throw new Error('Validation succeeded unexpectedly');
    }
  });
  it('should throw an error since Empid is missing', async () => {
    let item = new leaveModel(sampleLeave2);
    try {
      await item.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.empid).to.exist;
    }
  });
});
describe('Testing User model', () => {
  let sampleUser, sampleUser2;

  beforeEach(() => {
    sampleUser = {
      name: "Sandip",
      empid: "DBIN600",
      mail: "chithanya.e@dariwnbox.io",
      role: "manager",
      salary: "100000",
      password: "DBIN500",
      head: "",
      Address: "Hyderabad",
      contact: "9701652345",
      isManager: true,
      total: 20,
      granted: 0,
      pending: 0,
      photo:"abc.com"
    };
    sampleUser2 = {
      head: "",
      Address: "Hyderabad",
      contact: "9701652345",
      isManager: true,
      total: 20,
      granted: 0,
      pending: 0
    };
  });

  it('should throw an error due to missing fields', async () => {
    let user = new userModel();
    try {
      await user.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.name).to.exist;
      expect(err.errors.empid).to.exist;
      expect(err.errors.mail).to.exist;
      expect(err.errors.role).to.exist;
      expect(err.errors.salary).to.exist;
      expect(err.errors.password).to.exist;
      expect(err.errors.Address).to.exist;
      expect(err.errors.contact).to.exist;
      expect(err.errors.isManager).to.exist;
      expect(err.errors.total).to.exist;
      expect(err.errors.granted).to.exist;
      expect(err.errors.pending).to.exist;
      expect(err.errors.photo).to.exist;
    }
  });

  it('should not throw an error since all fields are provided', async () => {
    let user = new userModel(sampleUser);
    try {
      await user.validate();
      console.log("Result is as Expected");
    } catch(err) {
      console.log("error", err)
      throw new Error('Validation succeeded unexpectedly');
    }
  });

  it('should throw an error since empid is missing', async () => {
    let user = new userModel(sampleUser2);
    try {
      await user.validate();
      throw new Error('Validation succeeded unexpectedly');
    } catch(err) {
      expect(err.errors.empid).to.exist;
    }
  });
});
