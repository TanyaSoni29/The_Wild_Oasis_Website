"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
  // to set these value in url we use an WebApi called URLSearchParams // this WebApi is very useful when we have so many parameters in url because it make it very easily to interact those params and this should be follow in future as method as it is very useful
  // now get data in client we have another way in server side we have that search params but here we use another way to get that and pass in the URLSearchParams

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); // for complete path creation we need this

  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    // params that we have got as result of URLSearchParams we can set parameters, delete parameter and so on..
    params.set("capacity", filter); // it internally build that url but not do changes in url in ui side so to replace the url with new build url we need to replace function which come from useRouter hook
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // this is scroll object is optional but this will insure that page will not scroll back up to the top
    // after all these set up in the client side now our client server interaction in filter is ready.. here we see small issue now whenever we change filter value it takes 2 second to load that filter value but in mean time screen does not show that Spinner this is because next navigation is always wrapped inside the React transition and in a transition Suspense will not hide the content that has already been rendered So that just the default behavior of suspense we are seeing here it will wait for swapping the content as soon as new content arrive but luckily for us we can actually fix this by passing unique key in Suspense component. so let's move on Page
  }
  return (
    <div className='border border-primary-800 flex'>
      <Button
        handleFilter={handleFilter}
        filter='all'
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter='small'
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter='medium'
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter='large'
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 ${
        filter === activeFilter
          ? "bg-primary-700 text-primary-50"
          : "hover:bg-primary-700"
      } `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
