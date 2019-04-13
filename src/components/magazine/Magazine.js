import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

/*
 {
        "magazineId": 3,
        "magazineName": "hada",
        "date": "2019-03-26T00:00:00.000+0000",
        "status": "publish"
    },
 */

class Magazine extends Component {
  state = {
    books: [],
    newBookData: {
      magazineName: '',
      date: '',
      status: ''
    },
    editBookData: {
      magazineId: '',
      magazineName: '',
      date: '',
      status: ''
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
  addBook() {
    axios.post('http://localhost:8081/api/invitation/magazines', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);

      this.setState({
        books, newBookModal: false, newBookData: {
          magazineName: '',
          date: '',
          status: ''
        }
      });
    });
  }

  //localhost:8081/api/invitation/magazines/11
  updateBook() {
    let { magazineName, date, status } = this.state.editBookData;

    axios.put('http://localhost:8081/api/invitation/magazines/' + this.state.editBookData.magazineId, {
      magazineName, date, status
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { magazineId: '', magazineName: '', date: '', status: '' }
      })
    });
  }
  editBook(magazineId, magazineName, date, status) {
    this.setState({
      editBookData: { magazineId, magazineName, date, status }, editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteBook(magazineId) {
    axios.delete('http://localhost:8081/api/invitation/magazines/' + magazineId).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8081/api/invitation/magazines').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.magazineId}>
          <td>{book.magazineName}</td>
          <td>{book.date}</td>
          <td>{book.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.magazineId, book.magazineName, book.date, book.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.magazineId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>Books App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="magazineName">Magazine Name</Label>
              <Input id="magazineName" value={this.state.newBookData.magazineName} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.magazineName = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="date">Date</Label>
              <Input id="date" value={this.state.newBookData.date} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.date = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="status">Status</Label>
              <Input id="status" value={this.state.newBookData.status} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.status = e.target.value;

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
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="magazineName">Magazine Name</Label>
              <Input id="magazineName" value={this.state.editBookData.magazineName} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.magazineName = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input id="date" value={this.state.editBookData.date} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.date = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="status">status</Label>
              <Input id="status" value={this.state.editBookData.status} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.status = e.target.value;

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
              <th>Magazine Name</th>
              <th>Date</th>
              <th>Status</th>
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

export default Magazine;
