import React from "react";
import { Route, Switch } from 'react-router-dom';

import About from './components/About';
import Error from './components/Error';
import Home from './components/Home';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/about' component={About} />
        <Route component={Error} />
      </Switch>
    </div>
  );
}
