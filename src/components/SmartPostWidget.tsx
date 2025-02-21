import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateDeliveryMethodDetails } from "../redux/deliveryMethodSlice"; // Adjust path as needed

const SmartPostWidget = () => {
  const widgetRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://itella.ee/widget/smartpost-terminals.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://itella.ee/widget/smartpost-terminals.css";
    document.head.appendChild(link);

    script.onload = () => {
      if (widgetRef.current) {
        const widgetInstance = new window.SmartLocation({
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
          callback: (data) => {
            console.log("Selected SmartPost location:", data);
            dispatch(
              updateDeliveryMethodDetails({
                provider: "SmartPost",
                name: data.name, // Adjust if the structure is different
                address: data.address,
                country: data.country || "EE", // Default to Estonia if not provided
                price: 0, // Set delivery fee if needed
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
    <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
      <div id="smartpost_widget_target" ref={widgetRef}></div>
    </Box>
  );
};

export default SmartPostWidget;
