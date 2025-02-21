import React, { useState } from "react";
import { Grid, Button, Menu, MenuItem, Box } from "@mui/material";

const colorOptions = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
];

interface ColorPickerProps {
  colors: string[]; // current colors from the parent
  onColorsChange: (colors: string[]) => void; // parent updates the colors
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  onColorsChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color: string) => {
    if (!colors.includes(color)) {
      onColorsChange([...colors, color]);
    }
    handleClose();
  };

  const handleColorRemove = (color: string) => {
    onColorsChange(colors.filter((c) => c !== color));
  };

  return (
    <Grid container spacing={2} alignItems="flex-start">
      {/* Color Picker Button */}
      <Grid item xs={12}>
        <Box display="flex">
          <Button variant="contained" onClick={handleClick}>
            Pick a Color
          </Button>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {colorOptions.map((color) => (
            <MenuItem key={color} onClick={() => handleColorSelect(color)}>
              {color}
            </MenuItem>
          ))}
        </Menu>
      </Grid>

      {/* Display Selected Colors with Removal Option */}
      <Grid item xs={12}>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {colors.map((color) => (
            <Box
              key={color}
              onClick={() => handleColorRemove(color)}
              sx={{
                width: 50,
                height: 50,
                backgroundColor: color.toLowerCase(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                color: "white",
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              {color}
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ColorPicker;
