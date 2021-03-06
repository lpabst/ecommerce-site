import React, { Component } from 'react';
import axios from 'axios';
import MainHeader from './../../components/Headers/MainHeader.js';
import AdminDeleteProducts from './AdminDeleteProducts.js';

import './AdminLanding.css';


class AdminLanding extends Component {
  constructor(props){
    super(props)

    this.state = {
      productID: null,
      imageInput:'',
      titleInput: '',
      descriptionInput: '',
      priceInput: '',
      attributesInput: 'All',
      editClicked: false,
      loadingPage: true,
    }
    
    this.submit = this.submit.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount(){
    axios.get('/api/isAdmin')
    .then( res => {
      let {isAdmin} = res.data;

      if (isAdmin){
        this.setState({
          loadingPage: false,
        })
      }else{
        document.querySelector('.mainHeaderWrapper a').click();
      }

    })
    .catch(err => {
      document.querySelector('.mainHeaderWrapper a').click();
    });
  }

  submit() {
    if(this.state.editClicked){
      axios.patch('/api/updateProduct', { 
        "productID": this.state.productID,
        "title": this.state.titleInput, 
        "description": this.state.descriptionInput, 
        "price": this.state.priceInput, 
        "image": this.state.imageInput, 
        "attributes": this.state.attributesInput
      })
      .then(res => {
        alert(res.data);
        this.cancelEdit();
        this.child.componentDidMount()
      })
    } else {
      axios.post('/api/addProduct', { 
        "title": this.state.titleInput, 
        "description": this.state.descriptionInput, 
        "price": this.state.priceInput, 
        "image": this.state.imageInput, 
        "attributes": this.state.attributesInput
      })
      .then(res => {
        alert(res.data);
        this.cancelEdit();
        this.child.componentDidMount()
      })
    }
  }

  editProduct(id,image,title,description,price,attributes){
    this.setState({
      productID:id,
      imageInput:image,
      titleInput: title,
      descriptionInput: description,
      priceInput: price,
      attributesInput: attributes,
      editClicked: true
    })
  }

  cancelEdit(){
    this.setState({
      productID:null,
      imageInput:'',
      titleInput: '',
      descriptionInput: '',
      priceInput: '',
      attributesInput: 'All',
      editClicked: false      
    })
  }

  render() {

    let cancelEdit = this.state.editClicked ?
      <button onClick={this.cancelEdit}>Cancel Edit</button> :
      null

    let defaultImage = 'data:image/jpeg;base64,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'
    let defaultTitle = 'Title'
    let defaultDescription = 'Description'
    let defaultPrice = 'Price'

    return (
      <section className="routeWrapper">
      
        { this.state.loadingPage ? 
            <div>
              <MainHeader />
              <div className='loadingMessage'>
                <p>Loading...</p>
              </div>
            </div>
          : <div>
              <MainHeader />
              <div className='clCartHeader'>
                <h1>Admin Portal</h1>
              </div> 
              <div className='alAddNewProductSectionParent'>
                <div className='alAddNewProductSection'>
                  <div className='alInputsWrapper'>
                    <h1>Image Source</h1>
                    <input value={this.state.imageInput} onChange={(e) => this.setState({imageInput: e.target.value})} type="text"/>
                    <br/>
                    <h1>Title</h1>
                    <input value={this.state.titleInput} onChange={(e) => this.setState({titleInput: e.target.value})} type="text"/>
                    <br/>
                    <h1>Description</h1>
                    <textarea value={this.state.descriptionInput} onChange={(e) => this.setState({descriptionInput: e.target.value})} type="text"/>
                    <br/>
                    <h1>Price</h1>
                    <input value={this.state.priceInput} onChange={(e) => this.setState({priceInput: e.target.value})} type="text"/>
                    <br/>
                    <h1>Attributes (Attributes can be separated by a space, a comma, or any symbol of your choice)</h1>
                    <input value={this.state.attributesInput} onChange={(e) => this.setState({attributesInput: e.target.value})} type="text"/>
                    <br/>
                    <button onClick={this.submit}>Submit</button>
                    {cancelEdit}
                  </div>
                  <br/>
                  <div className='alProductPreview'>
                    <div style={{"width":"420px"}} className='plpSingleProductWrapper'>
                        <img src={this.state.imageInput === '' ? defaultImage : this.state.imageInput} alt="" />
                        <h1>{this.state.titleInput === '' ? defaultTitle : this.state.titleInput}</h1>
                        <p>{this.state.descriptionInput === '' ? defaultDescription : this.state.descriptionInput}</p>
                        <h3>${this.state.priceInput === '' ? defaultPrice : this.state.priceInput}</h3>
                        <h5>Buy Now</h5>
                    </div>
                  </div>
                </div>
              </div>
              <AdminDeleteProducts onRef={ref => (this.child = ref)} editProduct={this.editProduct}/>  
            </div>
        }

      </section>
    );
  }
}


export default AdminLanding;