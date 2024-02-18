import mongoose from 'mongoose';
import dotenv from'dotenv';
dotenv.config();
//const url='mongodb://localhost:27017/Dbox';
const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myatlasclusteredu.ykrjeyz.mongodb.net/?retryWrites=true&w=majority`;
const dbName='Dbox'
export function dbConnect()
{
    try{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: dbName 
    });
    }
    catch(err)
    {
        console.log("Error Occured in Connecting DB",err);
    }
    const con=mongoose.connection;
    con.once('open',()=>{
       console.log("Connected to db")
    })
    con.on('error',(err)=>{
        console.log("error occured",err);
    })
}