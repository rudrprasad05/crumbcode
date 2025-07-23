import { UploadOneFile } from "@/actions/Media";
import { Cake, Media } from "@/types";
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
import { boolean } from "zod";

const defaultMedia: Partial<Media> = {
  url: "/default-img.jpeg",
  objectKey: "crumbcode/d6dab80c-3acd-4e6a-a750-506c7243991f.jpeg",
  altText: "default image placeholder",
  fileName: "default-img",
  contentType: "image/jpeg",
  sizeInBytes: 0,
  id: 0,
  showInGallery: true,
  uuid: "d6dab80c-3acd-4e6a-a750-506c7243991f",
  createdOn: "2025-06-28T22:41:32.499486",
  updatedOn: "2025-06-28T22:41:32.499489",
};

// Create context
const MediaContext = createContext<{
  media: Partial<Media>;
  file: File | undefined;
  previewUrl: string | undefined;
  isSaving: boolean;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    del?: boolean
  ) => void;
  setInitialState: (cake: Partial<Cake>) => void;
  updateValues: <K extends keyof Media>(key: K, value: Media[K]) => void;
  saveContext: () => void;
  hasChanged: boolean;
  setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  media: defaultMedia,
  file: undefined,
  previewUrl: undefined,
  isSaving: false,
  handleFileChange: () => {},
  setInitialState: (cake: Partial<Cake>) => {},
  updateValues: () => {},
  saveContext: () => {},
  hasChanged: false,
  setHasChanged: () => {},
});

// Provider
export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [media, setMedia] = useState<Partial<Media>>(defaultMedia);
  const [hasChanged, setHasChanged] = useState(false);
  const initialHashRef = useRef<string>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const currentHash = hash(media);
    if (!initialHashRef.current) {
      initialHashRef.current = currentHash;
    }
    setHasChanged(currentHash !== initialHashRef.current);
  }, [media]);

  function setInitialState(cake: Partial<Media>) {
    setMedia(cake);
    initialHashRef.current = hash(cake);
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    del = false
  ) => {
    const file = event.target.files?.[0];
    if (del) {
      setFile(undefined);
      setPreviewUrl(undefined);
      return;
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFile(file);
    }
  };

  function updateValues<K extends keyof Media>(key: K, value: Media[K]) {
    setMedia((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleMediaSave() {
    let m = media as Media;
    if (!file) {
      toast.error("No file selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("url", "TEMP");
      formData.append("altText", m.altText);
      formData.append("fileName", m.fileName);
      formData.append("contentType", file.type);
      formData.append("sizeInBytes", file.size.toString());
      formData.append("file", file);

      const res = await UploadOneFile(formData);

      console.log("res", res);

      if (!res) throw new Error("Upload failed");

      toast.success("Uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  }

  async function saveContext() {
    setIsSaving(true);
    try {
      await handleMediaSave();
      initialHashRef.current = hash(media);
      setHasChanged(false);

      toast.success("Saved successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error ocured. Changes not saved");
    }
    setIsSaving(false);
  }

  return (
    <MediaContext.Provider
      value={{
        previewUrl,
        handleFileChange,
        file,
        media,
        isSaving,
        setInitialState,
        updateValues,
        saveContext,
        hasChanged,
        setHasChanged,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

// Hook to use cake context
export const useMedia = () => useContext(MediaContext);
