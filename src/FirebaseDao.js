/* global firebaseui, firebase */

export default class FirebaseDao {
  constructor(config) {
    firebase.initializeApp(config);
  }
  insert(postData) {
    return firebase.database().ref().child('posts').push(postData);
  }
  update(key, postData) {
    let updates = {};
    
    
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    
    console.log('updates', updates);
    
    return firebase.database().ref().update(updates);
  }
  remove(key) {
    firebase.database().ref('/posts/').child(key).remove();
    return firebase.database().ref('/user-posts/genji/').child(key).remove();
  }
  off() {
    return firebase.database().ref().off();
  }
  newKey() {
    return firebase.database().ref().child('posts').push().key;
  }
  list(pageSize) {
    return firebase.database().ref('/posts/').orderByKey().limitToLast(pageSize);
  }
  getArticle(key) {
    return firebase.database().ref('/posts/' + key);
  }
  getUI() {
    return new firebaseui.auth.AuthUI(firebase.auth());
  }
}