import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

/*
 {
        "newsPaperId": 1,
        "newsPaperName": "m",
        "issueDate": "2019-04-16T18:30:00.000+0000",
        "status": "m"
    },
 */

class newsPaper extends Component {
  state = {
    books: [],
    newBookData: {
      newsPaperName: '',
      issueDate: '',
      status: ''
    },
    editBookData: {
      newsPaperId: '',
      newsPaperName: '',
      issueDate: '',
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
    axios.post('http://localhost:8081/api/invitation/newsPapers', this.state.newBookData).then((response) => {
      let { books } = this.state;

      books.push(response.data);

      this.setState({
        books, newBookModal: false, newBookData: {
          newsPaperName: '',
          issueDate: '',
          status: ''
        }
      });
    });
  }
  updateBook() {
    let { newsPaperName,issueDate,status } = this.state.editBookData;

    axios.put('http://localhost:8081/api/invitation/newsPapers/' + this.state.editBookData.newsPaperId, {
      newsPaperName, issueDate,status
    }).then((response) => {
      this._refreshBooks();

      this.setState({
        editBookModal: false, editBookData: { newsPaperId: '', newsPaperName: '', issueDate: '',status: '' }
      })
    });
  }
  editBook(newsPaperId, newsPaperName,issueDate,status) {
    this.setState({
      editBookData: { newsPaperId, newsPaperName,issueDate,status }, editBookModal: !this.state.editBookModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteBook(newsPaperId) {
    axios.delete('http://localhost:8081/api/invitation/newsPapers/' + newsPaperId).then((response) => {
      this._refreshBooks();
    });
  }
  _refreshBooks() {
    axios.get('http://localhost:8081/api/invitation/newsPapers').then((response) => {
      this.setState({
        books: response.data
      })
    });
  }
  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.newsPaperId}>
          <td>{book.newsPaperName}</td>
          <td>{book.issueDate}</td>
          <td>{book.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.newsPaperId, book.newsPaperName, book.issueDate,book.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.newsPaperId)}>Delete</Button>
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
              <Label for="newsPaperName">News Paper Name</Label>
              <Input id="newsPaperName" value={this.state.newBookData.newsPaperName} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.newsPaperName = e.target.value;

                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="issueDate">Issue Date</Label>
              <Input id="issueDate" value={this.state.newBookData.issueDate} onChange={(e) => {
                let { newBookData } = this.state;

                newBookData.issueDate = e.target.value;

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
              <Label for="newsPaperName">News Paper Name</Label>
              <Input id="newsPaperName" value={this.state.editBookData.newsPaperName} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.newsPaperName = e.target.value;

                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="issueDate">IssueDate</Label>
              <Input id="issueDate" value={this.state.editBookData.issueDate} onChange={(e) => {
                let { editBookData } = this.state;

                editBookData.issueDate = e.target.value;

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
              <th>News Paper Name</th>
              <th>Issue Date</th>
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

export default newsPaper;
