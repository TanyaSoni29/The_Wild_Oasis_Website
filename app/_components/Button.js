"use client";

import { useFormStatus } from "react-dom";

export default function Button({ children, pendingLabel }) {
  const { pending } = useFormStatus(); // we have access of formData, action , method // here that rule is same as we are using hook then this Button component must be client component and this whole component where we have this button is already a client component
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
