import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect("mongodb+srv://soham:soham@cluster1.rwmuwaw.mongodb.net/?retryWrites=true&w=majority")
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error , please make sure db is up' + err);
            process.exit()
        })

    } catch(error){
        console.log('Somethin went wrong in db connection');
        console.log(error);
    }
}