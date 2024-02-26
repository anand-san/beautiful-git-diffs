import { createContext, useState } from "react";

export type BackgroundGradiant = {
  direction: string;
  from: string;
  fromPosition: number;
  via: string;
  viaPosition: number;
  to: string;
  toPosition: number;
};
export const BackgroundContext = createContext({
  backgroundGradiant: {
    direction: "225deg",
    from: "#ff3cac",
    fromPosition: 0,
    via: "#784ba0",
    viaPosition: 50,
    to: "#2b86c5",
    toPosition: 100,
  },

  setBackgroundGradiant: (newBackground: BackgroundGradiant) => {},

  useSolidBackground: false,
  toggleUseSolidBackground: () => {},

  backgroundColor: "#339af0",
  setBackgroundColor: (newBackground: string) => {},
});

export const BackgroundContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [useSolidBackground, setUseSolidBackground] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#339af0");

  const [backgroundGradiant, setBackgroundGradiant] =
    useState<BackgroundGradiant>({
      direction: "225deg",
      from: "#ff3cac",
      fromPosition: 0,
      via: "#784ba0",
      viaPosition: 50,
      to: "#2b86c5",
      toPosition: 100,
    });

  const toggleUseSolidBackground = () => {
    setUseSolidBackground(!useSolidBackground);
  };

  const value = {
    backgroundGradiant,
    setBackgroundGradiant,
    backgroundColor,
    setBackgroundColor,
    useSolidBackground,
    toggleUseSolidBackground,
  };

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
};
