"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import Button from "./Button";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData); // as first argument we need to pass new value of this keyword and here it is null and then other arguments now as a result of this bind method we have new function and we need to call that function here the most important thing to remember the second argument that we pass become the first argument of resulted function so the formData will set as bookingData inside action file so the formData will not replace we have to pass bookingData as it's first parameter inside createBooking function in server action
  // always remember resultant function is prepopulated with second argument to function which is bind

  return (
    <div className="scale-[1.0]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={(formData) => {
          createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Button pendingLabel="Reserving...">Reserve now</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

// for create booking we need to pass other derived data as well so for that what should we do before for one data we make a hidden input inside form and pass like that but here we have so many fields to pass so - we are going to use bind method to bind that additional data with formData and in this way we pass to server actions

// what a bind method does when you call in a function it will set the this keyword to that function and allow us to pass some additional arguments to that function that's what we need now that's one of the reason of using bind method
