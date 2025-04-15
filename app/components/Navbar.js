"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState,useEffect } from "react";
import chaiImg from "../../public/tea.gif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const [showDropDown,setShowDropDown] = useState(false)
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  return (
    <nav className="bg-black text-white flex justify-between px-8 h-14 items-center relative">
        <Link href={"/"}>
      <div className="font-extrabold flex gap-0.5 justify-center items-center">
        <span className="w-[40px]">
          <Image src={chaiImg} alt="chai" />
        </span>
        <span>GetMeChai!</span>
      </div>
        </Link>
      <div className="py-2 relative flex">
        {/* <ul className='flex gap-4'>
                <li>Home</li>
                <li>About</li>
                <li>Projects</li>
                <li>Signup</li>
                <li>Login</li>
            </ul> */}
        <div className="flex " >
          {session ? (
            <>
            <div>
              <button
              onClick={() => setShowDropDown(!showDropDown)}
              onBlur={(e) => {
                setTimeout(() => {
                   setShowDropDown(false)
                },200)
                
              }
            }
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className=" text-white font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                type="button"
              >
                {session.user.email}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownDelay"
                className={`z-15 ${showDropDown ?"" :"hidden"} divide-y divide-gray-100 rounded-lg shadow-sm w-44 bg-gray-700 showDD `}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200 left-[85px] absolute"
                  aria-labelledby="dropdownDelayButton"
                >
                  <li>
                  <Link
                      href={"/dashboard"}
                      className="block px-4 py-2 hover:bg-gray-700 text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-700 text-white"
                    >
                      Your Earning
                    </Link>
                  </li>
                </ul>
              </div>{" "}
              </div>
              <button onClick={() => signOut()} className="text-white mx-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                  Logout
                </button>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
