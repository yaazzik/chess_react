import React from 'react'

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  return (
    <div className={className}>
      <div>
        <p className='header-text'>КЛАССИЧЕСКИЕ ШАХМАТЫ</p>
      </div>
    </div>
  )
}

export default Navbar
