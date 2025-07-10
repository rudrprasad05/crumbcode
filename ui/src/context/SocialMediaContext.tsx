import { CakeType, Media, SocialMedia } from "@/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import hash from "object-hash";
import { toast } from "sonner";
import { GetAllCakeTypes } from "@/actions/CakeType";
import { CreateSocialMedia } from "@/actions/SocialMedia";

let defaultData: Partial<SocialMedia> = {
  name: "example",
  url: "example.com",
  icon: "default",
  isActive: true,
};

// Create context
const SocialMediaContext = createContext<{
  socialMedia: Partial<SocialMedia>;
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
  const initialHashRef = useRef<string>(null);

  useEffect(() => {
    const currentHash = hash(socialMedia);
    if (!initialHashRef.current) {
      initialHashRef.current = currentHash;
    }
    setHasChanged(currentHash !== initialHashRef.current);
  }, [socialMedia]);

  function setInitialCakeState(socialMedia: Partial<SocialMedia>) {
    setSocialMedia(socialMedia);
    initialHashRef.current = hash(socialMedia);
  }

  function updateSocialMediaValues<K extends keyof SocialMedia>(
    key: K,
    value: SocialMedia[K]
  ) {
    setSocialMedia((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveSocialMediaContext() {
    initialHashRef.current = hash(socialMedia);
    setHasChanged(false);

    console.dir(socialMedia);
    // return;
    await CreateSocialMedia(socialMedia, socialMedia.uuid);
    toast.success("Saved successfully");
  }

  return (
    <SocialMediaContext.Provider
      value={{
        socialMedia,
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
