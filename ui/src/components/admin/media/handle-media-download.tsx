import { Media } from "@/types";

export const HandleMediaDownload = async (media: Partial<Media>) => {
  try {
    const response = await fetch(
      "http://localhost:5193/api/" +
        `media/download?fileName=${media.objectKey}`
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = media.objectKey as string;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
