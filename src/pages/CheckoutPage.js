import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {

  const { cart } = useCartContext();

  if(cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products' className='btn'> fill it </Link>
        </div>
      </Wrapper>
    )
  }


  return (
    <main>
      <PageHero title="checkout"/>
      <Wrapper className='page'>
        <StripeCheckout/>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }`
export default CheckoutPage
