import React, { Component } from 'react';
import './Editor.css';
import Profile from './Profile';
import getEmbedly from './Embedly';
import Card from './Card';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.getCard = this.getCard.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.getForcedState = this.getForcedState.bind(this);
    this.state = {
      embedlyUrl: undefined,
      content: undefined
    };
  }
  getForcedState(embedlyUrl, content) {
    return new Promise(resolve => {
      if (embedlyUrl) {
        getEmbedly(embedlyUrl).then(response => {
          let cardInfo = Object.assign({}, response.data);

          resolve({
            embedlyUrl,
            content,
            cardInfo
          });
        }).catch(e => {
          resolve({
            embedlyUrl: undefined,
            content: undefined,
            cardInfo: undefined
          });
        });
      } 
      else {
        resolve({
          content: content
        })
      }
    })
  }
  handleSubmit(event){
    if (this.hasValue(this.state.content)) {
      event.preventDefault();
      this.props.submit(this.getArticle());
      this.setState({
        embedlyUrl : undefined,
        content : undefined,
        cardInfo : undefined
      });
    }

  }
  onPaste(event) {
    const content = event.currentTarget.textContent;
    event.clipboardData.items[0].getAsString(text => {
      const checkText = this.detectURL(text);
      if (checkText) {
        this.getForcedState(checkText, content + text).then(obj => {
          this.setState(obj)
        })
      }
    })
  }
  editorChange(event) {
    let checkText = this.detectURL(event.currentTarget.textContent);

    if (!this.state.embedlyUrl && (event.keyCode === 32 
      || event.keyCode === 13) && checkText) {
        
      this.getForcedState(checkText, event.currentTarget.textContent)
        .then(obj => this.setState(obj))
    } 
    // else {
    //   this.getForcedState(undefined, event.currentTarget.textContent)
    //     .then(obj => this.setState(obj))
    // }
  }
  getArticle(){
    const article = {};
    const user = firebase.auth().currentUser;

    // console.log('user', user);
    article.user = {
        email : user.email,
        displayName : user.displayName,
        uid : user.uid
    };
    article.content = this.state.content;
    if (this.state.embedlyUrl) {
      article.cardInfo = this.state.cardInfo;
    }

    return article;
  }
  detectURL(text) {
    const urls = text.match(/(https?:\/\/[^\s]+)/g) || text.match(/(www.[^\s]+)/g);
    if((urls !== null) && (urls.length > 0)) return urls[0];
    else return undefined;
  }
  getCard(embedlyUrl){
    if(embedlyUrl){
      return(
        <div>{embedlyUrl}</div>
      );
    }else{
      return(<div/>);
    }
  }
  hasValue(value) {
    if((value && (typeof value) === "string"))
      return (!value) ? false : (value.trim() === "" ? false : true)
    else 
      return false;
  }
  render() {
    return (
      <div className="wrapEditor">
        <div className="editor_header">
          <div className="today_title">
            무엇을 공유할까요?
          </div>
          <Profile/>
        </div>
        <div className="textEditor">
          <div className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}
            dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            <Card cardInfo={this.state.cardInfo}/>
        </div>
        <div className="actionBar">
          <button className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}><span>스탠드업!</span></button>
        </div>
      </div>

    )
  }
}

export default Editor;