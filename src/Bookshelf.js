import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'

class Bookshelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
  }

  render() {
    const {shelf, books, onUpdateBookShelf} = this.props

    return  (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <BookGrid books={books.filter( book => book.shelf === shelf)} onUpdateBookShelf={onUpdateBookShelf}/>
        </div>
      </div>
    )
  }
}

export default Bookshelf
