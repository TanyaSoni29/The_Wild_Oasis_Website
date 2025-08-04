import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";

// Font import for multi word use underscore and here we importing a function so weed to call this function
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", // here swap means until the downloading of this font it will use default font
  //weight: // this is already with variable weight so we can also specify the weight like this
});

// now we can use this josefin variable

export const metadata = {
  // title: "The Wild Oasis", // now by defining this the app title in browser tab change now we can go with differently as we see in many website they have home title as well so basically next provide us this feature
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  // for seo we also add descriptions
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests", // and this is the global description if we does not specify the individual description on each page and to overwrite we can export from individual as well
  // to put a favIcon on the title of website we can put a file of Icon in global app folder then that icon automatically became the icon in title of website file name should be icon not any thing
};

// for Logo

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased relative bg-primary-950 min-h-screen text-primary-100 flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        {/* <footer>Copyright by the wild oasis</footer> */}
      </body>
    </html>
  );
}

// as we included the footer inside the layout then this will appear in all pages
// fundamentals - we can add some metadata of the page also

// flex-1 means it will occupy all the remaining width

// something you have to notice above we are wrapping the all pages with client component Reservation Provider and pages inside then is pass as children prop so it will not cause any problem here as pages are server component as these server pages are already been generated (render) (result is already that is html element) then pass to Reservation Provider what we can't do we don't set up this context reservation context in the layout page as it is server component and context is client component and this is the only way of doing this we should make a component for context and define the context there and use it like we done here.
