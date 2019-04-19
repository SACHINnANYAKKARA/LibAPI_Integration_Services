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

class App extends Component {
  state = {
    magazines: [],
    newMagazineData: {
      magazineName: '',
      date: '',
      status: ''
    },
    editMagazineData: {
      magazineId: '',
      magazineName: '',
      date: '',
      status: ''
    },
    newMagazineModal: false,
    editMagazineModal: false
  }
  componentWillMount() {
    this._refreshMagazines();
  }
  toggleNewMagazineModal() {
    this.setState({
      newMagazineModal: !this.state.newMagazineModal
    });
  }
  toggleEditMagazineModal() {
    this.setState({
      editMagazineModal: !this.state.editMagazineModal
    });
  }
  addMagazine() {
    axios.post('http://localhost:8081/api/invitation/magazines', this.state.newMagazineData).then((response) => {
      let { magazines } = this.state;

      magazines.push(response.data);
      this._refreshMagazines();
      this.setState({
        magazines, newMagazineModal: false, newMagazineData: {
          magazineName: '',
          date: '',
          status: ''
        }
      });
    });
  }

  //localhost:8081/api/invitation/magazines/11
  updateMagazine() {
    let { magazineName, date, status } = this.state.editMagazineData;

    axios.put('http://localhost:8081/api/invitation/magazines/' + this.state.editMagazineData.magazineId, {
      magazineName, date, status
    }).then((response) => {
      this._refreshMagazines();

      this.setState({
        editMagazineModal: false, editMagazineData: { magazineId: '', magazineName: '', date: '', status: '' }
      })
    });
  }
  editMagazine(magazineId, magazineName, date, status) {
    this.setState({
      editMagazineData: { magazineId, magazineName, date, status }, editMagazineModal: !this.state.editMagazineModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteMagazine(magazineId) {
    axios.delete('http://localhost:8081/api/invitation/magazines/' + magazineId).then((response) => {
      this._refreshMagazines();
    });
  }
  _refreshMagazines() {
    axios.get('http://localhost:8081/api/invitation/magazines').then((response) => {
      this.setState({
        magazines: response.data
      })
    });
  }
  render() {
    let magazines = this.state.magazines.map((Magazine) => {
      return (
        <tr key={Magazine.magazineId}>
          <td>{Magazine.magazineName}</td>
          <td>{Magazine.date}</td>
          <td>{Magazine.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editMagazine.bind(this, Magazine.magazineId, Magazine.magazineName, Magazine.date, Magazine.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteMagazine.bind(this, Magazine.magazineId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>Magazines App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewMagazineModal.bind(this)}>Add Magazine</Button>

        <Modal isOpen={this.state.newMagazineModal} toggle={this.toggleNewMagazineModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewMagazineModal.bind(this)}>Add a new Magazine</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="magazineName">Magazine Name</Label>
              <Input id="magazineName" value={this.state.newMagazineData.magazineName} onChange={(e) => {
                let { newMagazineData } = this.state;

                newMagazineData.magazineName = e.target.value;

                this.setState({ newMagazineData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="date">Date</Label>
              <Input id="date" value={this.state.newMagazineData.date} onChange={(e) => {
                let { newMagazineData } = this.state;

                newMagazineData.date = e.target.value;

                this.setState({ newMagazineData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="status">Status</Label>
              <Input id="status" value={this.state.newMagazineData.status} onChange={(e) => {
                let { newMagazineData } = this.state;

                newMagazineData.status = e.target.value;

                this.setState({ newMagazineData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addMagazine.bind(this)}>Add Magazine</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewMagazineModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editMagazineModal} toggle={this.toggleEditMagazineModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditMagazineModal.bind(this)}>Edit a new Magazine</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="magazineName">Magazine Name</Label>
              <Input id="magazineName" value={this.state.editMagazineData.magazineName} onChange={(e) => {
                let { editMagazineData } = this.state;

                editMagazineData.magazineName = e.target.value;

                this.setState({ editMagazineData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input id="date" value={this.state.editMagazineData.date} onChange={(e) => {
                let { editMagazineData } = this.state;

                editMagazineData.date = e.target.value;

                this.setState({ editMagazineData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="status">status</Label>
              <Input id="status" value={this.state.editMagazineData.status} onChange={(e) => {
                let { editMagazineData } = this.state;

                editMagazineData.status = e.target.value;

                this.setState({ editMagazineData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateMagazine.bind(this)}>Update Magazine</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditMagazineModal.bind(this)}>Cancel</Button>
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
            {magazines}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
