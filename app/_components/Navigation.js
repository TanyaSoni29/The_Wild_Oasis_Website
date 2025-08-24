import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth(); // whenever we use this auth function then this make the route dynamic as it is using cookies and header and this auth function need to read this cookies from the incoming request and previously we learned reading cookies switches the route to dynamic routes as these cookies can be known only in runtime. in this situation as we are calling auth function inside navigation which in the part of layout so every single route will become dynamic (entire website )
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        {/* <li>
          <Link href="/">Home</Link>
        </li> */}
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer" // this needed in some situation to display these images correctly coming from google auth process
              />
              <span>Guest Area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest Area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

// we done authentication part now we need to do authorize part authorize means restrict user to certain area and only logged in user can go to that area and here we want to protect the guest area only logged in user can go guest in area and for authorization we have middleware
