import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from "./Editor";
import GroupList from './GroupList';
import Profile from './Profile';
import { selectButton } from './actions/Button';
import './Buttons.css';

class Buttons extends Component {
  constructor() {
    super();
  }
  
  selectButton(args) {
    const { dispatch } = this.props;
    dispatch(selectButton(args));
  }
  
  renderActionBar(selected) {
    switch(selected) {
      case 'groups':
        return <GroupList />
      case 'edit':
        return <Editor submit={ this.submit } />
      default: 
        return null;
    }
  }
  render() {
    const { 
      logoUrl, 
      groupName, 
      selectedButton, 
      defaultStyle, 
      groupStyle, 
      editStyle 
    } = this.props;

    return (
      <div>
        <div className="buttons">
          <Profile/>
          <a onClick={ () => this.selectButton('edit') }>
            <i className="fa fa-pencil-square fa-lg" style={ editStyle }></i>
          </a>
          <a onClick={ () => this.selectButton('groups') }>
            <i className="fa fa-handshake-o fa-lg" style={ groupStyle }></i>
          </a>
          <a onClick={ () => this.selectButton() }>
            <i className="fa fa-window-minimize fa-lg" style={ defaultStyle }></i>
          </a>
        </div>
        {this.renderActionBar(selectedButton)}
        { groupName && !selectedButton &&
          <div style={ { width: '100%', height: "355px", position: 'relative' } }>
            <img src={ logoUrl } alt={ groupName } style={ { width:'100%', height: "355px" } }/>
            <div className="style_title" style={ { width:"100%" } }>{ groupName }</div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps ) => {
  return {...state.default, ...ownProps}
}

export default connect(mapStateToProps)(Buttons);