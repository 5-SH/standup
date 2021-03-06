import firebase from 'firebase';
var firebaseui = require('firebaseui');

function _getUserKeyFromEmail(email) {
  return new Promise((resolve,reject) => {
    firebase.database().ref('/users').on('value', snapshot => {
      let users = snapshot.val();
      let hasUser = false;
      for (const key in users) {


        if(users[key].email === email) {
          hasUser = true;
          resolve({ key:key,...users[key] });
          break;
        }
      }
      
      if(!hasUser) reject();
    });
  });
}
function _validEntry(entry) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(entry).once('value', snapshot => {
      if (!snapshot.val()) resolve(false);
      else resolve(true);
    }, err => {
      reject(err);
    })
  });
}

export default class FirebaseDao {
  constructor(config) {
    if (firebase.apps && firebase.apps.length > 0){
      this.firebaseApp = firebase.apps[0];
    } else {
      this.firebaseApp = firebase.initializeApp(config);
    }
  }
  
  getFirebaseApp() {
    return this.firebaseApp;
  }

  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  
  checkGroupExists(groupName) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/groups').on('value', snapshot => {
        const groups = snapshot.val();
        let isReal = false;
        
        
        for (const key in groups){
          console.log('checkGroupExists 1', groups, groupName);
          if (groups[key].name === groupName) {
            isReal = true;
            
            console.log('checkGroupExists', key, groups[key]);
            
            resolve(groups[key]);
          }
        }
        if (!isReal) reject();
      });
    });
  }
  
  update(key, postData){
    return new Promise((resolve, reject) => {
      this.checkGroupExists(postData.groupName).then(group => {
        const groupKey = group ? group.key : undefined;
        const uid = this.currentUser.uid;
        const updates = {};
        postData.key = key;

        console.log('update', key);

        updates['/group-posts/' + groupKey + "/"+ key] = postData;
        updates['/user-posts/' + uid + "/" + key] = postData;
        const updateRes =  firebase.database().ref().update(updates);

        resolve(updateRes);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }
  
  remove(key) {
    return new Promise(resolve => {
      firebase.database().ref('/group-posts/').child(key).remove();
      firebase.database().ref('/user-posts/' + this.currentUser().email).child(key).remove();
      resolve(key);
    });
  }
  
  off() {
    return firebase.database().ref().off();
  }
  
  newKey() {
    return firebase.database().ref().child('posts').push().key;
  }
  /**
  * Promise를 호출하게 되면 이벤트가 등록된 부분이 사라지게 된다.
  */
  list(pagesize, callback) {
    // return new Promise(resolve=>{
      firebase.database().ref('posts')
              .orderByKey().limitToLast(pagesize)
              .on('value', articles => {
                console.log('articles', articles);
                callback(articles);
              })
    // });
  }
  
  getArticle(key) {
    return new Promise(resolve => {
      firebase.database().ref('/posts/'+key)
              .on('value', articles => {
                resolve(articles);
              })
    });
  }
  
  getUI() {
      return firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  }
  
  logout(){
    return firebase.auth().signOut();
  }
  
  get currentUser(){
    return firebase.auth().currentUser;
  }

  addUserTx(user) {
    _getUserKeyFromEmail(user.email).then(() => {
      //do nothing
    }).catch(()=> {
      return this.addUser(user);
    });
  }

  addUser(user){
    const update ={};
    update['/users/' + user.uid] = user;

    return firebase.database().ref().update(update);
  }

  addGroup(postData) {
    const owner = postData.owner;
    
    return new Promise((resolve, reject) => {
      _getUserKeyFromEmail(owner.email).then(user => {
        try {
          const key = firebase.database().ref().child('groups').push().key;
          postData.key=key;
          
          
          const update = {};
          update['/groups/' + postData.name] = postData;
          update['/users/' + user.key + "/groups/" + postData.name] = postData;
          
          firebase.database().ref().update(update);
          
          resolve(postData.name);
        } catch(e) {
          reject(e);
        }
      });
    });
  }

  isValidGroup(groupName){
    return new Promise((resolve, reject) => {
      _validEntry('/groups/'+ groupName).then(isValid => {
        resolve( isValid );
      }).catch(err => {
        reject(err) ;
      });
    });
  }

  listGroupArticle(group){
    return new Promise((resolve,reject) => {
      this.getGroup(group).once('value', snapshot => {
        const sn = snapshot.val();
        if (sn && sn.key) {
          firebase.database().ref('/group-posts/' + sn.key).on('value', snapshot => {
            resolve(snapshot.val());
          });
        } else {
          reject(new Error('no group'));
        }
      })
    });
  }

  get groupList(){
    return firebase.database().ref('/groups');
  }

  getGroup(name){
    return firebase.database().ref('/groups/'+name);
  }

}