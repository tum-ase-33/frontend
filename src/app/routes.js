import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import UserList from './components/users/UserList';
import LessonList from './components/lessons/LessonList';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';

import requireAuth from './components/hoc/RequireAuth';
import requireNotAuth from './components/hoc/RequireNotAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireNotAuth(Signup)} />
    <Route path="signin" component={requireNotAuth(Signin)} />
    <Route path="signup" component={requireNotAuth(Signup)} />
    <Route path="signout" component={Signout} />
    <Route path="lessons" component={requireAuth(LessonList)} />
    <Route path="users" component={requireAuth(UserList)} />
  </Route>
)
