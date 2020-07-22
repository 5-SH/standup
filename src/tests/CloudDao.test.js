import firebase from 'firebase';
import FirebaseDao from '../FirebaseDao';
import config from '../config';
import Article from '../Article';

const article1 = Article();
const dao = new FirebaseDao(config);

it('upload article', function() {
  const inserted = dao.insert(article1);
  const key = inserted.key;
  
  dao.getArticle(key).on('value', (snapShot) => {
    expect(snapShot.key).toEqual(key);
  });
  return inserted;
})