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
import { Add as AddIcon } from "@mui/icons-material";

const AddItemPage: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [selectedColor, setSelectedColor] = useState("");
  const [itemSize, setItemSize] = useState("");
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, ""]);
  };

  const handleCustomFieldChange = (index: number, value: string) => {
    const updatedFields = [...customFields];
    updatedFields[index] = value;
    setCustomFields(updatedFields);
  };

  return (
    <Box sx={{ padding: 3, marginLeft: "10%", marginRight: "10%" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Add/Modify Item
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
        {/* Image Upload */}
        <Grid item xs={12}>
          <Box
            sx={{
              width: 200,
              height: 200,
              border: "2px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="file"
              style={{ display: "none" }}
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <AddIcon fontSize="large" />
              )}
            </label>
          </Box>
        </Grid>

        {/* Product Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
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
          />
        </Grid>

        {/* Price Per Item */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price Per Item"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>

        {/* Available Quantity */}
        <Grid item xs={12}>
          <FormControl fullWidth>
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
          </FormControl>
        </Grid>

        {/* More Options Section */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            More Options
          </Typography>
        </Grid>

        {/* Choose Available Colors */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Pick a Color</InputLabel>
            <Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              label="Pick a Color"
            >
              {["Red", "Green", "Blue"].map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Item Size */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Size"
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
          />
        </Grid>

        {/* Add Custom Fields */}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleAddCustomField}>
            + Add Custom
          </Button>
        </Grid>

        {customFields.map((field, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              fullWidth
              label={`Custom Field ${index + 1}`}
              value={field}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" color="primary">
          Save Item
        </Button>
      </Box>
    </Box>
  );
};

export default AddItemPage;
