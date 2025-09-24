import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin", // dynamic title how we done here is an example - generating metadata dynamically so for that instead of exporting metadata we can also export generateMetadata function this function also have access of current params
// };

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params?.cabinId); // after this fetching metadata is display first before the data show in the page means title of head is set first then streaming of ui to client. hence guaranty of first streaming of this metadata then streaming of page data
  return {
    title: `Cabin ${name}`,
  };
}

// conversion of this dynamic pages to static page by providing all possible value of cabin ids but we does not provide manually but through the fetching of all cabin ids
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins?.map((cabin) => ({ cabinId: String(cabin?.id) })); // params are string here we return an object with property cabinId because that variable we used in defining the route
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params?.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);
  // above we are fetching so many pieces of data which are not linked with each other means they are independent the above three fetching shows blocking waterfall , blocking waterfall means we are fetching multiple pieces of data that does not depend on each other but they are blocking one and another one approach to fix this is to use Promise.all then we will get this data in parallel in Promise.all we pass array of promises
  // const [cabins, settings, bookedDates] = await Promise.all([getCabin(params.cabinId), getSettings(), getBookedDatesByCabinId(params.cabinId)]); like this but this approach is also not perfect as it will be fast upto its slowest promise resolve this is better but best is we can make different bunch of components and then each component fetch all data instead of fetching all data in Parent Component and those bunch of component can be streamed as they ready with the data. so we make one component that have both two client component date selector and reservation form.
  // here we can use that next js caching that we can fetch data in many component but due to caching it make only one request but we are not using here because we have only one level of prop passing in cabin data if it is deep then we use that caching strategies
  // const { id, name, maxCapacity, regularPrice, discount, image, description } =
  //   cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            alt={`Cabin ${name}`}
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div> */}
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector />
          <ReservationForm />
        </div> */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
