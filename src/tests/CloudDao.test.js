import firebase from 'firebase';
import FirebaseDao from '../FirebaseDao';
import config from '../config';
import Article from '../Article';

const article1 = Article();
const dao = new FirebaseDao(config);
let keys = [];
var article2 = {};

// it('upload article', function() {
//   const inserted = dao.insert(article1);
//   const key = inserted.key;
  
//   dao.getArticle(key).on('value', (snapshot) => {
//     expect(snapshot.key).toEqual(key);
//   });
//   return inserted;
// })

it('list article', function() {
  dao.list(25).once('value', dataSnapshots => {
    dataSnapshots.forEach(dataSnapshot => {
      keys.push(dataSnapshot.key);
      const article = dataSnapshot.val();
      expect(article.user).toEqual("Genji");
    })
  });
});

it('upload article and edit and delete', function() {
  let key = dao.newKey();
  const updated = dao.update(key, article1);
  dao.getArticle(key).on('value', snapshot => {
    expect(snapshot.key).toEqual(key);
    // dao.update(key, article2);
    dao.remove(key);
  })
   return updated;
});