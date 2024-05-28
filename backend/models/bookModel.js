import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required : true
        },
        person:{
            type: String,
            required : true
        },
        deadline:{
            type: Date,
            required : true
        },
        description:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

export const Book = mongoose.model('Cat',bookSchema);