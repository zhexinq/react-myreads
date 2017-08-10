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
    var booksToUpdate = this.state.books

    console.log(changedShelf)
    console.log(book)
    booksToUpdate.map( b => {
      if (b.id === book.id)
        b.shelf = changedShelf
    })

    this.setState({
      books: booksToUpdate
    })

    BooksAPI.update(book, changedShelf)
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 10).then( books => {
      if (books) {
        this.setState({
          searchedBooks: books
        })

        books.map( book => {
          BooksAPI.get(book.id).then( b => {
            var searched = this.state.searchedBooks
            searched.map(search => {
              if (search.id == b.id)
                search.shelf = b.shelf
            })
            this.setState( state => ({
              searchedBooks: searched
            }))
          })
        })
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
