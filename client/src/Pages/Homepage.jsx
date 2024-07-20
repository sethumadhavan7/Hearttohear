import React from 'react'
import {Link} from 'react-router-dom'
import mental from '../img/mental.png'
import happy from '../img/happy.png'
import alone from '../img/alone.png'
import styled from 'styled-components'
const Homepage = () => {
  return (
  <Container>
  <nav>
    <button>
     <Link to="/login"  style={{ color: 'inherit', textDecoration: 'inherit'}} > LogIn </Link>  
        </button>
    <button>
    <Link to="/register" style={{ color: 'inherit', textDecoration: 'inherit'}}>  Register</Link>
      </button>
  </nav>
  <div className="div1">
    <h2>Why face it alone?<br/>Connect,<br/>share,<br/>heal.</h2>
    <img src={mental} alt="hii" />
  </div>

  <div className="div1">
  <img src={alone} alt="hii" />
    <h2>Why face it alone?<br/>Connect,<br/>share,<br/>heal.</h2>
  </div>

  <div className="div1">
 
    <h2>Why face it alone?<br/>Connect,<br/>share,<br/>heal.</h2>
    <img src={happy} alt="hii" />
  </div>

  </Container>
  )
}

const Container = styled.div`

.div1{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
    h2{
        margin-left: 2.5rem;
    }
    img{
        width: 70%;
        height: auto;
    }
}
nav{
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    button{
        margin: 5px;
        padding: 6px;
        border: none;
        border-radius: 7px;
        background-color: green;
        font-weight: 500;
        color: white;
    }
}
    

`

export default Homepage