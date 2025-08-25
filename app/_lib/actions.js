"use server";
import { signIn, signOut } from "./auth";

// this is first action that this action file contains why we defining this we will learn letter

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // first we provide the name of providers if we have multiple then we can access from route and loop over on each and as second argument we need to pass some options and we need to specifies the redirectTo to account page as soon as user is authenticated successfully
}
// now this function import and pass inside the action attribute of form

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
