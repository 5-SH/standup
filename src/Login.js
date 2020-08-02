import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import FirebaseDao from './FirebaseDao';
import config from './config';
import { connect } from 'react-redux';

class Login extends Component {
  constructor (props) {
    super(props);
    this.ui = (new FirebaseDao(config)).getUI();
    this.dao = new FirebaseDao(config);
  }

  componentDidMount() {
    const uiConfig = {
      callbacks: {
        'signInSuccess': (currentUser)=> {
          this.dao.addUserTx({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid
          });
          
          return true;
        }
      },
      'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    };

    this.ui.start('#firebaseui-auth', uiConfig);
  }
  componentWillUnmount() {
    this.ui.reset();
  }
  render() {
    return (
        <div id='firebaseui-auth'></div>
    );
  }
};

// function mapStateToProps(state, ownProps) {
//   console.log(ownProps);

//   return {
//     id: ownProps.params.id,
//     filter: ownProps.location.query.filter
//   };
// }

// export default connect(mapStateToProps)(Login);
export default Login;