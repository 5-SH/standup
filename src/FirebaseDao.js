import firebase from 'firebase';

export default class FirebaseDao {
  constructor(config) {
    firebase.initializeApp(config);
  }
  insert(postData) {
    return firebase.database().ref().child('posts').push(postData);
  }
  getArticle(key) {
    return firebase.database().ref('posts' + key);
  }
}