const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

public_users.post("/register", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({
    message: "Unable to register user. Username and/or password not provided",
  });
});

// Get the book list available in the shop
/* public_users.get("/", function (req, res) {
  res.send(JSON.stringify({ books }, null, 4));
}); */

// Get the book list available in the shop using async/await
public_users.get("/", async (req, res) => {
  // Simulate an asynchronous operation to get books
  const getBooks = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(books);
      }, 1000); // Corrected the misplaced closing parenthesis
    });
  };

  try {
    const booksList = await getBooks(); // Wait for the Promise to resolve
    res.json(booksList); // Send the books as a JSON response
  } catch (err) {
    res.status(500).json({ error: "An error occurred" }); // Handle errors
  }
});

// Get the user list available in the shop
/* public_users.get("/users", function (req, res) {
  res.send(JSON.stringify({ users }, null, 4));
});
 */

// Get book details based on ISBN using Promises
public_users.get("/isbn/:isbn", (req, res) => {
  const ISBN = req.params.isbn;
  const booksBasedOnIsbn = (ISBN) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books.find((b) => b.isbn === ISBN);
        if (book) {
          resolve(book);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
  };
  booksBasedOnIsbn(ISB)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.status(400).json({ error: "Book not found" });
    });

  //await res.send(books[ISBN]);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = Object.values(books).find((book) => book.isbn === isbn);

  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.send(`Book with ISBN ${isbn} not found.`);
  }
});

// Get book details based on author
public_users.get("/author/:author", async (req, res) => {
  //using promises
  const author = req.params.author;
  const booksBasedOnAuthor = (auth) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredbooks = books.filter((b) => b.author === auth);
        if (filteredbooks > 0) {
          resolve(filteredbooks);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
  };
  booksBasedOnAuthor(author)
    .then((book) => {
      res.json(book);
    })
    .catch((err) => {
      res.status(400).json({ error: "Book not found" });
    });

  //let new_books = {}
  //const new_author = req.params.author;
  //let i=1;
  //for(let bookid in books){
  //   if(books[bookid].author === new_author ){
  //    new_books[i++] = books[bookid];
  //  }
  //}
  //await res.send(JSON.stringify(new_books))
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const book = Object.values(books).find((book) => book.author === author);

  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.send(`Book with author name ${author} not found.`);
  }
});

// Get all books based on title
/* public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const book = Object.values(books).find((book) => book.title === title);

  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.send(`Book with title ${title} not found.`);
  }
});
 */

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  const title = req.params.title;
  const booksBasedOnTitle = (booktitle) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredbooks = books.filter((b) => b.title === booktitle);
        if (filteredbooks > 0) {
          resolve(filteredbooks);
        } else {
          reject(new Error("Book not found"));
        }
      }, 1000);
    });
  };
  booksBasedOnTitle(title)
    .then((new_books) => {
      res.json(new_books);
    })
    .catch((err) => {
      res.status(400).json({ error: "Book not found" });
    });
});
//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = Object.values(books).find((book) => book.isbn === isbn);
  const review = book.reviews;
  if (book) {
    res.send(JSON.stringify(review, null, 4));
  } else {
    res.send(`Book with ISBN ${isbn} not found.`);
  }
});

module.exports.general = public_users;
