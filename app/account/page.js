// import Navigation from "../_components/Navigation";

import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      {" "}
      {/* <Navigation /> */}
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome , {firstName}
      </h2>
    </div>
  );
}

// here we does not required optional chaining because user visit only when login successfully hence we can directly write as well session.user.name
