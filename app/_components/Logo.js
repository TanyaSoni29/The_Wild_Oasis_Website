import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* <Image src={logo} alt="The Wild Oasis logo" /> if we import logo like this when we doesn't get error for specifying the height and width */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100} // now according to specified number this will drop the quality of image and make bury 100 for top quality
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
