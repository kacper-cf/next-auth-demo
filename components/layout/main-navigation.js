import { signOut, useSession } from "next-auth/client";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler(event) {
    event.preventDefault();
    signOut();
  }

  console.log({ session, loading });
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : null}

          {session ? (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          ) : null}
          {session ? (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
