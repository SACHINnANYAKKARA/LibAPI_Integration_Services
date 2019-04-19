import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/*
 {
        "categoryId": 1,
        "categoryName": "Adventure"
    },
 */

class App extends Component {
  state = {
    books: [],
    newBookData: {
      categoryName: ''
    },
    editBookData: {
      categoryId: '',
      categoryName: ''
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

  //localhost:8081/api/invitation/category
  addBook() {
    axios.post('http://localhost:8081/api/invitation/category', this.state.newBookData).then((response) => {
     
      let { books } = this.state;

      books.push(response.data);

      this.setState({
        books, newBookModal: false, newBookData: {
      
          categoryName: ''

        }
      });
    });
  }
  updateBook() {
    let { categoryName } = this.state.editBookData;

    axios.put('http://localhost:8081/api/invitation/category/' + this.state.editBookData.categoryId, {
      categoryName
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { categoryId: '', categoryName: '' }
      })
    });
  }
  editBook(categoryId, categoryName) {
    this.setState({
      editBookData: { categoryId, categoryName }, editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteBook(categoryId) {
    axios.delete('http://localhost:8081/api/invitation/category/' + categoryId).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8081/api/invitation/category').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    this._refreshBooks();
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.categoryId}>
          <td>{book.categoryName}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.categoryId, book.categoryName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.categoryId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">


      <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book Category</Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add New Reference</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">categoryName</Label>

              <Input id="title" value={this.state.newBookData.categoryName} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.categoryName = e.target.value;

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
              <Label for="categoryName">Category Name</Label>
              <Input id="categoryName" value={this.state.editBookData.categoryName} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.categoryName = e.target.value;

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
              <th> Category Name</th>

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
