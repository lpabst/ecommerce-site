import React, { Component } from 'react';

import './ProductsFilterHeader.css';


class ProductsFilterHeader extends Component {
    constructor(props){
        super(props)

        this.state = {
            itemColors:['#19f','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc','#ccc']
        }
        
        this.updateItemColors = this.updateItemColors.bind(this);
    }

    updateItemColors(num, val){
        let newItemColors = [...this.state.itemColors]
        newItemColors[num] = '#19f'
        for(let i=0; i<newItemColors.length; i++){
            if(i !== num){
                newItemColors[i] = '#ccc';
            }
        }
        this.setState({
            itemColors: newItemColors
        })
        this.props.updateAttributeToShow(val)
    }

  render() {

    return (
      <section className="pfhSection">
        <div className='pfhContentWrapper'>
            <ul style={{"flexWrap":"wrap"}} className='flexRow'>
                <li onClick={ ()=> { this.updateItemColors(0, 'All') }}                 style={{"color":`${this.state.itemColors[0]}`}}>All</li>
                <li onClick={ ()=> { this.updateItemColors(1, 'Device Accessories') }}                style={{"color":`${this.state.itemColors[1]}`}}>Device Accessories</li>
                <li onClick={ ()=> { this.updateItemColors(2, 'Automotive') }}             style={{"color":`${this.state.itemColors[2]}`}}>Automotive</li>
                <li onClick={ ()=> { this.updateItemColors(3, 'Baby Products') }}           style={{"color":`${this.state.itemColors[3]}`}}>Baby Products</li>
                <li onClick={ ()=> { this.updateItemColors(4, 'Beauty') }}              style={{"color":`${this.state.itemColors[4]}`}}>Beauty</li>
                <li onClick={ ()=> { this.updateItemColors(5, 'Books') }}            style={{"color":`${this.state.itemColors[5]}`}}>Books</li>
                <li onClick={ ()=> { this.updateItemColors(6, 'Camera/Photo') }}             style={{"color":`${this.state.itemColors[6]}`}}>Camera/Photo</li>
                <li onClick={ ()=> { this.updateItemColors(7, 'Cell Phones') }}               style={{"color":`${this.state.itemColors[7]}`}}>Cell Phones</li>
                <li onClick={ ()=> { this.updateItemColors(8, 'Clothing') }}                style={{"color":`${this.state.itemColors[8]}`}}>Clothing</li>
                <li onClick={ ()=> { this.updateItemColors(9, 'Electronics') }}             style={{"color":`${this.state.itemColors[9]}`}}>Electronics</li>
                <li onClick={ ()=> { this.updateItemColors(10, 'Home/Garden') }}            style={{"color":`${this.state.itemColors[10]}`}}>Home/Garden</li>
                <li onClick={ ()=> { this.updateItemColors(11, 'Travel') }}    style={{"color":`${this.state.itemColors[11]}`}}>Travel</li>
                <li onClick={ ()=> { this.updateItemColors(12, 'Outdoors') }}          style={{"color":`${this.state.itemColors[12]}`}}>Outdoors</li>
                <li onClick={ ()=> { this.updateItemColors(13, 'Computers/Software') }}              style={{"color":`${this.state.itemColors[13]}`}}>Computers/Software</li>
                <li onClick={ ()=> { this.updateItemColors(14, 'Sports') }}   style={{"color":`${this.state.itemColors[14]}`}}>Sports</li>
                <li onClick={ ()=> { this.updateItemColors(14, 'Tools/Home Improvement') }}   style={{"color":`${this.state.itemColors[14]}`}}>Tools/Home Improvement</li>
                <li onClick={ ()=> { this.updateItemColors(14, 'Toys/Games') }}   style={{"color":`${this.state.itemColors[14]}`}}>Toys/Games</li>
                <li onClick={ ()=> { this.updateItemColors(14, 'TV/Video/DVD') }}   style={{"color":`${this.state.itemColors[14]}`}}>TV/Video/DVD</li>
            </ul>
        </div>
      </section>
    );
  }
}


export default ProductsFilterHeader;