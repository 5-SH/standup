import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/stand_up_logo.png';
import './Home.css';
import Editor from './Editor';
import CardList from './CardList'

class Home extends Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
  }
  submit(article){
    if (article) {
      const { dispatch } = this.props;
      dispatch(updateArticle(article));
      this.forceUpdate();
    }
  }
  render() {
    return (    
      <div className="App">
        <div className="App-header">
          <Link to="/standup">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <Editor submit={ this.submit }/>
        <CardList cardInfo={ this.cardInfo } />
      </div>
    );
  }
}

export default Home;