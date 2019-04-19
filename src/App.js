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
    Authors: [],
    newAuthorData: {
      authorName: ''
    },
    editAuthorData: {
      authorId: '',
      authorName: ''
    },
    newAuthorModal: false,
    editAuthorModal: false
  }
  componentWillMount() {
    this._refreshAuthors();
  }
  toggleNewAuthorModal() {
    this.setState({
      newAuthorModal: !this.state.newAuthorModal
    });
  }
  toggleEditAuthorModal() {
    this.setState({
      editAuthorModal: !this.state.editAuthorModal
    });
  }

  //localhost:8081/api/invitation/authors
  addAuthor() {
    axios.post('http://localhost:8081/api/invitation/authors', this.state.newAuthorData).then((response) => {
      let { Authors } = this.state;

      Authors.push(response.data);
      this._refreshAuthors();
      this.setState({
        Authors, newAuthorModal: false, newAuthorData: {
          authorName: ''

        }
      });
    });
  }
  updateAuthor() {
    let { authorName } = this.state.editAuthorData;

    axios.put('http://localhost:8081/api/invitation/authors/' + this.state.editAuthorData.authorId, {
      authorName
    }).then((response) => {
      this._refreshAuthors();

      this.setState({
        editAuthorModal: false, editAuthorData: { authorId: '', authorName: '' }
      })
    });
  }
  editAuthor(authorId, authorName) {
    this.setState({
      editAuthorData: { authorId, authorName }, editAuthorModal: !this.state.editAuthorModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteAuthor(authorId) {
    axios.delete('http://localhost:8081/api/invitation/authors/' + authorId).then((response) => {
      this._refreshAuthors();
    });
  }
  _refreshAuthors() {
    axios.get('http://localhost:8081/api/invitation/authors').then((response) => {
      this.setState({
        Authors: response.data
      })
    });
  }
  render() {
    let Authors = this.state.Authors.map((Author) => {
      return (
        <tr key={Author.authorId}>
          <td>{Author.authorName}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editAuthor.bind(this, Author.authorId, Author.authorName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteAuthor.bind(this, Author.authorId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>Authors App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewAuthorModal.bind(this)}>Add Author</Button>

        <Modal isOpen={this.state.newAuthorModal} toggle={this.toggleNewAuthorModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewAuthorModal.bind(this)}>Add a new Author</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="authorName">Author Name</Label>
              <Input id="authorName" value={this.state.newAuthorData.authorName} onChange={(e) => {
                let { newAuthorData } = this.state;

                newAuthorData.authorName = e.target.value;

                this.setState({ newAuthorData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addAuthor.bind(this)}>Add Author</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewAuthorModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editAuthorModal} toggle={this.toggleEditAuthorModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditAuthorModal.bind(this)}>Edit Author</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="authorName">Author Name</Label>
              <Input id="authorName" value={this.state.editAuthorData.authorName} onChange={(e) => {
                let { editAuthorData } = this.state;

                editAuthorData.authorName = e.target.value;

                this.setState({ editAuthorData });
              }} />
            </FormGroup>
         
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateAuthor.bind(this)}>Update Author</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditAuthorModal.bind(this)}>Cancel</Button>
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
            {Authors}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
