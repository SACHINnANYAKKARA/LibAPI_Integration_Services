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
    Categorys: [],
    newCategoryData: {
      categoryName: ''
    },
    editCategoryData: {
      categoryId: '',
      categoryName: ''
    },
    newCategoryModal: false,
    editCategoryModal: false
  }
  componentWillMount() {
    this._refreshCategorys();
  }
  toggleNewCategoryModal() {
    this.setState({
      newCategoryModal: !this.state.newCategoryModal
    });
  }
  toggleEditCategoryModal() {
    this.setState({
      editCategoryModal: !this.state.editCategoryModal
    });
  }

  //localhost:8081/api/invitation/category
  addCategory() {
    axios.post('http://localhost:8081/api/invitation/category', this.state.newCategoryData).then((response) => {
     
      let { Categorys } = this.state;

      Categorys.push(response.data);
      this._refreshCategorys();
      this.setState({
        Categorys, newCategoryModal: false, newCategoryData: {
      
          categoryName: ''

        }
      });
    });
  }
  updateCategory() {
    let { categoryName } = this.state.editCategoryData;

    axios.put('http://localhost:8081/api/invitation/category/' + this.state.editCategoryData.categoryId, {
      categoryName
    }).then((response) => {
      this._refreshCategorys();

      this.setState({
        editCategoryModal: false, editCategoryData: { categoryId: '', categoryName: '' }
      })
    });
  }
  editCategory(categoryId, categoryName) {
    this.setState({
      editCategoryData: { categoryId, categoryName }, editCategoryModal: !this.state.editCategoryModal
    });
  }

  //localhost:8081/api/invitation/newsPapers/2
  deleteCategory(categoryId) {
    axios.delete('http://localhost:8081/api/invitation/category/' + categoryId).then((response) => {
      this._refreshCategorys();
    });
  }
  _refreshCategorys() {
    axios.get('http://localhost:8081/api/invitation/category').then((response) => {
      this.setState({
        Categorys: response.data
      })
    });
  }
  render() {
    this._refreshCategorys();
    let Categorys = this.state.Categorys.map((Category) => {
      return (
        <tr key={Category.categoryId}>
          <td>{Category.categoryName}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editCategory.bind(this, Category.categoryId, Category.categoryName)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCategory.bind(this, Category.categoryId)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">


      <Button className="my-3" color="primary" onClick={this.toggleNewCategoryModal.bind(this)}>Add Category Category</Button>

        <Modal isOpen={this.state.newCategoryModal} toggle={this.toggleNewCategoryModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewCategoryModal.bind(this)}>Add New Reference</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">categoryName</Label>

              <Input id="title" value={this.state.newCategoryData.categoryName} onChange={(e) => {
                let { newCategoryData } = this.state;

                newCategoryData.categoryName = e.target.value;

                this.setState({ newCategoryData });
              }} />
            </FormGroup>

        

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addCategory.bind(this)}>Add Category</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewCategoryModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editCategoryModal} toggle={this.toggleEditCategoryModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditCategoryModal.bind(this)}>Edit Author</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="categoryName">Category Name</Label>
              <Input id="categoryName" value={this.state.editCategoryData.categoryName} onChange={(e) => {
                let { editCategoryData } = this.state;

                editCategoryData.categoryName = e.target.value;

                this.setState({ editCategoryData });
              }} />
            </FormGroup>
         
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateCategory.bind(this)}>Update Category</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditCategoryModal.bind(this)}>Cancel</Button>
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
            {Categorys}
          </tbody>
        
        </Table>
      </div>
    );
  }
}

export default App;