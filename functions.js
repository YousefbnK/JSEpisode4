/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  let x = books.find(book => book.id === bookId);

  return x;
}
/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  let x = authors.find(
    author => author.name.toLowerCase() === authorName.toLowerCase()
  );

  return x;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let x = authors.map(author => ({
    author: author.name,
    bookCount: author.books.length
  }));
  return x;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here

  books.forEach(book => {
    if (colors[book.color]) {
      colors[book.color].push(book.title);
    } else {
      colors[book.color] = [book.title];
    }
  });

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  // return getBookById(getAuthorByName(authorName, authors).books, books);
  let bookId = getAuthorByName(authorName, authors);
  if (bookId == undefined) {
    return [];
  } else {
    return bookId.books.map(book => getBookById(book, books).title);
  }

  // console.log(y);
  // console.log(getBookById(getAuthorByName(authorName, authors).books, books));
}
/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here

  let x = bookCountsByAuthor(authors);
  // console.log(x);

  const compare = (a, b) => {
    let comparison = 0;
    if (a.bookCount > b.bookCount) {
      comparison = 1;
    } else if (a.bookCount < b.bookCount) {
      comparison = -1;
    }
    return comparison;
  };
  let y = x.sort(compare);
  console.log(y);

  return y.pop();

  // let x = authors.map(author => author.books.length);
  // console.log(x);
  // // let y = Math.max(...x);
  // // return authors.forEach(author => {
  // //   if (author.books.length === y) {
  // //     console.log(author.name);
  // //   }
  // // });

  // if (bookCountsByAuthor(authors).bookCount)
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let book = getBookById(bookId, books);
  if (book.authors.length > 1) {
    let authorNames = book.authors.map(book => book.name);
    let arrays = authorNames.map(authorName =>
      titlesByAuthorName(authorName, authors, books)
    );
    const merge = Array.prototype.concat.apply([], arrays);
    // console.log(merge);
    let removeDupes = merge => merge.filter((a, b) => merge.indexOf(a) === b);
    return removeDupes(merge);
    // console.log(arrays);
  } else {
    return titlesByAuthorName(book.authors[0].name, authors, books);
  }
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  let authorList = authors.map(author => ({
    name: author.name,
    books: author.books
  }));
  console.log(authorList);

  // let bookList = authors.map()

  // let multipleAuthors = books.filter(book => book.authors.length > 1);
  // console.log(multipleAuthors);

  // let friendlyAuthor = multipleAuthors.map(author => author.authors[0].name);
  // console.log(friendlyAuthor);

  // let authorName = friendlyAuthor[0];

  // friendlyAuthor.forEach(author => {
  //   if (author.length > authorName.length) {
  //     authorName = author;
  //   }
  // });

  // return authorName;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

const authors = require("./authors.json");
const books = require("./books.json");

// // // // // // console.log(getBookById(12, books));
// // // // // // console.log(getAuthorByName("J.K. Rowling", authors));
// // // // // // console.log(bookCountsByAuthor(authors));
// // // // // // console.log(booksByColor(books));
// // // // // // console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(31, authors, books));
console.log(friendliestAuthor(authors));
