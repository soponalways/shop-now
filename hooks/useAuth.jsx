"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

export default function useAuth() {
    // const {data: session , status} = useSession();
    const data = useSession();
    // console.log(session, status);
    console.log(data);

  return (
    <div>useAuth</div>
  )
}
