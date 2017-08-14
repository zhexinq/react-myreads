import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookGrid from './BookGrid'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
  state = {
    query: ''
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired
  }

  render() {
    const {books, onUpdateBookShelf, onSearchBooks} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={e => onSearchBooks('')}>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <form onSubmit={ (event) => {
                event.preventDefault()
                onSearchBooks(this.state.query)
              }
            }>
              <input type="text" placeholder="Search by title or author" onChange={e => this.setState({
                query: e.target.value
              })}/>
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid books={books} onUpdateBookShelf={onUpdateBookShelf} />
        </div>
      </div>
    )
  }


}

export default SearchBooks
