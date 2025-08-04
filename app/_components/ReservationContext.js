"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside the Reservation Provider");
  return context;
}

export { ReservationProvider, useReservation };

// to provide this context values and states we should use Provider wrapping as deep as we can use so best to wrap our entire global layout so let play inside the main in global layout.js file
