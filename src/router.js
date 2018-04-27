
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './routes/Home/Home.js';
import ProductsLanding from './routes/Products/ProductsLanding.js';
import AdminLanding from './routes/Admin/AdminLanding.js';
import CartLanding from './routes/Cart/CartLanding.js';
// import LoginLanding from './routes/Login/LoginLanding.js';


export default (
    <Switch>
        
        <Route component={ ProductsLanding } path='/' exact />
        <Route component={ ProductsLanding } path='/products' exact />
        <Route component={ AdminLanding } path='/admin' exact />
        <Route component={ CartLanding } path='/cart' exact />
        {/*<Route component={ LoginLanding } path='/login' exact />*/}

    </Switch>
)
