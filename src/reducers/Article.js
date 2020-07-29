/*global firebaseui,firebase*/
import {USER, GROUP} from '../constants'

export default function getArticles(state, action){

  console.log('dispatch getArticles', state, action.type);

  if(action.type === USER){
    let articles_of_mine = [];
    let cUser = firebase.auth().currentUser;
    state.articles.forEach((article) => {
      if( article.user.uid && cUser && (article.user.uid ===  cUser.uid)){
        articles_of_mine.push(article);
      }
    });
    return Object.assign({}, state, { articles: articles_of_mine });
  }
  else if(action.type === GROUP){
    //some code would be here
    return Object.assign({},state,action);
  }
  return Object.assign({},state,action);
}