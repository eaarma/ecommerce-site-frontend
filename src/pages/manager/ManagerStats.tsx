import { Box, Grid, Paper, Typography } from "@mui/material";
import { Item, SalesHistoryItem } from "../../config/Types";

interface ManagerStatsProps {
  items: Item[];
  salesItems: SalesHistoryItem[];
}

const ManagerStats: React.FC<ManagerStatsProps> = ({ items, salesItems }) => {
  const currentDate = new Date(); // Get today's date

  // Filter sales for shopId 123 and compare saleDate with today's date
  const currentlySoldItems = salesItems.filter(
    (sale) =>
      sale.shopId === 123 &&
      new Date(sale.saleDate).toLocaleDateString() <
        currentDate.toLocaleDateString()
  ).length;

  const totalSoldItems = salesItems
    .filter((sale) => sale.shopId === 123)
    .reduce((sum, sale) => sum + sale.quantitySold, 0);

  const itemsSoldToday = salesItems.filter(
    (sale) =>
      sale.shopId === 123 &&
      new Date(sale.saleDate).toLocaleDateString() ===
        currentDate.toLocaleDateString()
  ).length;

  const itemsSoldInThirtyDays = items.filter(
    (item) => item.shopId === 123
  ).length; // You can modify this based on your actual data

  const totalRevenue = salesItems
    .filter((sale) => sale.shopId === 123)
    .reduce((sum, sale) => sum + sale.profit, 0);

  const revenueToday = salesItems
    .filter(
      (sale) =>
        sale.shopId === 123 &&
        new Date(sale.saleDate).toLocaleDateString() ===
          currentDate.toLocaleDateString()
    )
    .reduce((sum, sale) => sum + sale.profit, 0);

  const stats = {
    currentlySoldItems,
    totalSoldItems,
    itemsSoldToday,
    itemsSoldInThirtyDays,
    totalRevenue,
    revenueToday,
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {key.replace(/([A-Z])/g, " $1")}:
              </Typography>
              <Typography variant="h5">{value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManagerStats;
