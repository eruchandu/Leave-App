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
import dotenv from 'dotenv'
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload=multer({dest:`${__dirname}/temp/`})
const addItemMiddleWare=upload.single('image');

dotenv.config();
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

let map={};

app.get('/',(req,res)=>{
  res.send("hello world ");
})
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.SEND_MAIL}`,
    pass:  `${process.env.SEND_PASS}`
  }
});


export const verifyToken = (req, res, next) => 
{
  //console.log("Practice : ",req);
 // console.log("Verify token called")
  const token = req.cookies.jwt;
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token,`${process.env.SECRET_KEY}`, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //console.log(decoded.id);
    req.userId = decoded.id;
    next();
  });
};

app.post('/', async (req,res)=>{
  //console.log(req.headers)
  //console.log("post method called ",req.body.empid+" "+req.body.password);
  let result=await userModel.findOne({empid:req.body.empid});
  //console.log(result);
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
  
  const link = await uploadImage({imageName : req.file.filename, imagePath : req.file.path})
  console.log(link);
  const obj={
    from:req.body.from,
    to:req.body.to,
    message:req.body.description,
    head:req.body.head,
    status:req.body.status,
    empid:req.body.empid,
    image:link,
    days:req.body.days
}

leaveModel.aggregate([
  {
    $match: 
    {
      $and:[{empid: req.body.empid},
      {status:{$ne:"Reject"}},
      {$or: [
        { from: { $lte: req.body.from }, to: { $gte: req.body.from } },
        { from: { $lte: req.body.to }, to: { $gte: req.body.to } },
        {from:{$gte:req.body.from},to:{$lte:req.body.to}}
      ]
      }]
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
    //console.log("Applied no of leaves ",diff)
    let answer = await userModel.findOneAndUpdate( { empid: obj.empid },{$inc: {pending: diff }  },{ new: true } );
    // console.log("Applied leaved modified ",answer)
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


app.get('/approval/:empid', verifyToken,async(req,res)=>{
  const id=req.params.empid;
  console.log(req.userId);
  const approvals=await leaveModel.find({head:id,status:'pending'})
  res.send({success:true,content:approvals})
})



app.post('/revoke',verifyToken,async (req,res)=>{
 
  const id=req.body.empid;
  const from=req.body.from;
  const to=req.body.to;
 
  leaveModel.deleteOne({ empid: id, status: 'pending', from: from })
  .then(async (result) => {
    if (result.deletedCount > 0) 
    {
      console.log('Leave document deleted successfully');
      const diff=daysDifference(from,to);
      let answer=await userModel.findOneAndUpdate({ empid:id },{$inc:{pending: -diff }},{ new: true } );
      // console.log(answer);
      res.send({success:true})
    } 
    else {
      console.log('No matching leave document found to delete');
      res.status(404).send({ error: 'No matching leave document found to delete' });
    }
    
  })
  .catch(error =>
    {
      console.error('Error deleting leave document:', error);
      res.status(404).send({ error: 'No matching leave document found to delete' });
    });
    
    
  })
  
  
  app.get('/employees/:empid',verifyToken,async(req,res)=>{
    const id=req.params.empid;
    //console.log("id   ",id);
    if(id===' ')
    {
      res.status(404).send({error:'Employee ID is required'});
    }
    else
    {
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
        res.send({success:true,content:extractedUsers,message:'Employees of your team'})
      })
      .catch(error => {
       console.error('Error fetching Users:', error);
       res.status(500).json({ error: 'Internal server error' });
     });
    }
 })
 app.delete('/employees/del/:empid',verifyToken,async (req,res)=>{
   const empid=req.params.empid;
  let result=await userModel.findOneAndUpdate(
    { empid: empid }, 
    { $set: {head:''} }
  )
  if(result)
  res.send({success:true});
  else
  res.send({sucess:false});
})
app.get('/employees/list/:role',verifyToken,(req,res)=>{
  let role=req.params.role;
  role=role.toLowerCase();
 userModel.find({role:role,head:"",})
 .then(async(updatedUsers) => 
   {
  if(updatedUsers.length>0){
    console.log("Aviliable ",updatedUsers);
  res.send({success:true,content:updatedUsers,message:`Unassigned ${role}`});
  }
  else
  {
    console.log("Not aviliable",updatedUsers);
  res.send({success:true,content:updatedUsers,message:`No ${role} Aviliable`});
  }
   }
  ).catch((err)=>{
    console.log(err);
    res.send({success:false,message:'Error in Displaying Employees'});
  })
  
})
app.post('/employees/add',verifyToken,async(req,res)=>{
  const{empid,name,role,head}=req.body
  const emp=await userModel.findOne({empid:empid});
  if(!emp)
  {
    res.send({success:false,message:`Please Check Employee ID`});
  }
  else if(emp.head!=="")
  {
    res.send({success:false,message:`${name} is Assigned to ${head}`})
  }
  else
  {
 userModel.findOneAndUpdate(
   { empid: empid }, 
   { $set: {head:head} }
 )
 .then(async(updatedUsers) => {console.log(updatedUsers)
  res.send({success:true,message:`${name} Added to your Team `});
}).catch((err)=>{
  console.log(err);
  res.send({success:false,message:'Error in Adding Employee'})
})
 
  }
})
app.post('/employees/:id',verifyToken,async (req,res)=>{

  let {name,role,contact,Address,total}=req.body;
  role=role.toLowerCase();
    userModel.findOneAndUpdate(
    { empid: req.params.id }, 
    { $set: {role:role,total:total} }, 
    { new: true } 
  )
  .then(async(updatedLeave) => {console.log(updatedLeave)
  res.send({success:true})
  }).catch((err)=>{
    console.log(err);
    res.send({success:false})
  })
})

app.get('/leaves/:empid',verifyToken,async(req,res)=>{
 const id=req.params.empid;
 leaveModel.find({ empid:id })
    .then(leaves => {
      const extractedLeaves = leaves.map(leave => ({
        _id: leave._id,
        from: leave.from,
        to: leave.to,
        message: leave.message,
        empid: leave.empid,
        head: leave.head,
        status: leave.status,
        days:leave.days,
        image:leave.image
      }));
      res.send({success:true,content:extractedLeaves})
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
})
app.get('/getleaves/:empid',verifyToken,async(req,res)=>{
  const empid=req.params.empid;
  let result=await userModel.find({empid:empid});
 //console.log("Result = ",result);
  res.send({success:true,message:"get leaves",content:result});
})
app.post('/logout',verifyToken,async(req,res)=>{
  console.log("Logged out");
  try{
    res.clearCookie('jwt', { sameSite: 'Lax', expires: new Date(Date.now() + 0) }); 
    res.send({ success: true, message: "Successfully logged out" });
  }catch(err)
  {
    console.log("error occured",err);
    res.send({success:false,message:"Unsuccessful Logout"});
  }

})
app.post('/approving', verifyToken ,async (req,res)=>{
  let id=req.body.empid;
  let date=req.body.from;
  let message=req.body.update;
  leaveModel.findOneAndUpdate(
    { empid: id, from: date, status: 'pending' }, 
    { $set: { status: message } }, 
    { new: true } 
  )
  .then(async(updatedLeave) => {
    if (updatedLeave) {

     const diff=daysDifference(updatedLeave.from,updatedLeave.to);
   
     let obj={};
       if(message==='Grant')
       obj = await userModel.findOneAndUpdate( { empid: updatedLeave.empid },{$inc: {granted: diff, pending: -diff }  },{ new: true } );
       else
       obj = await userModel.findOneAndUpdate( { empid: updatedLeave.empid },{$inc: {pending: -diff }  },{ new: true } );
     
      const mailOptions = {
        from: `${process.env.SEND_MAIL}`,
        to: `${process.env.RECIVE_MAIL}`,
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
    
      res.status(404).send("Leave document not found");
    }
  })
  .catch(error => {
    console.error('Error updating leave document:', error);
    res.status(500).send("Internal Server Error on Approving Leave");
  });
  
})

app.get('/forget/:empid',async(req,res)=>{
  
  const empid=req.params.empid;
  console.log("Forget Route Called ",empid);
  let result=await userModel.findOne({empid:empid});
  if(result)
  {
   let val=otpGenerator();
   const mailOptions = {
    from: `${process.env.SEND_MAIL}`,
    to: `${process.env.RECIVE_MAIL}`,
    subject: 'Forget Password',
    text: `Dear Employee,\n\nYour OTP for Password change  ${val} \n\n Don't share with Anyone \n\n Regards,\nHR Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
   map[empid]=val;
  res.send({success:true,message:'Otp sent'});
  }
  else{
    res.send({success:false,message:'user Not found'});
  }

})
app.post('/forget/check',async(req,res)=>{
  const {empid,otp}=req.body;
  //console.log("Forget Route Called ",empid);
  let result=await userModel.findOne({empid:empid});
  console.log(result);
  if(map[empid]===otp)
  {
  delete map[empid];
  res.send({success:true,message:'OTP Matched'});
  }
  else
  {
    res.send({success:false,message:'Wrong OTP '});
  }

})
app.post('/forget/update',async(req,res)=>{
  const {empid,password}=req.body;
  console.log("Set Password  Called ",empid,password);
  const hashed=await bcrypt.hash(password,10);
  let response =await userModel.findOneAndUpdate(
    { empid: empid }, 
    { $set: {password: hashed} }, 
    { new: true } 
  )
  if(response)
  res.send({success:true,message:'Password updated Successfully'});
  else
    res.send({success:false,message:'Not Updated'});
})
async function convert()
{
  const employees=await userModel.find();
  employees.map(async (item,ind)=>{
    const hashed=await bcrypt.hash(item.empid,10);
    await userModel.findOneAndUpdate({_id:item._id},{$set:{password:hashed}});
    console.log(hashed);
  })
}
function daysDifference(date1, date2) 
{
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  const startDayOfWeek = firstDate.getDay(); 
  const endDayOfWeek = secondDate.getDay(); 
  let totalWeekends = Math.floor((diffDays + startDayOfWeek - endDayOfWeek) / 7) * 2;
  const diffWithoutWeekends = diffDays - totalWeekends;
  return diffWithoutWeekends + 1; 
}
app.get('/user/:empid',verifyToken,async(req,res)=>{
 console.log("user route called in APi");
  const empid=req.params.empid;
  let result=await userModel.findOne({empid});
  console.log("result of user route ",result);
  if(result)
  res.send({success:true,content:result});
  else
  res.send({success:false,content:[]});

})
app.post('/user/update/',verifyToken,addItemMiddleWare,async(req,res)=>{
  
  
   const {name,mail,Address,contact,empid}=req.body;
   const link = await uploadImage({imageName : req.file.filename, imagePath : req.file.path})
   let result=await userModel.findOneAndUpdate({empid:empid},{$set:{mail:mail,name:name,Address:Address,contact:contact,photo:link}});
   console.log("result of user route ",result);
   if(result)
   res.send({success:true,content:result});
   else
   res.send({success:false,content:[]});
 })
app.use((_,res)=>{
  res.sendFile(`${__dirname}/public/index.html`)
})


async function func2()
{
  let res=await userModel.updateMany({},{$set:{total:20,pending:0,granted:0}});
  let temp=await leaveModel.deleteMany({});
}

//func2();
function otpGenerator()
{
  let otp='';
  for(let i=0;i<4;i++)
  {
    let x = Math.random() * 10;
    x=Math.floor(x);
    otp=otp+x;
  }
  console.log(otp);
  return otp;
}
app.listen(process.env.PORT,(req,res)=>
{
    console.log(`server started at${process.env.PORT}` );
 })
 async function updatephoto()
 {
  await userModel.updateMany({},{photo:"https://third-1316.s3.ap-south-1.amazonaws.com/1708619947621-undraw_Coding_re_iv62.png"});
  console.log("phtos updated ");

 }
//updatephoto();


export default app;