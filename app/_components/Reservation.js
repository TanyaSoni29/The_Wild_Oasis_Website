import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin} // here we are passing all object because we will end up with so many props suppose we only need two then we specially pass those two as prop
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

// after doing all this we have to start steaming for this component as if this component take time in fetching then it will block this entre cabin Id page so for this we will use Suspense here and this is the biggest reason to move fetching in to its own component and it can be be streamed until it start streaming user is able to see cabin details as above

// this Reservation component in server component while reservation form is client component and we need auth session in this Form means in client component there is a way of doing that but we are not doing in client as we will highly benefit if we put all the on server component logged in and logged dealing only on server hence we will call auth here and conditionally render form and pass user as well inside the reservation form
