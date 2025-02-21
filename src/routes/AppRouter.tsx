import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ItemsPage from "../pages/ItemsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/manager/LoginPage";
import PaymentPage from "../pages/PaymentPage";
import ManagePage from "../pages/manager/ManagerPage";
import ItemPage from "../pages/ItemPage";
import EditAddItemPage from "../pages/manager/EditAddItemPage";
import ManagerItemPage from "../pages/manager/ManagerItemPage";
import SalesHistoryItemPage from "../pages/manager/OrderItemPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/item-page" element={<ItemPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/manage" element={<ManagePage />} />
      <Route path="/manager-item-page" element={<ManagerItemPage />} />
      <Route path="/sales-item-page" element={<SalesHistoryItemPage />} />

      <Route path="/add-item-page" element={<EditAddItemPage type="add" />} />
      <Route path="/edit-item-page" element={<EditAddItemPage type="edit" />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout-details" element={<CheckoutPage />} />
      <Route path="/checkout-payment" element={<PaymentPage />} />
    </Routes>
  );
};

export default AppRouter;
