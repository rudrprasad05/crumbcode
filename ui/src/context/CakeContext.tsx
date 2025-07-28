import { Cake, CakeType, Media } from "@/types";
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
import { GetAllCakeTypes } from "@/actions/CakeType";

const defaultMedia: Partial<Media> = {
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

const defaultCakeData: Partial<Cake> = {
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
  isSaving: boolean;
  cakeTypes: Partial<CakeType[]> | undefined;
  setInitialCakeState: (data: Partial<Cake>) => void;
  changeMedia: (media: Media) => void;
  updateCakeValues: <K extends keyof Cake>(key: K, value: Cake[K]) => void;
  saveCakeContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cake: defaultCakeData,
  isSaving: false,
  cakeTypes: undefined,
  setInitialCakeState: () => {},
  changeMedia: (media: Media) => {},
  updateCakeValues: () => {},
  saveCakeContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const CakeProvider = ({ children }: { children: ReactNode }) => {
  const [cake, setCake] = useState<Partial<Cake>>(defaultCakeData);
  const [cakeTypes, setCakeTypes] = useState<Partial<CakeType[]> | undefined>(
    undefined
  );
  const [hasChanged, setHasChanged] = useState(false);
  const initialHashRef = useRef<string>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await GetAllCakeTypes();
      setCakeTypes(res.data || []);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("hit2");
    console.log(cake);
    const currentHash = hash(cake);
    if (!initialHashRef.current) {
      initialHashRef.current = currentHash;
    }
    setHasChanged(currentHash !== initialHashRef.current);
  }, [cake]);

  function setInitialCakeState(data: Partial<Cake>) {
    console.log("comp", data, cake);
    if (data == cake) return;
    console.log("hit3");
    setCake(data);
    initialHashRef.current = hash(data);
  }

  function updateCakeValues<K extends keyof Cake>(key: K, value: Cake[K]) {
    setCake((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // TODO when media is uploaded, it calls this function to change the context. but the url being sent is incorrect?? idk. this occurs in NewMediaForm in the edit cake page. should also occur in the new cake page

  function changeMedia(media: Media) {
    console.log("changemedia", media);
    setCake((prev) => ({ ...prev, media: media }));
  }

  async function saveCakeContext() {
    setIsSaving(true);
    try {
      cake.cakeTypeId = cake.cakeType?.id;
      cake.mediaId = cake.media?.id;
      await SaveCake(cake, cake.uuid);
      initialHashRef.current = hash(cake);
      setHasChanged(false);

      toast.success("Saved successfully");
    } catch (error) {
      toast.error("Error ocured. Changes not saved");
    }
    setIsSaving(false);
  }

  return (
    <CakeContext.Provider
      value={{
        cake,
        isSaving,
        cakeTypes,
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
