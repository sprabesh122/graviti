import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav className="navbar">
      <div>
        <img src=".././images/logo.png" alt="logo" />
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  background: #ffffff;
  height: 80px;
  display: flex;
  justify-content: left;
  padding-left: 67px;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export default Navbar;
