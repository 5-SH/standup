import { USER, GROUP,ALL } from '../constants'
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import FirebaseDao from '../FirebaseDao'
import config from '../config'
const dao = new FirebaseDao(config);
export function userArticles() {
  return {
    type: USER
  }
}
/*
* 여기부터
*/
export function getArticles(articles) {
  const items = [];
  articles.forEach((article) => {
    const item = article.val();
    item['key'] = article.key;
    items.push(item);
  });
  
  console.log('action getArticles', items);

  if (items && items.length > 0){
    return {
      type : ALL,
      articles : items.reverse()
    }
  }
}

export function loadArticles() {
  
  console.log('action loadArticles');
  
  return (dispatch) => {
    dao.list(25, (articles) => dispatch(getArticles(articles)));
  };
}
export function updateArticle(postData){
  return (dispatch) => {
    dao.update(dao.newKey(), postData);
  };
}
export function groupArticles(articles) {
  return {
    type: GROUP,
    articles: articles
  }
}