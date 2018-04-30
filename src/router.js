
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsLanding from './routes/Products/ProductsLanding.js';
import Support from './routes/Support/Support.js';
import About from './routes/About/About.js';
import AdminLanding from './routes/Admin/AdminLanding.js';
import CartLanding from './routes/Cart/CartLanding.js';
import Checkout from './routes/Checkout/Checkout.js';
import UnderConstruction from './routes/UnderConstruction/UnderConstruction.jsx';

export default (
    <Switch>
        
        <Route component={ ProductsLanding } path='/' exact />
        <Route component={ Support } path='/support' exact />
        <Route component={ About } path='/about' exact />
        <Route component={ AdminLanding } path='/admin' exact />
        <Route component={ CartLanding } path='/cart' exact />
        <Route component={ Checkout } path='/checkout' exact />
        <Route component={ UnderConstruction }path='/community' exact />
        <Route component={ UnderConstruction } path='/terms' exact />
        <Route component={ UnderConstruction } path='/signup' exact />
        <Route component={ ProductsLanding } />

    </Switch>
)
