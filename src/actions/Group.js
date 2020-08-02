import { GROUP }  from '../constants'
import FirebaseDAO from '../FirebaseDao'
import config  from '../config'
import { selectButton } from './Button'

const dao = new FirebaseDAO(config);

export function getArticle(articles, groupName, logoUrl) {
  if (articles) {
    let items = Object.keys(articles).map(key => articles[key]);
    
    console.log('getArticle', items);

    if (items && items.length > 0) {
      
      
      return {
        type: GROUP,
        articles: items.reverse(),
        groupName: groupName,
        logoUrl: logoUrl
      }
    }
  } else {
    return {
      type: GROUP,
      articles: null,
      groupName: groupName,
      logoUrl: logoUrl
    }
  }
}

export function getGroup(groupName, logoUrl) {
  return dispatch => {
    dao.listGroupArticle(groupName)
      .then(articles => {
        
        console.log('listGroupArticle', articles);

        dispatch(getArticle(articles, groupName, logoUrl))
      });
  }
}

export function groupSelect(groupName){
  return dispatch => {
    dao.getGroup(groupName).once('value', snapshot => {
      if(snapshot.val()) {
        const logoUrl = snapshot.val().logoUrl;
        dispatch(getGroup(groupName, logoUrl));
        dispatch(selectButton());
      }
    })
  }
}