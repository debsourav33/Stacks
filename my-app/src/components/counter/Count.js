import React, { Component } from "react";
import './Count.css'
import PropTypes from 'prop-types'


class Counter extends Component{
    #imgSrc = "https://www.jeduka.com/storage/newsletter/1600436299_Top_100_Universities_in_USA.jpg";

    constructor(props){
        super(props);
        this.state = {cnt:0}
    }

    render(){
        return (
          <div className="App">
            <h1> Hello World </h1>
            {/*<img src={this.#imgSrc} alt="University Image"/>*/}
            <CountButton by={1} onCountClickCallback={this.onCountClick}/>
            <CountButton by={5} onCountClickCallback={this.onCountClick}/>
            <CountButton by={10} onCountClickCallback={this.onCountClick}/>
            <h4>{this.state.cnt}</h4>
          </div>
        );
      }
      
      onCountClick = (by) => {
        this.setState(function(state,props){
          return {cnt : state.cnt + by};
        });
      };
}

class CountButton extends Component{
    constructor(props){
        super(props);
        //console.log(props)
    }
    
    render(){
        return(
            <div>
            <button type="button" className="btn btn-success" onClick=
                {
                 () => this.props.onCountClickCallback(this.props.by)
                }
                >+{this.props.by}</button>
            </div>
        );
    }
}

CountButton.defaultProps = {
    by: 1
}

export default Counter