import { Box, Typography } from "@mui/material";
import OrderItem from "../../components/OrderItem";
import { OrderItemType } from "../../config/Types";

interface OrdersProps {
  sales: OrderItemType[];
}

const Orders: React.FC<OrdersProps> = ({ sales }) => {
  return (
    <Box
      sx={{ gap: 2, marginLeft: "5%", marginRight: "5%", paddingBottom: "5%" }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: 4, color: "black", textAlign: "left" }}
      >
        Sales History
      </Typography>
      {sales.map((saleItem) => (
        <OrderItem key={saleItem.id} sale={saleItem} />
      ))}
    </Box>
  );
};

export default Orders;
