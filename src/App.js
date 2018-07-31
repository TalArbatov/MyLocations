import React, { Component } from 'react';
import Counter from './components/Counter';
import {BrowserRouter, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Layout>
          <Route path='/counter' component={() => <Counter />}/>
          </Layout>
      </BrowserRouter>

      </div>
    );
  }
}

export default App;
