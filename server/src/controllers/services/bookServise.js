import Book from "../../models/Book.js";


 const bookServise = {
     getAll(){
        return Book.find();
    },

     getOne(bookId){
        return  Book.findById(bookId);
},
     async create(bookData, userId) {
      await Book.create({...bookData, owner: userId});
    
      },
     vote(bookId, userId){
        return  Book.findByIdAndUpdate(bookId, { $push: { voteList: userId}})
      },
      remove(bookId){
        return Book.findByIdAndDelete(bookId);
      }

}
export default bookServise;