// import Navigation from "../components/Navigation";

// import Counter from "@/app/_components/Counter"; // importing using alias

export const metadata = {
  title: "Cabins", // now by defining this the web title in browser tab change means over write with the layout metaData which is global
};

export default function Page() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // const data = await res.json();

  // console.log(data);
  return (
    <div>
      {/* <Navigation /> */}
      <h1>Cabins</h1>
      {/* <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
      {/* <Counter users={data} /> */}
    </div>
  );
}

// we can call this any thing like Cabins Page but by convention we always call it as Page
// for fake Api we have one site with json placeholder

// you can see how we apply async await directly on the component before we never do this in a component as Page is Component but here in RSC we are doing this

// console.log(data) will appear on terminal not in Browser console as we are consoling in the server and server console always appear in the terminal

// now in the cabins page we are displaying the users name list now if we move to another page and come back then it will not refetch data again that will come from cache but if we reload the page then it will take some time to display that list because cache in remove and it make fetch request and data coming will take some time

// without using useClient directive if we import counter component then we have error that server components are not allowed to use useState so to remove error on counter component use that directive "use client"

// showing loading indicator is very easy when component fetching some data if we can't show indicator then user experience is not that great because they think there is lagging for loading indicator we have to make loading.js file inside the root of app
