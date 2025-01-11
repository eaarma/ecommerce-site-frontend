import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { ChromePicker } from "react-color"; // Import the color picker library
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";

interface EditAddItemPageProps {
  type: "add" | "edit";
}

const EditAddItemPage: React.FC<EditAddItemPageProps> = ({ type }) => {
  const [productName, setProductName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [itemSize, setItemSize] = useState("");
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false); // Controls the visibility of the color picker dropdown
  const [currentColor, setCurrentColor] = useState("#fff"); // Stores the currently selected color
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const navigate = useNavigate();

  const pickerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setColorPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newImages = [...images, ...files].slice(0, 6); // Limit to 6 images
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleAddColor = (color: string) => {
    if (selectedColors.length < 6 && !selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    const updatedColors = selectedColors.filter((c) => c !== color);
    setSelectedColors(updatedColors);
  };

  const handleAddCustomField = () => {
    if (customFields.length < 5) {
      setCustomFields([...customFields, ""]);
    }
  };

  const handleRemoveCustomField = (index: number) => {
    const updatedFields = customFields.filter((_, i) => i !== index);
    setCustomFields(updatedFields);
  };

  const handleCustomFieldChange = (index: number, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index] = value;
    setCustomFields(updatedFields);
  };

  const validateFields = () => {
    const newErrors: string[] = [];

    if (!productName.trim()) newErrors.push("productName");
    if (!itemDescription.trim()) newErrors.push("itemDescription");
    if (!price) newErrors.push("price");
    if (!quantity) newErrors.push("quantity");
    if (!selectedColors.length) newErrors.push("selectedColors");
    if (!itemSize.trim()) newErrors.push("itemSize");

    customFields.forEach((field, index) => {
      if (!field.trim()) newErrors.push(`customField${index}`);
    });

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      // Save item logic here
      console.log("Item saved successfully!");
    }
  };

  const isFieldError = (fieldName: string) => errors.includes(fieldName);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: 3, marginLeft: "20%", marginRight: "20%" }}>
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            marginBottom: 2,
            marginTop: 2,
            padding: 2,
            alignSelf: "flex-start",
          }}
          onClick={() => handleBackClick()}
        >
          Back
        </Button>
      </Box>

      <Typography
        variant="h4"
        sx={{
          marginBottom: 5,
          marginTop: 5,
          textAlign: "center",
          color: "black",
        }}
      >
        {type === "add" ? "Add Item" : "Edit Item"}
      </Typography>

      <Grid container spacing={3}>
        {/* Add Image(s) */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <IconButton component="span" sx={{ padding: 0, marginRight: 2 }}>
                <PhotoCameraIcon sx={{ fontSize: 40, color: "primary.main" }} />
              </IconButton>
            </label>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Upload Image(s)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  marginRight: 1,
                  marginBottom: 1,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                }}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`uploaded-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Product Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={isFieldError("productName")}
            helperText={isFieldError("productName") && "This field is required"}
          />
        </Grid>

        {/* Item Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            multiline
            rows={4}
            error={isFieldError("itemDescription")}
            helperText={
              isFieldError("itemDescription") && "This field is required"
            }
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price Per Item"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={isFieldError("price")}
            helperText={isFieldError("price") && "This field is required"}
          />
        </Grid>

        {/* Quantity */}
        <Grid item xs={12}>
          <FormControl fullWidth error={isFieldError("quantity")}>
            <InputLabel>Available Quantity</InputLabel>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label="Available Quantity"
            >
              {[1, 2, 3, 4, 5].map((qty) => (
                <MenuItem key={qty} value={qty}>
                  {qty}
                </MenuItem>
              ))}
            </Select>
            {isFieldError("quantity") && (
              <Typography variant="caption" color="error">
                This field is required
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Color Picker */}
        <Grid item xs={12}>
          <Box sx={{ position: "relative", width: "fit-content" }}>
            <Button
              variant="outlined"
              onClick={() => setColorPickerOpen((prev) => !prev)} // Toggle the color picker state
              sx={{
                width: 150,
                cursor: "pointer",
                textTransform: "none", // Keep text casing as-is
                justifyContent: "flex-start", // Align text to the left
              }}
            >
              Pick a color
            </Button>
            {colorPickerOpen && (
              <Box
                ref={pickerRef}
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 10,
                  backgroundColor: "white",
                  boxShadow: 3,
                  borderRadius: 1,
                  padding: 2,
                }}
              >
                <ChromePicker
                  color={currentColor}
                  onChange={(color) => setCurrentColor(color.hex)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 1, width: "100%" }}
                  onClick={() => {
                    handleAddColor(currentColor);
                    setColorPickerOpen(false);
                  }}
                >
                  Add
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", marginTop: 2 }}>
            {selectedColors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: color,
                  marginRight: 1,
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleRemoveColor(color)}
              >
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Item Size */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Size"
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
            error={isFieldError("itemSize")}
            helperText={isFieldError("itemSize") && "This field is required"}
          />
        </Grid>

        {/* Add Custom Fields */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleAddCustomField}
            disabled={customFields.length >= 5}
          >
            + Add Custom
          </Button>
        </Grid>
        {customFields.map((field, index) => (
          <Grid item xs={12} key={index}>
            <Box display="flex" alignItems="center">
              <TextField
                fullWidth
                label={`Custom Field ${index + 1}`}
                value={field}
                onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                error={isFieldError(`customField${index}`)}
                helperText={
                  isFieldError(`customField${index}`) &&
                  "This field is required"
                }
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveCustomField(index)}
                sx={{ marginLeft: 2 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Item
        </Button>
      </Box>
    </Box>
  );
};

export default EditAddItemPage;
