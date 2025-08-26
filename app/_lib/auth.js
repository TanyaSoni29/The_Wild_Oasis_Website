import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // for middleware and this authorize either return true or false on the basis of authorized users or not
    // auth is current session and  we also have request access
    authorized({ auth, request }) {
      return !!auth?.user; // to convert any value to boolean we use this !! double exclamation mark we can also write if condition and here we can also do some advance authorization stuff based on the request that you get as well but usually we just keep it simple this all we need to protect route where only authorized user enter on the particular route or not
    },
    async signIn({ user, account, profile }) {
      // it is like middleware as it will run before the signin process completion actually it put credentials before user login
      // we have access of all these user, account , profile nut here we only need user
      try {
        const existingGuest = await getGuest(user?.email);
        // if existing Guest then return true
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name }); // here don't forget to write await other wise it immediately return true and move to next middleware that is session

        return true;
      } catch (error) {
        return false; // after all this we only tested the currently logged in user exist or not
      }
    },
    // now to now the currently logged in guest id as we need this id to create booking and to update guest profile as well so to access that id we define another callback here
    async session({ session, user }) {
      // in this function we have access of current using session and this is perfect place to add that id on that session object
      // this session is exactly same as we are getting when we are calling that auth
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session; // hence in this way we have that id in our whole app
      // this session we can't do inside the signIn callback as user hasn't been created yet this is like this in two steps and we have to always follow like this 
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut, // now we call these on our button (custom) that we done in custom login page and signout page
  handlers: { GET, POST },
} = NextAuth(authConfig);

// to put authentication on server side not on client side for better user experience we have to import two more function from NextAuth call

// to store signin user in supabase we define another callback called signIn
