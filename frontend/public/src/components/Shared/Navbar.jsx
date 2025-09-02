import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100vw; /* Force full viewport width */
  max-width: 100%; /* Prevent overflow */
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(90deg, #1a1a2e 0%, #16213e 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;


const Logo = styled(NavLink)`
  color: #ffffff;
  font-size: 1.7rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: #e0e0e0;
  text-decoration: none;
  font-size: 1.1rem;
  font-family: 'Arial', sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: #e0e0e0;
  border: none;
  font-size: 1.1rem;
  font-family: 'Arial', sans-serif;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Nav>
      <Logo to="/">UrbanNest</Logo>
      <NavLinks>
        <StyledNavLink to="/" end>Home</StyledNavLink>
        <StyledNavLink to="/shop">Shop</StyledNavLink>
        <StyledNavLink to="/cart">Cart</StyledNavLink>
        <StyledNavLink to="/about">About</StyledNavLink>

        {token ? (
          <>
            {user?.roleId === 1 && (
              <StyledNavLink to="/admin/products">Admin</StyledNavLink>
            )}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <StyledNavLink to="/login">Login</StyledNavLink>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
