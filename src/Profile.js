import React, { Component } from 'react';
import firebase from 'firebase';
import './Profile.css';
import PopCard from './PopCard';
import { Link } from 'react-router-dom';
import Login from './Login';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: undefined,
      isPop: false
    }
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: undefined });
      }
    })
  }
  popProfile() {
    this.setState({ isPop: !this.state.isPop })
  }
  
  render() {
    const user = this.state.user;
    if (user) {
      return (
        <span>
          <div className="profile-img-wrap">
            <a href="#" onClick={ (e) => this.popProfile(e) }>
              <img src={ user.photoURL } alt="profiles" className="profile-img"/>
            </a>
          </div>
          
          <PopCard isPop={ this.state.isPop }/>
        </span>
      )
    } else {
      return (<div className="profile_name"><Login /></div>)
    }
  }
  
}
export default Profile;