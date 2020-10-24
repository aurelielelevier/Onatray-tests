import React from 'react'
import './App.less';
import {Button} from 'antd'
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ScreenHome from './components/Home/ScreenHome'

import SignUpRestauA from './components/Sign-Up/SignUpRestauA';
import SignUpRestauB from './components/Sign-Up/SignUpRestauB';
import SignUpRestauC from './components/Sign-Up/SignUpRestauC';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome}/>
          <Route path="/signInRestauA" component={SignUpRestauA}/>
          <Route path="/signInRestauB" component={SignUpRestauB}/>
          <Route path="/signInRestauC" component={SignUpRestauC}/>
        </Switch>
      </Router>
  );
}

export default App;
