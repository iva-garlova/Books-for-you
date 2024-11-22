import { Schema, model, Types } from "mongoose";

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
      content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
   owner: {
    type: Types.ObjectId,
    ref: 'User',
    
   },
   
});

const Book = model('Book', BookSchema);

export default Book;