"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteGuestReservation } from "../_lib/actions";
export default function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId); // in setter function that we pass we will get that bookingId as well
    }
  ); // here we need to think about two state one is actual state and one is state after that async operation (optimistic state) first we pass current state after second we pass updated function and we get two state as result as in useState one is optimistic state another is setter function now inside the Reservation Card we have deleteReservation component in that component we specify the handler now we have use that handler here and remove from there it is passed from this component optimisticDelete triggering that function that we pass in useOptimistic hook
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // here we call for function and pass id so that it will know for which we are calling the function
    await deleteGuestReservation(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
