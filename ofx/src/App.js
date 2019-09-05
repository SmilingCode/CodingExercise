import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QuoteForm from './components/QuoteForm';
import QuoteShow from './components/QuoteShow';

function App() {
  return (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={QuoteForm} />
                <Route path="/show" component={QuoteShow} />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
