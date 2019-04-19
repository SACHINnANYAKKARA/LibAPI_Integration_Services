import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

/*
 {
       "manuscriptId": 1,
        "manuscriptName": "dds",
        "year": 1995,
        "status": "dds"
    },
 */

class App extends Component {
  state = {
    books: [],
    newBookData: {
      manuscriptName: '',
      year: '',
      status: ''
    },
    editBookData: {
      manuscriptId: '',
      manuscriptName: '',
      year: '',
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
    axios.post('http://localhost:8081/api/invitation/manuscripts/', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);
      this._refreshBooks();
      this.setState({
        books, newBookModal: false, newBookData: {
          manuscriptName: '',
          year: '',
          status: ''
        }
      });
    });
  }

  //localhost:8081/api/invitation/manuscripts/
  updateBook() {
    let { manuscriptName, year, status } = this.state.editBookData;

    axios.put('http://localhost:8081/api/invitation/manuscripts/' + this.state.editBookData.manuscriptId, {
      manuscriptName, year, status
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { manuscriptId: '', manuscriptName: '', year: '', status: '' }
      })
    });
  }

  editBook(manuscriptId, manuscriptName, year, status) {
    this.setState({
      editBookData: { manuscriptId, manuscriptName, year, status }, editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/manuscripts
  deleteBook(manuscriptId) {
    axios.delete('http://localhost:8081/api/invitation/manuscripts/' + manuscriptId).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8081/api/invitation/manuscripts').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.manuscriptId}>
          <td>{book.manuscriptName}</td>
          <td>{book.year}</td>
          <td>{book.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.manuscriptId, book.manuscriptName, book.year, book.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.manuscriptId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>Books App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add new ManuScript</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="manuscriptName">ManuScript Name</Label>
              <Input id="manuscriptName" value={this.state.newBookData.manuscriptName} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.manuscriptName = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="year">Year</Label>
              <Input id="year" value={this.state.newBookData.year} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.year = e.target.value;

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
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a ManuScript</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="manuscriptName">ManuScript Name</Label>
              <Input id="manuscriptName" value={this.state.editBookData.manuscriptName} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.manuscriptName = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="year">year</Label>
              <Input id="year" value={this.state.editBookData.year} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.year = e.target.value;

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
              <th>ManuScript Name</th>
              <th>Year</th>
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

export default App;
