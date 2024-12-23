import { HashRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import InvoiceSelection from "../pages/InvoiceSelection";
// import InvoiceBill from "../../components/invoiceBill/InvoiceBill";
// import InvoiceInfo from "../pages/InvoiceInfo";
// import ClientDetails from "../pages/ClientDetails";
// import ItemSelectionScreen from "../pages/ItemSelection";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          {/* <Route index element={<InvoiceBill />} /> */}
          <Route path="selection" element={<InvoiceSelection />} />
          <Route path="/project/:id" element={<Home />} />
          {/* <Route path="info/:invoice-type" element={<InvoiceInfo />} /> */}
          {/* <Route path="client-details" element={<ClientDetails />} /> */}
          {/* <Route path="item-selection" element={<ItemSelectionScreen />} /> */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
