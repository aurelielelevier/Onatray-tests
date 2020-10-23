import React from 'react'
import './App.less';
import {Button} from 'antd'
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import RegisterRestaurantStepOne from './components/RegisterRestaurantOne'

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome}/>
          <Route path="/registerRestaurantStepOne" component={RegisterRestaurantStepOne}/>
        </Switch>
      </Router>
  );
}

export default App;
