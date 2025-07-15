import { CloudOff, CloudUpload, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface IEditorSaveButton {
  hasChanged: boolean;
  save: () => void;
  isSaving: boolean;
}

export function EditorSaveButton({
  hasChanged,
  save,
  isSaving,
}: IEditorSaveButton) {
  return (
    <div className="flex gap-2 items-center ml-auto">
      <div className="text-sm text-gray-500 ">
        {hasChanged ? (
          <div className="flex items-center gap-2">
            <CloudOff className="w-4 h-4 " /> Changes not saved
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CloudUpload className="w-4 h-4 " /> Saved to Cloud
          </div>
        )}
      </div>
      <Button disabled={!hasChanged} onClick={save} variant={"outline"}>
        {isSaving ? (
          <div className="flex gap-2 items-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving
          </div>
        ) : (
          <div>Save</div>
        )}
      </Button>
    </div>
  );
}
