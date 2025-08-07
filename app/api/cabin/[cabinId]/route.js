import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({
      message: "Cabin not found",
    });
  }
}
// export async function POST() {}

// in this file we can export one or more function where each of them are corresponds to one of the HTTP verbs.

// we can also do put patch delete head and options all these are HTTP verbs and so we can create one route Handler for each of those verbs

// this Response is not next js feature it is web standard that can also implemented in browser as well (to know more you can search for MDN Response Api in google) and to reject and receive we have web standard

// we can also use next js standard version of response you can go through docs now currently in simplest form we are using Response Web api

// now when we go to api route in browser then we have this test object no html only json data that's reason that in this folder we does not have page.js file

// so for example we will create a endpoint for affiliates the particular cabin data

// this is great doing to give data to other like affiliates in this way we does not need to expose our supabase api to these affiliates and we can also easily aggregates different data sources as well from the part of supabase api that are not publicly accessible in this way we also keep our api keys hidden this is nice way if someone also consume our data in custom way. we can customize it right here

// error boundary that we set up in our app will not work here that's why we have to fetch the data in try catch

// important point to be noted these function names are HTTP Verb not random name it can be GET, PUT, PATCH like this
