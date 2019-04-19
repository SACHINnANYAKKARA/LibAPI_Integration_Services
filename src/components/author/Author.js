import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

/*
 {
        "authorId": 1,
        "authorName": "sachin"
    },
 */

class App extends Component {
  state = {
    books: [],
    newBookData: {
      authorName: ''
    },
    editBookData: {
      authorId: '',
      authorName: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    this._refreshBooks();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/authors
  addBook() {
    axios.post('http://localhost:8081/api/invitation/authors', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);
      this._refreshBooks();
      this.setState({
        books, newBookModal: false, newBookData: {
          authorName: ''

        }
      });
    });
  }
  updateBook() {
    let { authorName } = this.state.editBookData;

    axios.put('http://localhost:8081/api/invitation/authors/' + this.state.editBookData.authorId, {
      authorName
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { authorId: '', authorName: '' }
      })
    });
  }
  editBook(authorId, authorName) {
    this.setState({
      editBookData: { authorId, authorName }, editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteBook(authorId) {
    axios.delete('http://localhost:8081/api/invitation/authors/' + authorId).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8081/api/invitation/authors').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.authorId}>
          <td>{book.authorName}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.authorId, book.authorName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.authorId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>Books App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Author</Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="authorName">Author Name</Label>
              <Input id="authorName" value={this.state.newBookData.authorName} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.authorName = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit Author</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="authorName">Author Name</Label>
              <Input id="authorName" value={this.state.editBookData.authorName} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.authorName = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
         
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th> Author Name</th>

            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
