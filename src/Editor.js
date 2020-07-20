import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.state = {
      embedlyUrl: undefined,
      content: undefined
    }
  }
  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous}/>
        <div className="textEditor">
          <div className="innerEdit" contentEditable="true" placeholder="글쓰기..."></div>
        </div>
        <div className="actionBar">
          <button className="upload" onClick={this.props.handleSubmit}>
            <span>스탠드업!</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Editor;