import React from "react";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav className="navbar">
      <img src="images/logo.jpg" alt="logo" />
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

  img {
    position: absolute;
    width: 160px;
    height: 69px;
    left: 67px;
    top: 6px;
  }
`;

export default Navbar;
