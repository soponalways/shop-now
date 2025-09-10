import React from 'react'
import Logo from '../Logo/Logo'
import Button from '../Button/Button';

export const ListItems = () => {
    const classes = "rounded-lg hover:bg-gray-200 md:text-lg lg:text-xl hover:text-base-300 border border-base-300 mx-1 md:mx-2";
    return (
        <>
            <li className={classes}><a>Item 1</a></li>
            <li className={classes}><a>Item 3</a></li>
        </>
    )
}

export default function NavBar() {
  return (
    <div>
          <div className="container mx-auto navbar shadow-sm">
              <div className="navbar-start">
                  <div className="dropdown">
                      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                      </div>
                      <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                          <ListItems />
                      </ul>
                  </div>
                  <Logo />
              </div>
              <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                      <ListItems />
                  </ul>
              </div>
              <div className="navbar-end">
                  <Button variant="outline" className="hidden md:inline-flex">Login</Button>
                  <Button className="ml-2 hidden md:inline-flex">Sign Up</Button>
              </div>
          </div>
    </div>
  )
}
