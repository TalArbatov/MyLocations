import React, { Component } from "react";
import Counter from "./components/Counter";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Category from "./containers/Category/Category";
import Location from "./containers/Location/Location";

class App extends Component {
  // state = {
  //   page: ''
  // }

  render() {
    return (
      <div>
        <BrowserRouter>
          
          <Layout>
            <Route path="/counter" component={() => <Counter />} />
            <Route exact path="/category" component={() => <Category />} />
            <Route exact path="/location" component={() => <Location />} />
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
