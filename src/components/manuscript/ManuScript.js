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
    manuscripts: [],
    newManuScriptData: {
      manuscriptName: '',
      year: '',
      status: ''
    },
    editManuScriptData: {
      manuscriptId: '',
      manuscriptName: '',
      year: '',
      status: ''
    },
    newManuScriptModal: false,
    editManuScriptModal: false
  }
  componentWillMount() {
    this._refreshManuScripts();
  }
  toggleNewManuScriptModal() {
    this.setState({
      newManuScriptModal: !this.state.newManuScriptModal
    });
  }
  toggleEditManuScriptModal() {
    this.setState({
      editManuScriptModal: !this.state.editManuScriptModal
    });
  }
  addManuScript() {
    axios.post('http://localhost:8081/api/invitation/manuscripts/', this.state.newManuScriptData).then((response) => {
      let { manuscripts } = this.state;

      manuscripts.push(response.data);
      this._refreshManuScripts();
      this.setState({
        manuscripts, newManuScriptModal: false, newManuScriptData: {
          manuscriptName: '',
          year: '',
          status: ''
        }
      });
    });
  }

  //localhost:8081/api/invitation/manuscripts/
  updateManuScript() {
    let { manuscriptName, year, status } = this.state.editManuScriptData;

    axios.put('http://localhost:8081/api/invitation/manuscripts/' + this.state.editManuScriptData.manuscriptId, {
      manuscriptName, year, status
    }).then((response) => {
      this._refreshManuScripts();

      this.setState({
        editManuScriptModal: false, editManuScriptData: { manuscriptId: '', manuscriptName: '', year: '', status: '' }
      })
    });
  }

  editManuScript(manuscriptId, manuscriptName, year, status) {
    this.setState({
      editManuScriptData: { manuscriptId, manuscriptName, year, status }, editManuScriptModal: !this.state.editManuScriptModal
    });
  }

  //localhost:8081/api/invitation/manuscripts
  deleteManuScript(manuscriptId) {
    axios.delete('http://localhost:8081/api/invitation/manuscripts/' + manuscriptId).then((response) => {
      this._refreshManuScripts();
    });
  }
  _refreshManuScripts() {
    axios.get('http://localhost:8081/api/invitation/manuscripts').then((response) => {
      this.setState({
        manuscripts: response.data
      })
    });
  }
  render() {
    let manuscripts = this.state.manuscripts.map((ManuScript) => {
      return (
        <tr key={ManuScript.manuscriptId}>
          <td>{ManuScript.manuscriptName}</td>
          <td>{ManuScript.year}</td>
          <td>{ManuScript.status}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editManuScript.bind(this, ManuScript.manuscriptId, ManuScript.manuscriptName, ManuScript.year, ManuScript.status)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteManuScript.bind(this, ManuScript.manuscriptId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <h1>ManuScripts App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewManuScriptModal.bind(this)}>Add ManuScript</Button>

        <Modal isOpen={this.state.newManuScriptModal} toggle={this.toggleNewManuScriptModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewManuScriptModal.bind(this)}>Add new ManuScript</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="manuscriptName">ManuScript Name</Label>
              <Input id="manuscriptName" value={this.state.newManuScriptData.manuscriptName} onChange={(e) => {
                let { newManuScriptData } = this.state;

                newManuScriptData.manuscriptName = e.target.value;

                this.setState({ newManuScriptData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="year">Year</Label>
              <Input id="year" value={this.state.newManuScriptData.year} onChange={(e) => {
                let { newManuScriptData } = this.state;

                newManuScriptData.year = e.target.value;

                this.setState({ newManuScriptData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="status">Status</Label>
              <Input id="status" value={this.state.newManuScriptData.status} onChange={(e) => {
                let { newManuScriptData } = this.state;

                newManuScriptData.status = e.target.value;

                this.setState({ newManuScriptData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addManuScript.bind(this)}>Add ManuScript</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewManuScriptModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editManuScriptModal} toggle={this.toggleEditManuScriptModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditManuScriptModal.bind(this)}>Edit a ManuScript</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="manuscriptName">ManuScript Name</Label>
              <Input id="manuscriptName" value={this.state.editManuScriptData.manuscriptName} onChange={(e) => {
                let { editManuScriptData } = this.state;

                editManuScriptData.manuscriptName = e.target.value;

                this.setState({ editManuScriptData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="year">year</Label>
              <Input id="year" value={this.state.editManuScriptData.year} onChange={(e) => {
                let { editManuScriptData } = this.state;

                editManuScriptData.year = e.target.value;

                this.setState({ editManuScriptData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="status">status</Label>
              <Input id="status" value={this.state.editManuScriptData.status} onChange={(e) => {
                let { editManuScriptData } = this.state;

                editManuScriptData.status = e.target.value;

                this.setState({ editManuScriptData });
              }} />
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateManuScript.bind(this)}>Update ManuScript</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditManuScriptModal.bind(this)}>Cancel</Button>
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
            {manuscripts}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;