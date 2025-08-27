"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
// by default we have access of formData when we use server action in action attribute of form does not need to pass that data to server action
export async function updateGuest(formData) {
  // console.log("Server ACtions");
  // now we are in Backend and in backend when we write controller then we first verify auth then input as inputs are unsafe that validate them
  // in server action we generally don't use try catch and just throw the Error and it is caught near its server boundary
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  //  formData is Also web Api that also work in Browser
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  // we are above just destructuring the array that we get after split method;
  // regex is stands for regular expression and to validate the nationalID we have to write regex for alphanumeric and length between 6 to 12 but we have some short cut we can ask for chatgpt to write regex to check national ID
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // after running of server action data is updated in database but not in ui because of Router Cache in Browser hence to safe us from stale data we need to revalidate the cache manually
  // we know we have two type of revalidation one is time based and another one is manually means whenever we want we can revalidate the cache
  // revalidatePath("/account"); // we can left like this then all the data below this account route will revalidated means all data for home reservation profile all will that come under this account route will revalidated however this is too much so we can specify also so we use entire route
  revalidatePath("/account/profile");
}

// delete Reservation server action
// if we open network and check currently delete booking then if we go copy and copy as curl and then paste to terminal then we have access of currently deleted booking id now any one can change this id and delete our reservation so here we need extra protection (leakage of bookingId - last as raw data) to protect we want only guest can delete its booking get all the bookings by users then check if the id that has been passed is same as bookings id that user have then delete other wise show error
export async function deleteGuestReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  // we have revalidate Tag (for some pieces of data that we fetched) also to go more specifically but here it is better way and easy as well and also note that we are not using native fetch function we are using supabase for data so it is harder to use revalidatePath or we can say it is impossible might be
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");
  // building updateData
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // here users can't spam that's why we take only upto 1000
  };

  // Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  // error handling
  if (error) throw new Error("Booking could not be updated");
  // revalidation should occur before redirecting
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  // successful update then redirect to reservations
  redirect("/account/reservations");
}

// this is first action that this action file contains why we defining this we will learn letter

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // first we provide the name of providers if we have multiple then we can access from route and loop over on each and as second argument we need to pass some options and we need to specifies the redirectTo to account page as soon as user is authenticated successfully
}
// now this function import and pass inside the action attribute of form

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// now let add a loading indicator for user so that user now form is correctly updated now for that tracking react give us a new Hook that is useFormStatus actually this hook is part of React Dom not just of React
// this new hook cannot be imported where the form is placed it is imported inside a component which will render inside the form
