"use client";

import { updateGuest } from "../_lib/actions";
import Button from "./Button";

// import { useState } from "react";

export default function UpdateProfileForm({ guest, children }) {
  // const [count, setCount] = useState(); this state is to show that if states are written then we have to make component client component
  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  // useFormStatus() here we can't use this hook we have to put inside the component and that component will render inside that form this hook is used to tract that formData is submitted successfully and to show loading while form performing action
  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button pendingLabel="Updating...">Update profile</Button>
      </div>
    </form>
  );
}
// going to put in separate component
// function Button() {
//   const { pending } = useFormStatus(); // we have access of formData, action , method // here that rule is same as we are using hook then this Button component must be client component and this whole component where we have this button is already a client component
//   return (
//     <button
//       className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       {pending ? "Updating..." : "Update profile"}
//     </button>
//   );
// }

// now here above we seeing that this client component importing the server component which is not possible until it is not passed as prop or children
