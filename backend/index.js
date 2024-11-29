import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();
//middleware for parsing request body
app.use(express.json());

// middleware for handling CORS policy
//option 1: allow all origins with default of cors(*)
app.use(cors());

//option2 allow custom origins
//   app.use(
//     cors({
//          origin: 'http://localhost:3000',
//           methods: ['GET', 'POST', 'PUT', 'DELETE'],
//           allowedHeaders: ['Content-type'],  
//            })  
//         );

app.get('/',(request, response) =>{
    console.log(request)
    return response.status(234).send('welcome to MERN stack tutorial')
});

app.use('/books', booksRoute);

// Route for save a new book
app.post('/books', async(request, response) =>{
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);//Book.create

        return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



// Route for get all books from database
app.get('/books', async(request, response) =>{
    try{
        
        const books = await Book.find({});//Book.create

        return response.status(200).json({
            count: books.length,
            data: books
                    
        });

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
//route for get one book from database
app.get('/books/:id', async (request, response) => {
    try{
        const { id } =request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
        
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
            
    }

        });
     //route for update a book
app.put('/books/:id', async (request, response) => {

    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear

        ){
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found' });
        }

        return response.status(200).send({message: 'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//route for delete a book
app.delete('/books/:id', async (request, respose) =>{
    try{
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return respose.status(404).json({message: 'Book not found'});
        }

        return respose.status(200).send({message: 'Book deleted successfully'});

    }catch(error){
        console.log(error.message);
        respose.status(500).send({message: error.message});
    }

}
);



mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('app connected to the database');
    app.listen(PORT, () => {
        console.log(`App is listning to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);

});