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
import { SaveCake } from "@/actions/Cake";
import { toast } from "sonner";

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
  setInitialCakeState: (cake: Partial<Cake>) => void;
  changeMedia: (media: Media) => void;
  updateCakeValues: <K extends keyof Cake>(key: K, value: Cake[K]) => void;
  saveCakeContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cake: defaultCakeData,
  setInitialCakeState: (cake: Partial<Cake>) => {},
  changeMedia: (media: Media) => {},
  updateCakeValues: () => {},
  saveCakeContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const CakeProvider = ({ children }: { children: ReactNode }) => {
  const [cake, setCake] = useState<Partial<Cake>>(defaultCakeData);
  const [hasChanged, setHasChanged] = useState(false);
  const initialHashRef = useRef<string>(null);

  useEffect(() => {
    const currentHash = hash(cake);
    if (!initialHashRef.current) {
      initialHashRef.current = currentHash;
    }
    setHasChanged(currentHash !== initialHashRef.current);
  }, [cake]);

  function setInitialCakeState(cake: Partial<Cake>) {
    setCake(cake);
    initialHashRef.current = hash(cake);
  }

  function updateCakeValues<K extends keyof Cake>(key: K, value: Cake[K]) {
    setCake((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // TODO when media is uploaded, it calls this function to change the context. but the url being sent is incorrect?? idk. this occurs in NewMediaForm in the edit cake page. should also occur in the new cake page

  function changeMedia(media: Media) {
    console.log("trigger1");
    console.log(media);
    setCake((prev) => ({ ...prev, media }));
  }

  async function saveCakeContext() {
    initialHashRef.current = hash(cake);
    setHasChanged(false);
    await SaveCake(cake, cake.uuid);
    toast.success("Saved successfully");
  }

  return (
    <CakeContext.Provider
      value={{
        cake,
        setInitialCakeState,
        updateCakeValues,
        saveCakeContext,
        hasChanged,
        changeMedia,
        setHasChanged,
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};

// Hook to use cake context
export const useCake = () => useContext(CakeContext);
