// [...nextauth] - this means catch all segment that url starts from  /api/auth slash whatever we want will be handle by this route.js - like auth/signin, /auth/signout

// in this route.js file we do similar thing we have import these GET and POST from nextAuth and simply export them (immediately)

export { GET, POST } from "@/app/_lib/auth";

// After saving this and reloading the website now you can go to localhost:3000/api/auth/signin or any signup and if you get google signin button then your auth from google provider is set up correctly
