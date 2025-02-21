import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SketchPicker } from "react-color";
import { X } from "lucide-react";

const predefinedColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#FFC300",
  "#FF5733",
  "#33FFF2",
  "#57FF33",
  "#F233FF",
];

export default function ColorPicker() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const addColor = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
    setIsPickerOpen(false);
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {selectedColors.map((color, index) => (
        <div key={index} className="flex items-center space-x-1">
          <span
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: color }}
          ></span>
          <button onClick={() => removeColor(color)}>
            <X size={14} />
          </button>
        </div>
      ))}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
          >
            Pick Color
          </Button>
        </PopoverTrigger>
        {isPickerOpen && (
          <PopoverContent className="p-2 grid grid-cols-5 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color }}
                onClick={() => addColor(color)}
              />
            ))}
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
