/**
 * 1. Lexical Scope
 * JS 는 lexical scope 를 사용한다.
 * lexical scope 는 변수나 함수가 정의된 곳의 context 를 사용한다.
 * JS 는 funtion 만이 자신의 scope 를 가지는 Function Scope 를 사용한다.
 * 
 * Dynamic Scope 는 변수나 함수가 불려진 곳의 context 를 사용한다.
 */
function foo1() { 
  var x = 1;
  console.log(x); // 1
  if(true) {
    var x = 2;
    console.log(x); // 2
  }
  console.log(x); // 2
}
 
foo1();

// 새로운 scope 를 생성하고 싶으면 필요한 곳에 function 을 추가한다.
function foo2() {
  var x = 1;
  if (true) {
    (function () {
      var x = 2;
      console.log(x); // 2
    })();
  }
  console.log(x); // 1
}
 
foo2();

///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 2. 화살표 함수와 일반 함수에서 다르게 동작하는 this
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98
 */
function Person1() {
  // Person() 생성자는 `this`를 자신의 인스턴스로 정의.
  this.age = 0;

  // setInterval 은 전역에서 실행 됨
  setInterval(function growUp() {
    // 비엄격 모드에서, growUp() 함수는 `this`를
    // 전역 객체로 정의하고, 이는 Person() 생성자에
    // 정의된 `this`와 다름.
    console.log(this.age++);
  }, 1000);
  
  // arrow function 은 클로저 처럼 접근해서 this 를 사용
  // setInterval(() => {
  //   console.log(this.age++);
  // }, 1000);
}

function Person2() {
  const that = this;  
  that.age = 0;

  setInterval(function growUp() {
    // 콜백은  `that` 변수를 참조하고 이것은 값이 기대한 객체이다.
    console.log(that.age++);
  }, 1000);
}

// const p1 = new Person1();
// const p2 = new Person2();

///////////////////////////////////////////////////////////////////////////////////////////////

 /**
  * 3. prototype 을 작성할 때는 일반함수로 작성한다.
  */
class Test1 {

  constructor() {
    this.state = 1
  }

  f1(data) {
    console.log('Test1_f1_1', this.state);
    this.state = data;
    console.log('Test1_f1_2', this.state);
    this.f2(data + 100);
  }
  
  f2(data) {
    this.state = data;
    console.log('Test1_f2_1', this.state);
  }
  
}

function Test2() {
  this.state = 2;
}

/**
 * prototype 을 작성할 때는 일반함수로 작성한다.
 * 화살표 함수는 prototype 프로퍼티를 가지지 않기 때문에 
 * prototype 작성에 사용할 수 없다.
 */
// Test2.prototype.f1 = data => {
//   console.log('Test2_f1_1', this.state);
//   this.state = data;
//   console.log('Test2_f1_2', this.state);
//   this.f2(data + 100);
// }
Test2.prototype.f1 = function (data) {
  console.log('Test2_f1_1', this.state);
  this.state = data;
  console.log('Test2_f1_2', this.state);
  this.f2(data + 100);
}

Test2.prototype.f2 = data => {
  this.state = data;
  console.log('Test2_f2_1', this.state);
}

// const t1 = new Test1();
// t1.f1(11);

const t2 = new Test2();
t2.f1(22);



// 기존 JS(일반 함수) 에서 this 는 Dynamic Scoping 된다.
// https://hanjungv.github.io/2018-02-03-1_JS_arrow_function/
function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  return arr.map(function (x) {
    // prefixArray 함수를 호출하는 곳의 this 를 가져온다.
    // this: Window 객체
    console.log('this', this, this.prefix);
    return this.prefix + ' ' + x;;
  }
  // this: Prefixer 생성자 함수의 인스턴스
  .bind(this)
  ); 
};

var pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));

