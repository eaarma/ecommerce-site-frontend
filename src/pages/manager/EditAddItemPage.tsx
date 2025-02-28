import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ColorPicker from "../../components/ColorPicker";
import BackButton from "../../components/BackButton";
import { useLocation } from "react-router-dom";
import { createItem, updateItemById } from "../../api/itemService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface EditAddItemPageProps {
  type: "add" | "edit";
}

const EditAddItemPage: React.FC<EditAddItemPageProps> = ({ type }) => {
  const [productName, setProductName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [itemWidth, setItemWidth] = useState("");
  const [itemLength, setItemLength] = useState("");
  const [itemHeight, setItemHeight] = useState("");
  const [itemVolume, setItemVolume] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [category, setCategory] = useState("");

  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const location = useLocation();
  const item = location.state?.item;
  const shopId = useSelector((state: RootState) => state.auth.shopId); // Access shopId from Redux

  useEffect(() => {
    const width = Number(itemWidth);
    const length = Number(itemLength);
    const height = Number(itemHeight);

    if (width > 0 && length > 0 && height > 0) {
      setItemVolume((width * length * height).toString());
    } else {
      setItemVolume(""); // Reset if any value is missing or invalid
    }
  }, [itemWidth, itemLength, itemHeight]);

  //Loads info from item values into the fields
  useEffect(() => {
    if (type === "edit" && item) {
      setProductName(item.name || "");
      setItemDescription(item.description || "");
      setPrice(item.price || "");
      setQuantity(item.stock || "");

      // Only set the colors if they differ from the existing selected colors
      setSelectedColors(Array.isArray(item.colors) ? item.colors : []);

      const traits = [
        item.trait1,
        item.trait2,
        item.trait3,
        item.trait4,
        item.trait5,
      ].filter(
        (trait) => trait !== undefined && trait !== null && trait !== ""
      );

      setCustomFields(traits);
    }
  }, [type, item]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newImages = [...images, ...files].slice(0, 6); // Limit to 6 images
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
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

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  // Categories
  const categories = ["category1", "category2", "category3"];

  const validateFields = () => {
    const newErrors: string[] = [];

    if (!productName.trim()) newErrors.push("productName");
    if (!itemDescription.trim()) newErrors.push("itemDescription");
    if (!itemWidth.trim()) newErrors.push("itemWidth");
    if (!itemLength.trim()) newErrors.push("itemLength");
    if (!itemHeight.trim()) newErrors.push("itemHeight");
    if (!itemWeight.trim()) newErrors.push("itemWeight");

    if (!price) newErrors.push("price");
    if (!quantity) newErrors.push("quantity");

    customFields.forEach((field, index) => {
      if (!field.trim()) newErrors.push(`customField${index}`);
    });

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (validateFields()) {
      const newItem = {
        name: productName,
        description: itemDescription,
        width: Number(itemWidth),
        length: Number(itemLength),
        height: Number(itemHeight),
        volume: Number(itemVolume),
        weight: Number(itemWeight),
        price: Number(price), // Ensure numeric values are sent as numbers
        stock: Number(quantity),
        category: category,
        colors: selectedColors, // Array of colors
        shopId: shopId,
        trait1: customFields[0] || null, // Send null if empty
        trait2: customFields[1] || null,
        trait3: customFields[2] || null,
        trait4: customFields[3] || null,
        trait5: customFields[4] || null,
        status: "active",
      };

      console.log("Item Payload:", newItem);

      try {
        if (type === "edit" && item?.id) {
          await updateItemById(item.id, newItem);
          console.log("Item updated successfully!");
        } else {
          const createdItem = await createItem(newItem);
          console.log("New item created successfully!", createdItem);
        }
      } catch (error) {
        console.error("Failed to save item:", error);
      }
    }
  };

  const isFieldError = (fieldName: string) => errors.includes(fieldName);

  return (
    <Box sx={{ padding: 3, marginLeft: "20%", marginRight: "20%" }}>
      {/* Back Button */}
      <BackButton />

      {/* Page title */}
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

        {/* Item width */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Width (cm)"
            value={itemWidth}
            onChange={(e) => setItemWidth(e.target.value)}
            rows={4}
            error={isFieldError("itemWidth")}
            helperText={isFieldError("itemWidth") && "This field is required"}
          />
        </Grid>

        {/* Item length */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Length (cm)"
            value={itemLength}
            onChange={(e) => setItemLength(e.target.value)}
            rows={4}
            error={isFieldError("itemLength")}
            helperText={isFieldError("itemLength") && "This field is required"}
          />
        </Grid>

        {/* Item Height */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Height (cm)"
            value={itemHeight}
            onChange={(e) => setItemHeight(e.target.value)}
            rows={4}
            error={isFieldError("itemHeight")}
            helperText={isFieldError("itemHeight") && "This field is required"}
          />
        </Grid>

        {/* Item Weight */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item Weight (g)"
            value={itemWeight}
            onChange={(e) => setItemWeight(e.target.value)}
            rows={4}
            error={isFieldError("itemWeight")}
            helperText={isFieldError("itemWeight") && "This field is required"}
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Available Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={isFieldError("quantity")}
            helperText={
              isFieldError("quantity") ? "This field is required" : ""
            }
            // Optional: force numeric input (works on mobile browsers)
            type="number"
            inputProps={{ min: 0 }}
          />
        </Grid>
        {/* Color Picker */}
        <Grid item xs={12}>
          <ColorPicker
            colors={selectedColors} // pass current state
            onColorsChange={setSelectedColors} // update parent's state
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              sx={{ textAlign: "left" }} // Ensures text inside the Select stays left-aligned
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat}
                  value={cat}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
