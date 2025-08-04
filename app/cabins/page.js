// import Navigation from "../components/Navigation";

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Filter from "../_components/Filter";
import Spinner from "../_components/Spinner";
import ReservationReminder from "../_components/ReservationReminder";

// import Counter from "@/app/_components/Counter"; // importing using alias
// export const revalidate = 0; // here the revalidate value is not be computed it should actually a value means it can't have some variable and the compute by using that variable like 5 time that variable this is not acceptable
export const revalidate = 3600; // this value is always in seconds

export const metadata = {
  title: "Cabins", // now by defining this the web title in browser tab change means over write with the layout metaData which is global
};

// export default function Page() {
//   // const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   // const data = await res.json();

//   // console.log(data);
//   return (
//     <div>
//       {/* <Navigation /> */}
//       <h1>Cabins</h1>
//       {/* <ul>
//         {data.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul> */}
//       {/* <Counter users={data} /> */}
//     </div>
//   );
// }

// important always remember these searchParams only available in Pages not server components.

export default function Page({ searchParams }) {
  // console.log(searchParams); // we want to implement filter in page cabin overview page and for filter we need client interactivity we know that but this filter state data is on client side and the client overView page is on server side hence there is very big question about how we send this filter data to the server so the best way is to set this data in url and if we set in url then in server page component we can easily get access of this query params as above as props hence url s the best way to share state between client and server component

  // one more important thing to know as we are using searchParams so they are not known at the run time so this page is not statically rendered now this page will become dynamically render as request are dynamic in searchParams and the revalidate that we define above is not have meaning as it is for revalidation for statically generated pages. that's why we can now comment as well

  // whenever the searchParams changes then this server component will be rerendered and told you the concept that whenever navigation changes server component undergo re rendering and as this will rerender child component CabinList also re render and fetches the data again as whole component run again in this way this whole processes works
  const filter = searchParams?.capacity ?? "all";

  // CHANGE
  // const cabins = await getCabins();
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Suspense fallback inside should contain jsx so thats why we attach Spinner component */}

      {/* Filter will work as unique key for this suspense boundary to reset it again so whenever the filter value change the fallback so again */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
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
