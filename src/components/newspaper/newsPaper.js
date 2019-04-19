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
    newspapers: [],
    newNewsPaperData: {
      newsPaperName: '',
      issueDate: '',
      status: ''
    },
    editNewsPaperData: {
      newsPaperId: '',
      newsPaperName: '',
      issueDate: '',
      status: ''
    },
    newNewsPaperModal: false,
    editNewsPaperModal: false
  }
  componentWillMount() {
    this._refreshNewsPapers();
  }
  toggleNewNewsPaperModal() {
    this.setState({
      newNewsPaperModal: !this.state.newNewsPaperModal
    });
  }
  toggleEditNewsPaperModal() {
    this.setState({
      editNewsPaperModal: !this.state.editNewsPaperModal
    });
  }
  addNewsPaper() {
    axios.post('http://localhost:8081/api/invitation/newsPapers', this.state.newNewsPaperData).then((response) => {
      let { newspapers } = this.state;

      newspapers.push(response.data);
      this._refreshNewsPapers();
      this.setState({
        newspapers, newNewsPaperModal: false, newNewsPaperData: {
          newsPaperName: '',
          issueDate: '',
          status: ''
        }
      });
    });
  }
  updateNewsPaper() {
    let { newsPaperName,issueDate,status } = this.state.editNewsPaperData;

    axios.put('http://localhost:8081/api/invitation/newsPapers/' + this.state.editNewsPaperData.newsPaperId, {
      newsPaperName, issueDate,status
    }).then((response) => {
      this._refreshNewsPapers();

      this.setState({
        editNewsPaperModal: false, editNewsPaperData: { newsPaperId: '', newsPaperName: '', issueDate: '',status: '' }
      })
    });
  }
  editNewsPaper(newsPaperId, newsPaperName,issueDate,status) {
    this.setState({
      editNewsPaperData: { newsPaperId, newsPaperName,issueDate,status }, editNewsPaperModal: !this.state.editNewsPaperModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteNewsPaper(newsPaperId) {
    axios.delete('http://localhost:8081/api/invitation/newsPapers/' + newsPaperId).then((response) => {
      this._refreshNewsPapers();
    });
  }
  _refreshNewsPapers() {
    axios.get('http://localhost:8081/api/invitation/newsPapers').then((response) => {
      this.setState({
        newspapers: response.data
      })
    });
  }
  render() {
    let newspapers = this.state.newspapers.map((NewsPaper) => {
      return (
        <tr key={NewsPaper.newsPaperId}>
          <td>{NewsPaper.newsPaperName}</td>
          <td>{NewsPaper.issueDate}</td>
          <td>{NewsPaper.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editNewsPaper.bind(this, NewsPaper.newsPaperId, NewsPaper.newsPaperName, NewsPaper.issueDate,NewsPaper.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteNewsPaper.bind(this, NewsPaper.newsPaperId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>NewsPapers App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewNewsPaperModal.bind(this)}>Add NewsPaper</Button>

        <Modal isOpen={this.state.newNewsPaperModal} toggle={this.toggleNewNewsPaperModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewNewsPaperModal.bind(this)}>Add a new NewsPaper</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="newsPaperName">News Paper Name</Label>
              <Input id="newsPaperName" value={this.state.newNewsPaperData.newsPaperName} onChange={(e) => {
                let { newNewsPaperData } = this.state;

                newNewsPaperData.newsPaperName = e.target.value;

                this.setState({ newNewsPaperData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="issueDate">Issue Date</Label>
              <Input id="issueDate" value={this.state.newNewsPaperData.issueDate} onChange={(e) => {
                let { newNewsPaperData } = this.state;

                newNewsPaperData.issueDate = e.target.value;

                this.setState({ newNewsPaperData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="status">Status</Label>
              <Input id="status" value={this.state.newNewsPaperData.status} onChange={(e) => {
                let { newNewsPaperData } = this.state;

                newNewsPaperData.status = e.target.value;

                this.setState({ newNewsPaperData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addNewsPaper.bind(this)}>Add NewsPaper</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewNewsPaperModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editNewsPaperModal} toggle={this.toggleEditNewsPaperModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditNewsPaperModal.bind(this)}>Edit a new NewsPaper</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="newsPaperName">News Paper Name</Label>
              <Input id="newsPaperName" value={this.state.editNewsPaperData.newsPaperName} onChange={(e) => {
                let { editNewsPaperData } = this.state;

                editNewsPaperData.newsPaperName = e.target.value;

                this.setState({ editNewsPaperData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="issueDate">IssueDate</Label>
              <Input id="issueDate" value={this.state.editNewsPaperData.issueDate} onChange={(e) => {
                let { editNewsPaperData } = this.state;

                editNewsPaperData.issueDate = e.target.value;

                this.setState({ editNewsPaperData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="status">status</Label>
              <Input id="status" value={this.state.editNewsPaperData.status} onChange={(e) => {
                let { editNewsPaperData } = this.state;

                editNewsPaperData.status = e.target.value;

                this.setState({ editNewsPaperData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateNewsPaper.bind(this)}>Update NewsPaper</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditNewsPaperModal.bind(this)}>Cancel</Button>
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
            {newspapers}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default newsPaper;
