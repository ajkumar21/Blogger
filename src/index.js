import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

// compose used to connect Firebase and Firestore to project.
// import redux-firestore and react-redux-firestore to do this
// then pass config file into these functions using compose

const middleware = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(fbConfig),
  reactReduxFirebase(fbConfig, {
    attachAuthIsReady: true,

    // add profile to firebase for each user, details found in firestore with collection called 'users'
    useFirestoreForProfile: true,
    userProfile: 'users'
  })
);

const store = createStore(rootReducer, middleware);

// within reactReduxFirebase have a config object with attachAuthIsReady
// and then use store.firebaseAuthIsReady, which waits for auth to be initialised
// before rendering the page. Thus prevents the login/logout flicker when refreshing page
// Only renders page once it knows auth status. not before, which causes the flicker
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
