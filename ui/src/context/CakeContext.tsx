import { Cake, Media } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import hash from "object-hash";

let defaultMedia: Partial<Media> = {
  url: "/default-img.jpeg",
  objectKey: "crumbcode/d6dab80c-3acd-4e6a-a750-506c7243991f.jpeg",
  altText: "default image placeholder",
  fileName: "default-img",
  contentType: "image/jpeg",
  sizeInBytes: 2320,
  id: 5,
  uuid: "d6dab80c-3acd-4e6a-a750-506c7243991f",
  createdOn: "2025-06-28T22:41:32.499486",
  updatedOn: "2025-06-28T22:41:32.499489",
};

let defaultCakeData: Partial<Cake> = {
  name: "Default cake name",
  description: "Default cake desc",
  price: 10,
  isAvailable: true,
  media: defaultMedia,
  uuid: crypto.randomUUID(),
  mediaId: defaultMedia.id,
  //   cakeType: "",
  //   allergen: [],
};

// Create context
const CakeContext = createContext<{
  cake: Partial<Cake>;
  setCake: React.Dispatch<React.SetStateAction<Partial<Cake>>>;
  updateCakeValues: <K extends keyof Cake>(key: K, value: Cake[K]) => void;
  saveCakeContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cake: defaultCakeData,
  setCake: () => {},
  updateCakeValues: () => {},
  saveCakeContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const CakeProvider = ({ children }: { children: ReactNode }) => {
  const [cake, setCake] = useState<Partial<Cake>>(defaultCakeData);
  const [hasChanged, setHasChanged] = useState(false);
  const initialHashRef = useRef<string>(hash(cake));

  useEffect(() => {
    const currentHash = hash(cake);
    setHasChanged(currentHash !== initialHashRef.current);
  }, [cake]);

  function updateCakeValues<K extends keyof Cake>(key: K, value: Cake[K]) {
    setCake((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function saveCakeContext() {
    console.log(cake);
    initialHashRef.current = hash(cake);
    setHasChanged(false);
  }

  return (
    <CakeContext.Provider
      value={{
        cake,
        setCake,
        updateCakeValues,
        saveCakeContext,
        hasChanged,
        setHasChanged,
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};

// Hook to use cake context
export const useCake = () => useContext(CakeContext);
