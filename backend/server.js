import express from 'express';
import { dbConnect } from './dbConnect.js';
import { userModel,leaveModel } from './schema.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import cors from 'cors';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import{uploadImage} from './fileparser.js'
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload=multer({dest:`${__dirname}/temp/`})
const addItemMiddleWare=upload.single('image');


const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};  
export const app=express();
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser())
app.use(express.static(path.join(__dirname, 'public')));
dbConnect();
app.listen(3500,(req,res)=>
{
    console.log("server started at 3500");
})


app.get('/',(req,res)=>{
  res.send("hello world ");
})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chandueru1316@gmail.com',
    pass: 'ichpwhajbeezmkid'
  }
});


const verifyToken = (req, res, next) => 
{
  //console.log("Practice : ",req);
  const token = req.cookies.jwt;
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, "abcdef", (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

app.post('/', async (req,res)=>{
  //console.log(req.headers)
   console.log("post method called ",req.body.empid+" "+req.body.password);
    let result=await userModel.findOne({empid:req.body.empid});
    if(result)
    {
     const passwordMatch = await bcrypt.compare(req.body.password,result.password);
      if(passwordMatch)
      {
        const token=jwt.sign({id:result.empid},"abcdef",{expiresIn:(1000*10*10)})
        res.cookie('jwt',token, { sameSite: 'Lax', expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });
        res.send({success:true,message:"Found",content:result,token:token})
      }
      else
      {
        res.send({success:false,message:"Invalid Password",content:result})
      }
    }
    else
    {
      res.send({success:false,message:"User Not found",content:result})
    }
})

app.post('/apply',verifyToken,addItemMiddleWare, async (req,res)=>
{
  //console.log("apply called ");
  //console.log(req.body);
  //console.log(req.file);

  const link = await uploadImage({imageName : req.file.filename, imagePath : req.file.path})
  console.log(link);

 const obj={
  from:req.body.from,
  to:req.body.to,
  message:req.body.description,
  head:req.body.head,
  status:req.body.status,
  empid:req.body.empid,
  image:link
 }
   
  leaveModel.aggregate([
    {
      $match: {
        empid: req.body.empid,
        $or: [
          { from: { $lte: req.body.from }, to: { $gte: req.body.from } },
          { from: { $lte: req.body.to }, to: { $gt: req.body.to } },
          { from: { $lte: req.body.from }, to: { $gte: req.body.to } }
        ]
      }
    },
    {
      $project: {
        from: 1,
        to: 1,
        _id: 0 
      }
    }
  ]).then(async (result) => {
    if(result.length==0)
    {
      const newLeave=new leaveModel(obj);
      let resp=await newLeave.save();
      const diff=daysDifference(obj.from,obj.to);
      console.log("Applied no of leaves ",diff)
      let answer = await userModel.findOneAndUpdate( { empid: obj.empid },{$inc: {pending: diff }  },{ new: true } );
      console.log("Applied leaved modified ",answer)
      res.send({success:true,message:"Leave Applied"})
    }
    else
      res.send({success:false,message:`Pending Leave on \n ${result[0].from} to ${result[0].to}`})

  })
  .catch(err => {
    console.log(err);
    res.send({success:false,message:`Not Applied`});
  });

  // res.send({success:false,message:'checking s3'})
})


app.post('/approval', async(req,res)=>{
  const id=req.body.empid;
   //const approvals=templeave.filter((item,ind)=>(item.head==id&&item.status=='pending'))
 const approvals=await leaveModel.find({head:id,status:'pending'}).sort({from:1})
     //console.log("approvals",approvals);
    res.send({success:true,content:approvals})
})



app.post('/revoke',verifyToken,async (req,res)=>{
 // console.log("revoke callled")
  const id=req.body.empid;
  const from=req.body.from;
  const to=req.body.to;
 // const leaves=templeave.filter((item,ind)=>((!(item.empid==id&&item.status=='pending'&&item.from==from))&&item.empid==id))
  //console.log("Server side Leaves",leaves);
  leaveModel.deleteOne({ empid: id, status: 'pending', from: from })
  .then(async (result) => {
    if (result.deletedCount > 0) {
      console.log('Leave document deleted successfully');
      const diff=daysDifference(from,to);
     let answer=await userModel.findOneAndUpdate({ empid:id },{$inc:{pending: -diff }},{ new: true } );
     console.log(answer);
    } else {
      console.log('No matching leave document found to delete');
    }
  })
  .catch(error => {
    console.error('Error deleting leave document:', error);
  });

  res.send({success:true})
})


app.post('/employees',async(req,res)=>{
  console.log("Employee  List Called")
  const id=req.body.empid;
  userModel.find({head:id })
     .then(users=> {
       const extractedUsers = users.map(item => ({
         _id: item._id,
         name: item.name,
         empid: item.empid,
         role: item.role,
         contact: item.contact,
         Address: item.Address,
         total: item.total
       }));
      
       
       //console.log("Server Side ",extractedLeaves);
       res.send({success:true,content:extractedUsers,message:'Employees of your team'})
     })
     .catch(error => {
       console.error('Error fetching Users:', error);
       res.status(500).json({ error: 'Internal server error' });
     });
 })
 app.post('/employees/del',verifyToken,(req,res)=>{
   console.log("Employee Delete Called ");
   const{empid}=req.body
   console.log(empid);
  userModel.findOneAndUpdate(
    { empid: empid }, 
    { $set: {head:''} }
  )
  .then(async(updatedUsers) => {console.log(updatedUsers)})
  res.send({success:true});
})
app.post('/employees/list',verifyToken,(req,res)=>{
  const{role}=req.body
  console.log(role);
  
 userModel.find({role:role,head:''})
 .then(async(updatedUsers) => 
   {
  console.log(updatedUsers);
  if(updatedUsers.length>0)
  res.send({success:true,content:updatedUsers,message:`Unassigned ${role}`});
  else
  res.send({success:true,content:updatedUsers,message:`No ${role} Aviliable`});
   }
  )
  
})
app.post('/employees/add',verifyToken,async(req,res)=>{

  const{empid,name,role,head}=req.body
  console.log(empid);
  const emp=await userModel.findOne({empid:empid});
  if(emp.head!=="")
  {
    res.send({success:false,message:`${name} is Assigned to ${head}`})
  }
  else
  {
 userModel.findOneAndUpdate(
   { empid: empid }, 
   { $set: {head:head} }
 )
 .then(async(updatedUsers) => {console.log(updatedUsers)})
 res.send({success:true,message:`${name} Added to your Team `});
  }
})
app.post('/employees/:id',verifyToken,(req,res)=>{
 // console.log(req.params.id);
  const {name,role,contact,Address,total}=req.body;
 // console.log(req.body);
  userModel.findOneAndUpdate(
    { empid: req.params.id }, 
    { $set: {name: name,role:role,contact:contact,Address:Address,total:total} }, 
    { new: true } 
  )
  .then(async(updatedLeave) => {console.log(updatedLeave)})
  res.send({success:true});
})

app.post('/leaves', verifyToken, async(req,res)=>{
 const id=req.body.empid;
 leaveModel.find({ empid:id }).sort({from:1})
    .then(leaves => {
      const extractedLeaves = leaves.map(leave => ({
        _id: leave._id,
        from: leave.from,
        to: leave.to,
        message: leave.message,
        empid: leave.empid,
        head: leave.head,
        status: leave.status
      }));
      
      
      //console.log("Server Side ",extractedLeaves);
      res.send({success:true,content:extractedLeaves})
    })
    .catch(error => {
      console.error('Error fetching leaves:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
})
app.post('/getleaves',verifyToken,async(req,res)=>{
  const {empid}=req.body;
  let result=await userModel.findOne({empid:empid});
  //console.log(result)
  res.send({success:true,message:"get leaves",content:result});

})
app.post('/approving', verifyToken ,async (req,res)=>{
  let id=req.body.empid;
  let date=req.body.from;
  let message=req.body.update;
  console.log("Approving called");
  leaveModel.findOneAndUpdate(
    { empid: id, from: date, status: 'pending' }, 
    { $set: { status: message } }, 
    { new: true } 
  )
  .then(async(updatedLeave) => {
    if (updatedLeave) {
     //console.log('Leave document updated successfully:', updatedLeave);
     console.log("Leave update",updatedLeave.from,"   ",updatedLeave.to)
     const diff=daysDifference(updatedLeave.from,updatedLeave.to);
     console.log(diff);
     let obj={};
       if(message==='Grant')
       obj = await userModel.findOneAndUpdate( { empid: updatedLeave.empid },{$inc: {granted: diff, pending: -diff }  },{ new: true } );
       else
       obj = await userModel.findOneAndUpdate( { empid: updatedLeave.empid },{$inc: {pending: -diff }  },{ new: true } );
      console.log("Updated Leave ",obj);
      const mailOptions = {
        from: 'chandueru1316@gmail.com',
        to: obj.mail,
        subject: 'Leave Status Update',
        text: `Dear Employee,\n\nYour leave request from ${updatedLeave.from} to ${updatedLeave.to} has been ${message}ed.\n\nRegards,\nHR Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.send("success");
    } else {
     // console.log('Leave document not found');
      res.status(404).send("Leave document not found");
    }
  })
  .catch(error => {
    console.error('Error updating leave document:', error);
    res.status(500).send("Internal Server Error on Approving Leave");
  });
  
})


async function convert()
{
  const employees=await userModel.find();
  employees.map(async (item,ind)=>{
    const hashed=await bcrypt.hash(item.password,10);
    await userModel.findOneAndUpdate({_id:item._id},{$set:{password:hashed}});
    console.log(hashed);
  })
}

function daysDifference(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; 
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const diffMilliseconds = Math.abs(firstDate - secondDate);

  const diffDays = Math.round(diffMilliseconds / oneDay);
  //console.log(diffDays)

  return diffDays+1;
}
app.use((_,res)=>{
  res.sendFile(`${__dirname}/public/index.html`)
})

//convert();
async function func2()
{
  let res=await userModel.updateMany({},{$set:{total:20,pending:0,granted:0}});
  let temp=await leaveModel.deleteMany({});
}
//func2();