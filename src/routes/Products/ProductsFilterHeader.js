import React, { Component } from 'react';
import './ProductsFilterHeader.css';

class ProductsFilterHeader extends Component {
    constructor(props){
        super(props)

        this.state = {
            activeFilter: 0,
            filterCategories:['All','Device Accessories','Automotive','Baby Products','Beauty','Books','Camera/Photo','Cell Phones','Clothing','Electronics','Home/Garden','Music','Travel','Outdoors','Computers/Software','Sports','Tools/Home Improvement','Toys/Games','TV/Video/DVD'],
        }
        
        this.updateItemColors = this.updateItemColors.bind(this);
    }

    // updates the activeFilter index on state, then updates the attribute to show (this.props function)
    updateItemColors(index, val){
        console.log(index);
        this.setState({
            activeFilter: index
        })
        this.props.updateAttributeToShow(val)
    }

  render() {

    return (
      <section className="pfhSection">
        <div className='pfhContentWrapper'>
            <ul style={{"flexWrap":"wrap"}} className='flexRow'>

                { this.state.filterCategories.map((item, i) => {
                    // the activeFilter will be blue, the rest are gray
                    let color = i === this.state.activeFilter ? '#19f' : '#ccc';
                    return <li onClick={ ()=> { this.updateItemColors(i, item) }} style={{color:color}} key={i} >{item}</li>
                  })
                }

            </ul>
        </div>
      </section>
    );
  }
}

export default ProductsFilterHeader;