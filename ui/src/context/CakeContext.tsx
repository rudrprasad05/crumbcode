import { Cake, Media } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

let defaultMedia: Partial<Media> = {
  url: "/place-holder-cake.jpeg",
  altText: "Default alt text",
  objectKey: "0",
  fileName: "default file name",
  contentType: "image/svg",
  sizeInBytes: 100,
};

let defaultCakeData: Partial<Cake> = {
  name: "Default cake name",
  description: "Default cake desc",
  price: 10,
  isAvailable: true,
  media: defaultMedia,
  //   cakeType: "",
  //   allergen: [],
};

// Create context
const CakeContext = createContext<{
  cake: Partial<Cake>;
  setCake: React.Dispatch<React.SetStateAction<Partial<Cake>>>;
}>({
  cake: defaultCakeData,
  setCake: () => {},
});

// Provider
export const CakeProvider = ({ children }: { children: ReactNode }) => {
  const [cake, setCake] = useState<Partial<Cake>>(defaultCakeData);

  return (
    <CakeContext.Provider value={{ cake, setCake }}>
      {children}
    </CakeContext.Provider>
  );
};

// Hook to use cake context
export const useCake = () => useContext(CakeContext);
