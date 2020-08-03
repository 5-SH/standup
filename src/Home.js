import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './img/stand_up_logo.png';
import './Home.css';
import Buttons from './Buttons';
import CardList from './CardList'


class Home extends Component {
  constructor(){
    super();
  }
  
  render() {
    // const groupName = 'test_group';
    const groupName = this.props.groupName || null;
    console.log('group name', groupName);

    // const headerClass = 'app-header';
    // const headerStyle = {
    //   backgroundImage: 'url(' +logo+ ')'
    // }
    return (
          
      <div className="app">
        <div className="app-header" 
          style={ { backgroundImage: 'url(' +logo+ ')', height: '45px' } } />     
        <Buttons groupName={ groupName } />
        {/* <Editor submit={ this.submit }/> */}
        <CardList cardInfo={ this.cardInfo } />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps ) => {
  return {...state.default, ...ownProps}
}

export default connect(mapStateToProps)(Home);