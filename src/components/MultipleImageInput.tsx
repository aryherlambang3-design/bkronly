"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

interface MultipleImageInputProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function MultipleImageInput({ images, onChange }: MultipleImageInputProps) {
  const [newImageUrl, setNewImageUrl] = useState("");

  const addImage = () => {
    if (newImageUrl.trim()) {
      onChange([...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImage();
    }
  };

  return (
    <div className="space-y-3">
      {/* Display existing images */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((url, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-2"
            >
              <span className="flex-shrink-0 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded">
                #{index + 1}
              </span>
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  onChange(newImages);
                }}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Image URL"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="flex-shrink-0 p-1.5 bg-red-950 hover:bg-red-900 text-red-400 rounded transition-colors"
                title="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new image input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Paste image URL and press Enter or click +"
        />
        <button
          type="button"
          onClick={addImage}
          disabled={!newImageUrl.trim()}
          className="flex-shrink-0 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors"
          title="Add image"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <p className="text-[10px] text-zinc-500">
        {images.length === 0 && "No images added yet. Add at least one image URL."}
        {images.length === 1 && "Single image. Add more for carousel."}
        {images.length > 1 && `${images.length} images - will display as carousel/slider`}
      </p>
    </div>
  );
}
