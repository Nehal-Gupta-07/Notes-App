import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for adding a book
router.post('/', async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.person ||
            !request.body.deadline ||
            !request.body.description
        ){
            return response.status(400).send({
                message : "Send all required fields"
            });
        }
        const newBook = {
            title : request.body.title,
            person : request.body.person,
            deadline : request.body.deadline,
            description : request.body.description
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for getting all books
router.get('/',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data : books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message : error.messsage});
    }
});

//Route for getting one book by id
router.get('/:id',async(request,response)=>{
    try{

        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message : error.messsage});
    }
});

//Route for updating a book
router.put('/:id' , async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.person ||
            !request.body.deadline ||
            !request.body.description
        ){
            return response.status(400).send({message : 'Send all required fields'});
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).send({message:"Book updated succesfully"});

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

//Route for deleting a book
router.delete('/:id',async(request,response)=>{
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:"Book not found"});
        }
        return response.status(200).send({message : "Book deleted successfully"});

    }
    catch(error){
        console.log(error.message);
        return response.status(500).send({message : error.message});
    }
});


export default router;