"use client"
import React from 'react'
import Logo from '../Logo/Logo'
import Button from '../Button/Button';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export const ListItems = () => {
    const classes = "rounded-lg hover:bg-gray-200 md:text-lg lg:text-xl hover:text-base-300 border border-base-300 mx-1 md:mx-2 my-1 md:my-2";
    return (
        <>
            <li className={classes}><Link href="/">Home</Link></li>
            <li className={classes}><Link href="/trackOrder">Track a Order</Link></li>
            <li className={classes}><Link href="/shops">Shops</Link></li>
            <li className={classes}><input type="text" placeholder="Search..." className="input input-bordered" /></li>
        </>
    )
}

export default function NavBar() {
    const data = useAuth(); 
    return (
        <div>
            <div className="container mx-auto navbar">
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
                    <Link href="/login" > <Button variant="outline" className="hidden md:inline-flex">Login</Button></Link>
                    <Link href="/register" ><Button className="ml-2 hidden md:inline-flex">Sign Up</Button></Link>
                </div>
            </div>
        </div>
    )
}
