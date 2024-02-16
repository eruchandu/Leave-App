import mongoose from 'mongoose';
//const url='mongodb://localhost:27017/Dbox';
const url="mongodb+srv://myAtlasDBUser:1316@myatlasclusteredu.ykrjeyz.mongodb.net/?retryWrites=true&w=majority";
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