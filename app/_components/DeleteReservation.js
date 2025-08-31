"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteGuestReservation } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  // here we can also write our server action and we have use that directive
  // function deleteReservation() {
  // "use server" like this but we don't do that because we want to place our server action in central place and this component may also become client component in future
  //}
  const [isPending, startTransition] = useTransition(); // isPending is flag when state updates it become true and this startTransition function where we wrap heavy state updates into. // all these are working like this because next js uses suspense boundaries behind the scenes means all navigation wrap inside the transition already for confusion please read notes

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation"))
      startTransition(() => onDelete(bookingId)); // in this way we wrap // in react we use in heavy state transition but in next js we are using for server action
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;

// another way of showing loading indicator now is useTransition Hook and we need this hook because we are not using the form now  this hook is introduced in React 18  as being so called as concurrent feature
// use Transition allow us to mark a state update as a so-called transition and when the state update is marked as a transition by using this hook the state update will happen without blocking the ui which means ui remains responsive during re-render and we also get indication that state transition is happening this is can be very useful in vanilla react ui where multiple state updates happens that might block the ui so we can say we are doing so in the background so the ui stays responsive

// Let's Update the reservation using server action

// let's learn new hook optimistic hook to increase the performance of the ui
//optimistic ui is the technique or trick which is used to improve the perceived performance of ui
// it is called optimistic because we assume certain asynchronous operation will be successful even before it is finished
// we want to implement remove booking from reservations page immediately as soon as user click on delete button in ui this is done with the help of useOptimistic hook
//  if that async operation is not successful then ui return again to it's original state
// goal is to make user experience very great here it is not matter that much but in data intensive it means a lot because we don't show loading spinner all the place

// as we are going to use hook so we need client component so we will move Reservation Card List to client component
