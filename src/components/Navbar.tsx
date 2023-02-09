import React from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar = ({className}: NavbarProps) => {
  return (
    <div className={className}>
      <div>
        <a className="navbar-link" href="#">Home</a>
        <a className="navbar-link" href="/about">About</a>
      </div>
    </div>
  );
};

export default Navbar;
