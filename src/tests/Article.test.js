import Article from './Article';

var article1 = Article();

it('Object assign', function(){
  var article2 = Object.assign({},article1);
  article2.user = "Genji";
  article2.content = "다음";
  article2.urls[0].url = "http://www.daum.net";
  
  expect(article1.urls[0].imgWidth).toEqual(article2.urls[0].imgWidth);
})