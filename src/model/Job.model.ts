import mongoose,{Document, Schema} from "mongoose";

interface Job extends Document{
    logo:string;
    createdAt:Date;
    jobRole:string;
    experience:number;
    location:string;
    salary:number;
    description:string;
}

const JobSchema:Schema<Job> = new mongoose.Schema({
    logo:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    jobRole:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    
})

const JobModel = (mongoose.models.Job as mongoose.Model<Job>) || mongoose.model<Job>("Job", JobSchema);
export default JobModel