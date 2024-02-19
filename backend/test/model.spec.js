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
      status:'pending'
    },
     sampleLeave2={
      head: '500',
      from: "2024-02-23",
      to: "2024-02-22",
      message: "abcd",
      image: "https://www.google.com",
      status:'pending'
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
      status: 'pending'
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