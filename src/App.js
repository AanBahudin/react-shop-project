import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {About, Home, ErrorPage, Cart, Checkout, Private, Products, SingleProduct, AuthWrapper} from './pages';

function App() {
  return (
    <AuthWrapper>

      <Router>
        <Navbar />
        <Sidebar />

        <Switch>
          <Route  path='/' exact component={Home}/>
          <Route path='/about' component={About} />
          <Route path='/cart' component={Cart} />
          <Private exact path='/checkout'> <Checkout /> </Private>
          <Route path='/products' component={Products}/>
          <Route path='/product/:id' children={<SingleProduct />}/>
          <Route path='*' component={ErrorPage} />
        </Switch>

        <Footer />
      </Router>

    </AuthWrapper>
  )
}

export default App
