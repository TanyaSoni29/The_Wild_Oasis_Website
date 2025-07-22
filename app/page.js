import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      {/* Now instead of specifying particular height and width we use fill just to fill entire space and if we specify the height or width then we also lost the responsiveness of image if we are not using this Image component from next then we have to attach the image in background here we only need to specify the fill  now if we use fill then we have warning as we haven't specify the position relative to parent so to remove we can specify*/}
      {/* by specifying object top now in responsive object always responsive from top not bottom means it start larging from the top */}
      <Image
        src={bg}
        fill
        placeholder="blur" // this will blur the portion of image while loading of image
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
