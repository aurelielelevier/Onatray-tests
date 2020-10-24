import React from 'react'
import './App.less';
import {Button} from 'antd'
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ScreenHome from './components/Home/ScreenHome'

import SignInRestauA from './components/Sign-In/SignInRestauA';
import SignInRestauB from './components/Sign-In/SignInRestauB';
import SignInRestauC from './components/Sign-In/SignInRestauC';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome}/>
          <Route path="/signInRestauA" component={SignInRestauA}/>
          <Route path="/signInRestauB" component={SignInRestauB}/>
          <Route path="/signInRestauC" component={SignInRestauC}/>
        </Switch>
      </Router>
  );
}

export default App;
