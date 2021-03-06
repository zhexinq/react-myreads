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
      this.setState({ books })
    })
  }

  updateBookShelf = (event, book) => {
    const changedShelf = event.target.value
    const updatedBooks = this.state.books
    const bookToBeUpdated = updatedBooks.find(b => b.id === book.id)
    if (bookToBeUpdated) {
      bookToBeUpdated.shelf = changedShelf
    } else {
      book.shelf = changedShelf
      updatedBooks.push(book)
    }
    BooksAPI.update(book, changedShelf).then( res => {
      this.setState({
        books: updatedBooks
      })
    })
  }

  searchBooks = (query) => {
    const intersect = (books1, books2) => {
      books1.forEach(b1 => {
        if (books2) {
          books2.forEach(b2 => {
            if (b1.id === b2.id) {
              // console.log(b1)
              b2.shelf = b1.shelf
            }
            if (!b2.shelf) {
              b2.shelf = 'none'
            }
          })
        }
      })
      return books2
    }

    const resetSearchResults = () => {
      this.setState({
        searchedBooks: []
      })
    }

    if (query === '') {
      resetSearchResults()
      return
    }

    BooksAPI.search(query, 100).then( books => {
      if (!books.error) {
        const searched = intersect(this.state.books, books)
        this.setState({ searchedBooks: searched})
      } else {
        resetSearchResults()
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
