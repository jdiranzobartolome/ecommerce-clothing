import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './pages/homepage/homepage.style.scss';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => {
  return(
    <div>
    <h1>HATS PAGE</h1>
  </div>
  )
  
}

function App() {
  return (
    <Switch>
      <Route exact path='/'component={HomePage} />
      <Route  path='/shop/hats'component={HatsPage} />

    </Switch>
  );
}

export default App;
