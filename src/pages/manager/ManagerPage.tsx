import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import SalesHistory from "./Orders";
import ManagerStats from "./ManagerStats";
import SellingItems from "./SellingItems";
import { fetchItemsByShopId } from "../../api/itemService";
import { Item, OrderItemType } from "../../config/Types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchOrdersByShopId } from "../../api/orderService";

const ManagerPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // Assuming 'Item' is the type for item objects
  const [salesItems, setSalesItems] = useState<OrderItemType[]>([]); // Assuming 'SalesHistoryItem' is the type for sales history
  const [error, setError] = useState<string | null>(null);
  const shopId = useSelector((state: RootState) => state.auth.shopId); // Access shopId from Redux

  useEffect(() => {
    if (shopId !== null) {
      console.log("Fetching items for shopId:", shopId);
      const fetchData = async () => {
        try {
          const data = await fetchItemsByShopId(shopId); // shopId is a number
          setItems(data);
        } catch (err) {
          setError("Failed to load items. Please try again later.");
        }
      };

      console.log("Fetching sales for shopId:", shopId);
      const fetchSalesData = async () => {
        try {
          const data = await fetchOrdersByShopId(shopId); // shopId is a number
          setSalesItems(data);
        } catch (err) {
          setError("Failed to load sales history. Please try again later.");
        }
      };

      fetchData();
      fetchSalesData();
    } else {
      setError("Invalid shopId.");
    }
  }, [shopId]); // Run when shopId changes

  return (
    <Box
      sx={{
        padding: 4,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "1%",
      }}
    >
      {/* Pass the data to the ManagerStats component */}
      <ManagerStats items={items} salesItems={salesItems} />

      <Divider sx={{ marginY: 4 }} />

      {/* Items On Sale Section */}
      <SellingItems items={items} />

      <Divider sx={{ marginY: 4 }} />

      {/* Sales History Section */}
      <SalesHistory sales={salesItems} />
    </Box>
  );
};

export default ManagerPage;
