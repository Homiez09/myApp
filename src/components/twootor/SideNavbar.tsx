import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";


const SideNavbarComp: NextPage<{}> = () => {
  const session = useSession();
  const user = session.data?.user;
  return(
    <>
      <nav className="sticky top-0 px-2 py-4">
        <ul className="flex flex-col items-start gap-2 whitespace-nowrap">
          <li>
            <Link href="/twootor">Home</Link>
          </li>
          { user != null && (
            <li>
            <Link href={`/twootor/profile/${user.id}`}>Profile</Link>
          </li>
          )}
          { user == null ? (
            <li>
              <button onClick={() => signIn()}>Sign In</button>
            </li>
          ) : (
            <li>
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          )}
        
        </ul>
      </nav>
    </>
  )
}


export default SideNavbarComp;