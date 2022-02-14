import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-y28ntlqm.us.auth0.com
// HgZX0KX0s-aZhXzI7LVhtdU2oV83isbZ7Wnph0YTkzriKNp3s9FtpyCx7Vi55snf

ReactDOM.render(

    <Auth0Provider
    domain= {process.env.REACT_APP_DOMAIN_AUTH}
    clientId= {process.env.REACT_APP_CLIENTID_AUTH}
    cacheLocation= 'localstorage'
    redirectUri={window.location.origin}>

    <UserProvider>
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </ProductsProvider>
    </UserProvider>
    
    </Auth0Provider>
    
    ,document.getElementById('root')
)
