import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import 'features/suggestion/style/style.scss'
//리덕스와 미들웨어 적용을 위해 필요한 모듈 불러오기
import {createStore, applyMiddleware} from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
//rootSaga 하나로 묶기 
import { all, fork } from "redux-saga/effects";
import { watchExist, watchJoin, watchLogin, watchModify, watchRemove } from "features/user/module/userSaga";
import { watchCreate, watchHistoryAutoAdd, watchHistoryList, watchHistoryModify, watchHistoryRemove, watchHistoryRemoveFromTodo } from 'features/history/module/historySaga';
import { rootReducer } from 'app/store';
import { watchFlowerList, watchRoutine } from 'features/review/module/gardenSaga';
import { watchDiaryCreate, watchDiaryFind, watchDiaryMemo } from 'features/diary/module/diarySaga';
import { watchChat } from 'features/chatbot/module/chatSaga';
import { wacthAccept, wacthReject, wacthSuggestion } from 'features/suggestion/module/suggestionSaga';
import { watchAddTask, watchDeleteTask, watchTaskComplete, wathchTaskList } from 'features/todo/module/taskSaga';
import { watchAddEvent, watchDeleteEvent, watchEventList } from 'features/calendar/module/calendarSaga';

// rootSaga를 만들어줘서 store에 추가해주어야 합니다.
export default function* rootSaga() {
  // alert('# 0 root saga')
  yield all([fork(watchLogin),fork(watchJoin),fork(watchExist),fork(watchModify),fork(watchCreate),fork(watchRemove),
    fork(watchHistoryList), fork(watchHistoryModify), fork(watchHistoryAutoAdd), fork(watchHistoryRemove), fork(watchHistoryRemoveFromTodo),
    fork(watchFlowerList), fork(watchRoutine),
    fork(watchDiaryFind), fork(watchDiaryMemo), fork(watchDiaryCreate),
    fork(watchChat),
    fork(wacthSuggestion), fork(wacthAccept), fork(wacthReject),
    fork(wathchTaskList), fork(watchTaskComplete), fork(watchAddTask), fork(watchDeleteTask),
    fork(watchEventList), fork(watchAddEvent), fork(watchDeleteEvent)
  ]);
}

//주의//
sagaMiddleware.run(rootSaga)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();