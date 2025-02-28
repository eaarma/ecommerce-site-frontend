import { Box, Button } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateDeliveryMethodDetails } from "../redux/deliveryMethodSlice"; // Adjust path as needed

const SmartPostWidget: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // Function to handle saving the current locker selection from the widget's DOM
  const handleSaveSelection = () => {
    if (widgetRef.current) {
      // Query for the elements within the widget container
      const spIdEl = widgetRef.current.querySelector(
        "select[name='sp_id']"
      ) as HTMLSelectElement;
      const spNameEl = widgetRef.current.querySelector(
        "input[name='sp_name']"
      ) as HTMLInputElement;
      const spCityEl = widgetRef.current.querySelector(
        "input#smartpost_city0"
      ) as HTMLInputElement;
      const spAddressEl = widgetRef.current.querySelector(
        "input#smartpost_address0"
      ) as HTMLInputElement;

      if (spIdEl && spNameEl && spCityEl && spAddressEl) {
        const selectedId = spIdEl.value;
        const selectedName = spNameEl.value;
        const city = spCityEl.value;
        const address = spAddressEl.value;
        console.log("Saving SmartPost selection:", {
          selectedId,
          selectedName,
          city,
          address,
        });
        dispatch(
          updateDeliveryMethodDetails({
            provider: "SmartPost",
            name: selectedName,
            address: `${address}, ${city}`, // Concatenate address and city\n
            country: "EE", // Default to Estonia\n
            price: 0, // Set delivery fee if applicable\n
          })
        );
      } else {
        console.error("SmartPost widget elements not found in the container.");
      }
    }
  };

  useEffect(() => {
    // Load SmartPost script dynamically
    const script = document.createElement("script");
    script.src = "https://itella.ee/widget/smartpost-terminals.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    // Load SmartPost styles
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://itella.ee/widget/smartpost-terminals.css";
    document.head.appendChild(link);

    script.onload = () => {
      if (widgetRef.current) {
        // Initialize SmartPost widget with extended options
        new window.SmartLocation({
          target_id: "smartpost_widget_target",
          placeid_name: "sp_id",
          placename_name: "sp_name",
          selected_id: 136,
          default_id: 0,
          show_infotext: true,
          show_logo: true,
          show_city: true,
          show_address: true,
          show_opened: true,
          show_description: false,
          show_default: false,
          text_place: "Asukoht",
          text_city: "Linn",
          text_address: "Aadress",
          text_opened: "Avatud",
          text_description: "Kirjeldus",
          text_default_item: "- Vali PA -",
          // Auto-save selection to Redux
          callback: (data) => {
            console.log("Selected SmartPost location:", data);
            dispatch(
              updateDeliveryMethodDetails({
                provider: "SmartPost",
                name: data.name, // Adjust based on structure
                address: data.address,
                country: data.country || "EE", // Default to Estonia
                price: 0, // Adjust price if needed
              })
            );
          },
        });
      }
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%", // Ensures the box takes the full width
      }}
    >
      <div id="smartpost_widget_target" ref={widgetRef}></div>
      {/* Save Selection Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 2,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSelection}
        >
          Save Locker Selection
        </Button>
      </Box>
    </Box>
  );
};

export default SmartPostWidget;
