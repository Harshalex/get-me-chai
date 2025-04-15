"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import CommonButton from "../components/CommonButton";
import React, { useEffect } from 'react'

function page() {
  const links = [{
    linktext:"continue with Google",
    icon : <FcGoogle />,
    action : () => {console.log("Google Connect")}
  },{
    linktext:"continue with Linkldin",
    icon : <FaLinkedin className="text-blue-900" />,
    action : () => {console.log("Google Linkdin")}
  },{
    linktext:"continue with Facebook",
    icon : <FaFacebook className="text-blue-600" />,
    action : () => {console.log("Google Facebook")}
  },{
    linktext:"continue with Github",
    icon : <FaGithub />,
    action : signIn
  },{
    linktext:"continue with Twitter",
    icon : <FaTwitter className="text-blue-500" />,
    action : () => {console.log("Google Twitter")}
  }]
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  // Redirect to dashboard if the user is already logged in
  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (session) {
    router.push("/dashboard");
    return null; // Prevent rendering the login page
  }
  return (
    <>
    <div className='py-12 container mx-auto flex flex-col items-center gap-3'>
        <h2 className='font-bold text-3xl text-center text-white pb-6'>Login to Get Your fans To Support You</h2>
         {links.map((link,index) => <CommonButton key={index} linktext={link.linktext} icon={link.icon} action={link.action} />)}
    </div>
    </>
  )
}

export default page