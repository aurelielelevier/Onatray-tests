import React from 'react'
import './App.less';
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import ScreenHome from './components/Home/ScreenHome';
import SignInScreen from './components/SignInScreen'

import SignUpRestauA from './components/Sign-Up/SignUpRestauA';
import SignUpRestauB from './components/Sign-Up/SignUpRestauB';
import SignUpRestauC from './components/Sign-Up/SignUpRestauC';

import SignUpTalentA from './components/Sign-Up/SignUpTalentA';
import SignUpTalentB from './components/Sign-Up/SignUpTalentB';
import SignUpTalentC from './components/Sign-Up/SignUpTalentC';
import SignUpTalentD from './components/Sign-Up/SignUpTalentD'

import MessageRoom from './components/Messaging/MessageRoom'
import MessagerieListe from './components/Messaging/MessagerieListe';

import ListeRestaurants from './components/Talents/ListeRestaurants';

import Test from './components/Test';
import Recherchetalent from './components/Recherchetalent';
import RestaurantsFavoris from './components/Talents/RestaurantsFavoris';

import MonProfilRestaurant from './components/Restaurants/MonProfilRestaurant';
import MonProfilTalentt from './components/Talents/MonProfilTalent';

import token from './reducers/token'
import isConnect from './reducers/connect';
import restoaafficher from './reducers/restoaafficher';
import adresse from './reducers/adresse';
import zone from './reducers/zone';
import profil from './reducers/profil';

import ChatroomId from './reducers/chatRoomId'
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import WishlistRestaurants from './components/wishlistRestaurants';

const store = createStore(combineReducers({token, isConnect, restoaafficher, adresse, zone, profil, ChatroomId}));

export default function App() {
  return (
     <Provider
     store={store}
    >
      <Router>
          <Switch>
            <Route path="/" exact component={ScreenHome}/>
            <Route path="/signUpRestauA"  component={SignUpRestauA}/>
            <Route path="/signUpRestauB"  component={SignUpRestauB}/>
            <Route path="/signUpRestauC" component={SignUpRestauC}/>
            <Route path="/signUpTalentA" component={SignUpTalentA}/>
            <Route path="/getTalentInfo" component={SignUpTalentB}/>
            <Route path="/signUpTalentC" component={SignUpTalentC}/>
            <Route path="/signUpTalentD" component={SignUpTalentD}/>
            <Route path="/restaurants" component={ListeRestaurants}/>
            <Route path="/restaurants-favoris" component={RestaurantsFavoris}/>
            <Route path="/messagerie" component={MessagerieListe}/>
            <Route path="/recherchetalent" component={Recherchetalent}/>
            <Route path="/wishlistRestaurant" component={WishlistRestaurants}/>
            <Route path='/test' component={Test}/>
            <Route path='/messageRoom' component={MessageRoom}/>
            <Route path='/signIn' component={SignInScreen}/>
            <Route path='/restaurant-mon-profil' component={MonProfilRestaurant}/>
            <Route path='/talent-mon-profil' component={MonProfilTalentt}/>
          </Switch>
        </Router>
       </Provider>
  );
}


