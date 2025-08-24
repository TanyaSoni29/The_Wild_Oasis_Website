import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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
  },
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
