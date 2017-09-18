import React , { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import SearchBar from './SearchBar'
import Book from './Book'

class SearchBook extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updadeShelf: PropTypes.func.isRequired
  }

  state = {
    query:'',
    searchedBooks:[]
  }
  
  handleShelfUpdate = (book, shelf) => {
    this.props.updadeShelf(book, shelf)
  }

  updateQuery = (query) => {
    this.setState({ query })

    this.bookSearch(this.state.query)
    
  }
  
  bookSearch = (query) => {  
    if(query.length >= 2){
      BooksAPI.search(query, 50).then(searchedBooks => {
        this.setState({ searchedBooks })
      })
    }
  }
  
  clearBooks = () => {
    this.setState({
      query:'',
      searchedBooks:[]
    })
  }
  
  render(){
    return(
      <div className="search-books">
        <SearchBar serachTerm={this.updateQuery} clearBooks={this.clearBooks}/>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              ! this.state.searchedBooks
              ? <li><h1>Loading...</h1></li>
              : this.state.searchedBooks.map((book, i) => {
                  this.props.books.forEach(b => {
                    if (book.id === b.id) {
                      book.shelf = b.shelf
                    }
                  })
                  
                  return(
                    <li key={book.id}>
                      <Book
                        authors={book.authors}
                        book={book}
                        id={book.id}
                        imageLinks={book.imageLinks}
                        onUpdate={this.handleShelfUpdate}
                        shelf={book.shelf ? book.shelf : 'none'}
                        title={book.title}
                      />
                    </li>
                  )
                } 
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook