"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import Dashboard from '../components/Dashboard';

function page() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
        router.push("/login");
      }
  return (
    <>
    <Dashboard/>
    </>
  )
}

export default page