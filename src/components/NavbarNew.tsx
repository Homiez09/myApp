import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";

interface item {
  title: string;
  href: string;
  isAdmin: boolean;
}

const NavbarNewComp = () => {
  const { data: session, status } = useSession();
  const { push, pathname } = useRouter();
  const [showItems, setItems] = useState<item[]>([
    {
      title: "Homepage",
      href: "/",
      isAdmin: false,
    },
    {
      title: "Blog",
      href: "/",
      isAdmin: false,
    },
    {
      title: "Portfolio",
      href: "/",
      isAdmin: false,
    },
    {
      title: "Apps",
      href: "/",
      isAdmin: false,
    },
    {
      title: "Contact",
      href: "/",
      isAdmin: false,
    },
  ]);


  return (
    <div className="navbar bg-base-100"> 
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">{'Member' || 'Guest'}</a>
      </div>
      <div className="navbar-end">
        {status === "authenticated" ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <Avatar
                className="hover:animate-pulse"
                bordered
                as="button"
                color="success"
                size="lg"
                src={session?.user.image || '/Avatar.png'}
              />
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="justify-between">
                  <div onClick={() => push("/")}>Profile</div>
                </div>
              </li>
              <li>
                <div className="justify-between">
                  <div onClick={() => push("/")}>Settings</div>
                </div>
              </li>
              <li>
                <div className="justify-between text-red-500" onClick={() => signOut()}>
                  Log Out
                  <span className="badge">New</span>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <Avatar
              className="animate-bounce hover:animate-pulse"
              tabIndex={0}
              bordered
              as="button"
              color="error"
              size="lg"
              src='/Avatar.png'
            />
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="justify-between text-green-500" onClick={() => signIn()}>
                  Sign In
                  <span className="badge animate-pulse">New</span>
                </div>
              </li>
              <div className="justify-between text-gray-600 self-center">
                You are not logged in
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarNewComp;