import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin} // here we are passing all object because we will end up with so many props suppose we only need two then we specially pass those two as prop
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

// after doing all this we have to start steaming for this component as if this component take time in fetching then it will block this entre cabin Id page so for this we will use Suspense here and this is the biggest reason to move fetching in to its own component and it can be be streamed until it start streaming user is able to see cabin details as above
