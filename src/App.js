import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Route, Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  updateBookShelf = (event, book) => {
    const changedShelf = event.target.value
    const bookExistIdx = this.state.books.findIndex( b => b === book )
    const updatedBooks = this.state.books
    book.shelf = changedShelf

    bookExistIdx >= 0 ? updatedBooks.splice(bookExistIdx, 1, book) :
                        updatedBooks.push(book)

    BooksAPI.update(book, changedShelf).then( res => {
      this.setState({
        books: updatedBooks
      })
    })
  }

  getBookWithShelfPromise(book) {
    return new Promise( (resolve) => {
      BooksAPI.get(book.id).then( b => resolve(b) )
    } )
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 10).then( books => {
      if (books) {
        const getBookPromises = books.map( book => {
          return this.getBookWithShelfPromise(book).then( b => b )
        })
        Promise.all(getBookPromises).then( booksWithShelf => {
          this.setState({ searchedBooks: booksWithShelf })
        } )
      } else {
        this.setState({
          searchedBooks: []
        })
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={ () =>
          <SearchBooks books={this.state.searchedBooks} onUpdateBookShelf={this.updateBookShelf} onSearchBooks={this.searchBooks}/>
        }/>

        <Route exact path="/" render={ () =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelf="currentlyReading" books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
                <Bookshelf shelf="wantToRead" books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
                <Bookshelf shelf="read" books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="search">Add a book</Link>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
