import React from 'react';
import styled from 'styled-components';

function Navbar() {

  return (
    <>
      <Nav className='navbar'>
        <img src='' alt='graviti' />
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  background: #ffffff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`

export default Navbar;