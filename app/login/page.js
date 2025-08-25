import SignInButton from "../_components/SignInButton";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}

// now to open this page when user want to access the guest area in auth js file we need to specify pages currently it is going in /api/auth/signin but we want to show /login
