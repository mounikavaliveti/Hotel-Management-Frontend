import React, { Component, useState, setState, useEffect } from "react";
import {HashRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom';
import './App.css';
import Navbar  from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import StaffList from './components/StaffList';
import StaffEdit from './components/StaffEdit';
import InventoryList from './components/InventoryList';
import InventoryEdit from './components/InventoryEdit';


function App() {

  const [cred, setCred] = useState({ 
    login: false, role: ''
  });

  const setAuth=(login,role)=>{
    setCred({ 
      login: login, role: role
    });
    console.log(" app"+role);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar cred={cred} setCred={setAuth} />
        <Switch>
        <Route path='/signIn' component={()=>(<SignIn setCred={setAuth}/>)} />
        <Route path='/signup' component={Signup} />
        <Route path='/inventory/new' component={InventoryEdit} />
        <Route path='/inventory/:id' component={InventoryEdit} />
        <Route path='/inventory' component={InventoryList} />
        <Route path='/staff/new' component={StaffEdit} />
        <Route path='/staff/:id' component={StaffEdit} />
        <Route path='/staff' component={StaffList} />
        <Route path='/' component={Home} />
          
        </Switch>
       
      </BrowserRouter>
    </>
  );
}

export default App;
