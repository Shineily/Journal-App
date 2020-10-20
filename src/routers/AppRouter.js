import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../action/auth';
import { useDispatch } from 'react-redux';
import { Ellipsis } from 'react-css-spinners';
import { PublicRouter } from './PublicRouter';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../action/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <div className='auth__login'>
        <Ellipsis color='#ffdf00' size={200} />
        <h1>Wait...</h1>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRouter
            path='/auth'
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path='/'
            component={JournalScreen}
            isAuthenticated={isLoggedIn}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
