import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    empid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    head: {
        type: String
    },
    Address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    granted:{
        type:Number,
        required:true
    },
    pending:
    {
        type:Number,
        required:true
    }
   
});

const leaveSchema = new mongoose.Schema({
    
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },empid: {
        type: String,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true,
    }
});

const userModel = mongoose.model('users', userSchema);
const leaveModel = mongoose.model('leaves', leaveSchema);

export { userModel, leaveModel };
