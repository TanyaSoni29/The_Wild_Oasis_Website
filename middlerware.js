import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);
//   // we can redirect the user
//   return NextResponse.redirect(new URL("/about", request.url)); // by this redirect line we are on any route if we reload then we go to about route and browser show error that too many redirects this is because middleware run for every single route for to stop for only specific route we use matcher like this
// }

// export const config = {
//   matcher: ["/account"], // by defining like this now middleware only run for account route only we add some more route as well
// };

// now again we use that auth function it have different functionality it is use get current session and it also serves as middleware
import { auth } from "@/app/_lib/auth";
export const middleware = auth; // this is for this configuration for setting middleware but we also do some changes in auth as well means we have to set callback
export const config = {
  matcher: ["/account"],
};
