import { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {
  Navbar,
  Link,
  Dropdown,
  Avatar,
  Text,
} from "@nextui-org/react";

interface item {
  title: string;
  href: string;
  isAdmin: boolean;
}

const NavbarComp: NextPage<{}> = () => {
  const { data: session, status } = useSession();
  const { push, pathname } = useRouter();

  const [showItems, setItems] = useState<item[]>([
    {
      title: "About",
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
    <Navbar isBordered variant={"sticky"}>
      <Navbar.Toggle showIn={"md"} aria-label="toggle nav" />
      <Navbar.Content enableCursorHighlight hideIn={"md"}>
        {showItems.map((item, index) => (
          <Navbar.Link
            href={item.href}
            isActive={pathname === item.href}
            key={index}
          >
            {item.title}
          </Navbar.Link>
        ))}
      </Navbar.Content>

      <Navbar.Content>
        {status === "authenticated" ? (
          <>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as="button"
                      color="success"
                      size="lg"
                      src={session.user.image || '/Avatar.png'}
                    />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu aria-label="User menu actions" color="secondary">
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {session.user.email}
                  </Text>
                </Dropdown.Item>

                <Dropdown.Item key="short-link" withDivider color="primary">
                  <div onClick={() => push("/check-in")}>Check In</div>
                </Dropdown.Item>

                <Dropdown.Item key="logout" withDivider color="error">
                  <div onClick={() => signOut()}>Log Out</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="error"
                    size="lg"
                    src="/Avatar.png"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>

              <Dropdown.Menu aria-label="User menu actions" color="secondary">
                <Dropdown.Item key="login" color="error">
                  <div onClick={() => signIn()}>You are not signed in.</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}

      </Navbar.Content>

      <Navbar.Collapse>
        {showItems.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link color="inherit" href={item.href} onClick={(e) => {
              e.preventDefault();
              push(item.href);
            }}>
              {item.title}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComp;