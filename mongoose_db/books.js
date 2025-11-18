const mongoose = require("mongoose");


main()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

async function createBook(bookTitle, bookAuthor, bookPrice) {
  try {
    const book = await Book.create({
      title: bookTitle,
      author: bookAuthor,
      price: bookPrice,
    });
    console.log(book);
  } catch (error) {
    console.log(error);
  }
}

// createBook("The book", "Subhamoy", 350)
// createBook("Your book", 350)
createBook("Your book of code",null,2550)
