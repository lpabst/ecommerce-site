
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsLanding from './routes/Products/ProductsLanding.js';
import AdminLanding from './routes/Admin/AdminLanding.js';
import CartLanding from './routes/Cart/CartLanding.js';
import UnderConstruction from './routes/UnderConstruction/UnderConstruction.jsx';


export default (
    <Switch>
        
        <Route component={ ProductsLanding } path='/' exact />
        <Route component={ ProductsLanding } path='/products' exact />
        <Route component={ AdminLanding } path='/admin' exact />
        <Route component={ CartLanding } path='/cart' exact />
        <Route component={ UnderConstruction } path='/community' exact />
        <Route component={ UnderConstruction } path='/support' exact />
        <Route component={ UnderConstruction } path='/about' exact />
        <Route component={ UnderConstruction } path='/terms' exact />

    </Switch>
)
