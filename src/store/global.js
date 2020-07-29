import { createStore, combineReducers, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
// 비동기 콜백을 redux에서 처리하는 middleware
import thunk from 'redux-thunk';
import * as articleReducers from '../reducers/Article'

// reducer들을 조합해 줍니다. 
// 기본적으로 routerReducer는 router 에서 사용되는 상태들을 가지고 옵니다.
// 우리가 관리할 reducer는 아래에 추가 됩니다
const reducer = combineReducers({
  ...articleReducers,
  routing: routerReducer
})
//DevTools의 Jsx
//스토어를 만드는데,reducer 와 middleware를 변수로 받아서 처리합니다.
export const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
//결국 store 객체를 browserHistory와 엮어서 만들어 줍니다.
// export const history = syncHistoryWithStore(browserHistory, store)