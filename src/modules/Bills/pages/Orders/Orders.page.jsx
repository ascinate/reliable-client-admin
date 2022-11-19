import { Route, Routes } from "react-router-dom";
import { YourOrders } from "./pages";
import { OTDetails, OrderTemplates } from "./pages/OrderTemplates";
import { AddEditOrder } from "./pages/AddEditOrder/AddEditOrder.page";
import { EditOrderDetails } from "./pages/AddEditOrder/EditOrderDetails.page";

const Clients = () => {
  return (
    <Routes>
      <Route path="all-orders/list" element={<YourOrders />} />
      <Route path="all-orders/list/add/new" element={<AddEditOrder />} />
      <Route path="all-orders/list/edit/:id" element={<EditOrderDetails />} />
      <Route path="your-orders/list" element={<YourOrders myOrders />} />
      <Route path="your-orders/list/add/new" element={<AddEditOrder />} />
      <Route path="your-orders/list/edit/:id" element={<EditOrderDetails />} />
      <Route path="order-templates/list" element={<OrderTemplates />} />
      <Route path="order-templates/list/add/new" element={<OTDetails />} />
      <Route path="order-templates/list/edit/:id" element={<OTDetails />} />
    </Routes>
  );
};

export default Clients;
