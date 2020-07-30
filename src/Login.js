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
  }

  componentDidMount() {
    const uiConfig = {
      'signInSuccessUrl': window.location.origin + '/standup',
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