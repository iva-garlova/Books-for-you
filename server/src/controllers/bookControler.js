import { Router } from "express";
import bookServise from "./services/bookServise.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const bookController = Router();

bookController.get('/', async (req, res) =>{
    const books = await bookServise.getAll().lean();
    
    res.render('books', {books})
})

bookController.get('/create', (req, res)=> {
    res.render('books/create', {title: "Add your new book"});
});

bookController.post('/create', async (req, res) => {
const bookData = req.body;
const userId = req.user._id;
try{
await bookServise.create(bookData, userId);

res.redirect('/books')
}catch(err){
    const error = getErrorMessage(err);
   
    
    
 
 res.render('books/create', {books: bookData,  error})


 
}


bookController.get('/:bookId/details', async (req, res) => {
    try {
        const book = await bookServise.getOne(req.params.bookId).lean(); 
        
        if (!book) {
            return res.status(404).render('404'); 
        }

        
        const isOwner = book.owner == req.user?._id;

        
        const isVoted = book.voteList?.some(userId => userId == req.user?._id);
        
        
        const voteCount = book.voteList?.length || 0;

        console.log("Rendering details page"); 

        
        res.render('books/details', { book, isOwner, isVoted, voteCount }); 
    } catch (error) {
        console.error("Error fetching books details:", error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
});

booksController.get('/:bookId/vote', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    try{
    await bookServise.vote(bookId, userId);

    res.redirect(`/books/${bookId}/details`)
    } catch(err) {
console.log(err);

    }
});

bookController.get('/:bookId/delete', async (req, res) =>{
    try{
        await bookServise.remove(req.params.bookId);

        res.redirect('/books')
    } catch(err){

    }
})



});

export default bookController;