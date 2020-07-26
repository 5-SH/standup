import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor';
import FirebaseDao from './FirebaseDao'
import config from './config';
import Card from './Card'

class App extends Component {
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.state = {
      articles: []
    };
  }
  submit(article){
    if (article) {
      let key = this.dao.newKey();
      let updated = this.dao.update(key, article);
      
      updated.then(_ => {
        this.dao.list(25).once('value', dataSnapshots => {
          let items = [];
          dataSnapshots.forEach(dataSnapshot => {
            let item = dataSnapshot.val();
            item['key'] = dataSnapshot.key;
            items.push(item);
            
          });
          if (items && items.length > 0) {
            this.setState({
              articles: items.reverse()
            });
          }
        });
      })

      return updated;
    }
  }
  isAnonymous(){
    return true;
  }
  getArticles() {
    let lis = [];
    for (const article of this.state.articles) {
      lis.push(<li key={ article.key }>{ article.content }</li>);
    }
    return lis;
  }
  componentWillMount() {
    this.dao.list(25).once('value', dataSnapshots => {
      let items = [];
      dataSnapshots.forEach(dataSnapshot => {
        let item = dataSnapshot.val();
        item['key'] = dataSnapshot.key;
        items.push(item);
        
      });
      if (items && items.length > 0) {
        this.setState({
          articles: items.reverse()
        });
      }
    });
  }
  componentWillUnmount(){
    this.dao.off();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Editor submit={ this.submit } isAnonymous={ this.isAnonymous }/>
        <Card cardInfo={ this.cardInfo } />
      </div>
    );
  }
}

export default App;