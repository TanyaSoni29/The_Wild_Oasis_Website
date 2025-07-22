import Link from "next/link";
import Navigation from "./_components/Navigation";

export default function Page() {
  return (
    <div>
      {/* <Navigation /> as we included this Navigation inside the layout */}
      <h1>The Wild Oasis. Welcome to Paradise</h1>
      <Link href="/cabins">Explore Luxury Cabins</Link>
    </div>
  );
}
