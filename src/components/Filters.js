import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {

  const { updateFilters, clearFilters, all_products, categories:{text, category, price, max_price, min_price, shipping, color, company} } = useFilterContext();

  const colour = getUniqueValues(all_products, 'colors')
  const companies = getUniqueValues(all_products, 'company')
  const categoryi = getUniqueValues(all_products, 'category')

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input type='text' name='text' className='search-input' placeholder='search' value={text} onChange={updateFilters} />
          </div>

          <div className='form-control'>
            <h5>Category</h5>
            <div>
              {categoryi.map((element, index) => {
                return (
                  <button className={`${category === element.toLowerCase() ? 'active' : null}`} key={index} name='category' type='button' onClick={updateFilters}>{element}</button>
                )
              })}
            </div>
          </div>

          <div className='form-control'>
            <h5>Company</h5>
              <select className='company' name='company' value={company} onChange={updateFilters}>
                {companies.map((element, index) => {
                  return (
                    <option key={index} className={`${company === element.toLowerCase() ? 'active' : null}`}> {element} </option>
                  )
                })}
              </select>
          </div>

          <div className='form-control'>
            <h5>colors</h5>
            <div className="colors">
              {colour.map((element, index) => {
                if(element === 'all') {
                  return (
                    <button 
                    name='color' 
                    data-color='all' 
                    onClick={updateFilters} 
                    className={`${color === element ? 'all-btn active' :'all-btn'}`}> All </button>
                  )
                }

                return (
                  <button 
                  key={index}
                  name='color' 
                  data-color={element} 
                  onClick={updateFilters} 
                  className={`${color === element ? 'active color-btn' : 'color-btn'}`} 
                  style={{background: element}}
                  > {color === element ? <FaCheck /> : null} </button>
                )
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input type="range" name="price" value={price} onChange={updateFilters} max={max_price} min={min_price}/>
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>  
            <input className='btn' type="checkbox" name="shipping" onChange={updateFilters} checked={shipping}/>
          </div>

          <div className="form-control">
              <button type='button' className='clear-btn' onClick={clearFilters}>Clear filters</button>
          </div>

        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
