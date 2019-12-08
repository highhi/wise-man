import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Home from './components/pages/Home/Home';
import Feeds from './components/pages/Feeds/Feeds';
import Navigation from './containers/NavigationList/NavigationList';

const App: React.FC = () => {

  return <Router>
    <Navigation />
    <Switch>
      <Route path="/feeds/:publisherId">
        <Feeds />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
}

export default App;
