import mongoose from 'mongoose';
const url='mongodb://localhost:27017/Dbox';

export function dbConnect()
{
    try{
    mongoose.connect(url)
    }
    catch(err)
    {
        console.log("Error Occured in Connecting DB");
    }
    const con=mongoose.connection;
    con.once('open',()=>{
       console.log("Connected to db")
    })
    con.on('error',(err)=>{
        console.log("error occured",err);
    })
}