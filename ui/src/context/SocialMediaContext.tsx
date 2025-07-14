import { CreateSocialMedia } from "@/actions/SocialMedia";
import { SocialMedia } from "@/types";
import hash from "object-hash";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

let defaultData: Partial<SocialMedia> = {
  name: "example",
  url: "example.com",
  icon: "Default",
  isActive: true,
};

// Create context
const SocialMediaContext = createContext<{
  socialMedia: Partial<SocialMedia>;
  isSaving: boolean;
  setInitialCakeState: (socialMedia: Partial<SocialMedia>) => void;
  updateSocialMediaValues: <K extends keyof SocialMedia>(
    key: K,
    value: SocialMedia[K]
  ) => void;
  saveSocialMediaContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  socialMedia: defaultData,
  isSaving: false,
  setInitialCakeState: (socialMedia: Partial<SocialMedia>) => {},
  updateSocialMediaValues: () => {},
  saveSocialMediaContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const SocialMediaProvider = ({ children }: { children: ReactNode }) => {
  const [socialMedia, setSocialMedia] =
    useState<Partial<SocialMedia>>(defaultData);
  const [hasChanged, setHasChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const initialHashRef = useRef<string>(null);

  useEffect(() => {
    const currentHash = hash(socialMedia);
    if (!initialHashRef.current) {
      initialHashRef.current = currentHash;
    }
    setHasChanged(currentHash !== initialHashRef.current);
  }, [socialMedia]);

  function setInitialCakeState(data: Partial<SocialMedia>) {
    setSocialMedia(data);
    initialHashRef.current = hash(data);
    console.log("fired", data);
  }

  function updateSocialMediaValues<K extends keyof SocialMedia>(
    key: K,
    value: SocialMedia[K]
  ) {
    console.log("first");
    setSocialMedia((prev) => {
      const newState = { ...prev, [key]: value };
      console.log("Updated State:", newState);
      return newState;
    });
  }

  async function saveSocialMediaContext() {
    setIsSaving(true);
    try {
      await CreateSocialMedia(socialMedia, socialMedia.uuid);
      initialHashRef.current = hash(socialMedia);
      setHasChanged(false);

      console.dir("save media context", socialMedia);
      toast.success("Saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error ocured. Changes not saved");
    }
    setIsSaving(false);
  }

  return (
    <SocialMediaContext.Provider
      value={{
        socialMedia,
        isSaving,
        setInitialCakeState,
        updateSocialMediaValues,
        saveSocialMediaContext,
        hasChanged,
        setHasChanged,
      }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
};

// Hook to use socialMedia context
export const useSocialMedia = () => useContext(SocialMediaContext);
