"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users);
  return (
    <div>
      <p>Here are {users.length} users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

// Here Hydration is going behind the scene if we slow the net and reload then we can until the page is not loaded fully button is not interactive but initially we have all html for user which he can see that is great experience as compare to blank page

// now we will fetch data on server and pass on client as prop (this is called passing server client boundary   )

// on initial render all components weather they are client or server they all render on server side first that's why we are able to see content on screen of client component as well
