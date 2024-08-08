import mongoose from "mongoose"

const connectDB = async () => {

    mongoose.connection.on('connected', ()=>{
        console.log("Connection Established");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/spotifyclone1`);
}

export default connectDB;