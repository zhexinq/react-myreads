import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
          <ol className="books-grid">
            {
              books.filter( book => book.shelf === shelf ).map( book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={e => onUpdateBookShelf(e, book)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading" selected={book.shelf === 'currentlyReading'}>Currently Reading</option>
                          <option value="wantToRead" selected={book.shelf === 'wantToRead'}>Want to Read</option>
                          <option value="read" selected={book.shelf === 'read'}>Read</option>
                          <option value="none" selected={book.shelf === 'none'}>None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
