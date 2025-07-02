import { CreateCakeType } from "@/actions/CakeType";
import { FromModelToNewRequestDTO } from "@/mappers/CaketypeMapper";
import { Cake, CakeType } from "@/types";
import hash from "object-hash";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

let defaultData: Partial<CakeType> = {
  name: "Default cake name",
  description: "Default cake desc",
  color: "gray-600",
};

// Create context
const CakeTypeContext = createContext<{
  data: Partial<CakeType>;
  updateValues: <K extends keyof CakeType>(key: K, value: CakeType[K]) => void;
  saveContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  data: defaultData,
  updateValues: () => {},
  saveContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const CakeTypeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Partial<CakeType>>(defaultData);
  const [hasChanged, setHasChanged] = useState(false);
  const initialHashRef = useRef<string>(hash(defaultData));

  useEffect(() => {
    const currentHash = hash(data);
    setHasChanged(currentHash !== initialHashRef.current);
  }, [data]);

  function updateValues<K extends keyof CakeType>(key: K, value: CakeType[K]) {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveContext() {
    try {
      await CreateCakeType(FromModelToNewRequestDTO(data as CakeType));
    } catch (error) {}
    initialHashRef.current = hash(data);
    setHasChanged(false);
  }

  return (
    <CakeTypeContext.Provider
      value={{
        data,
        updateValues,
        saveContext,
        hasChanged,
        setHasChanged,
      }}
    >
      {children}
    </CakeTypeContext.Provider>
  );
};

// Hook to use cake context
export const useCakeType = () => useContext(CakeTypeContext);
