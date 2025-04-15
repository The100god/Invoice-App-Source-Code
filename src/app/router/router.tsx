import { HashRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import App from "../App";
import Home from "../pages/Home";
import InvoiceSelection from "../pages/InvoiceSelection";
import InvoiceBill from "../../components/invoiceBill/InvoiceBill";
import SelectedExistingProject from "../../components/setectedExistingProject/SelectedExistingProject";
import SelectMaterialPage from "../../components/selectMaterialPage/SelectMaterialPage";
import EditAddAttributePopUp from "../../components/editAddAttribute/EditAddAttribute";
import HomePage from "../pages/HomePage";
// import InvoiceInfo from "../pages/InvoiceInfo";
// import ClientDetails from "../pages/ClientDetails";
// import ItemSelectionScreen from "../pages/ItemSelection";

// const Home = lazy(() => import("../pages/Home"));
// const InvoiceSelection = lazy(() => import("../pages/InvoiceSelection"));
// const InvoiceBill = lazy(
//   () => import("../../components/invoiceBill/InvoiceBill")
// );
// const SelectedExistingProject = lazy(
//   () =>
//     import("../../components/setectedExistingProject/SelectedExistingProject")
// );
// const SelectMaterialPage = lazy(
//   () => import("../../components/selectMaterialPage/SelectMaterialPage")
// );
// const EditAddAttributePopUp = lazy(
//   () => import("../../components/editAddAttribute/EditAddAttribute")
// );
// const HomePage = lazy(() => import("../pages/HomePage"));

import { useAtom } from "jotai";
import {
  activeProjectIdAtom,
  projectsAtom,
} from "../../variables/NavbarVariables";

const AppRouter = () => {
  const [projects] = useAtom(projectsAtom); // List of projects
  const [activeProjectId] = useAtom(activeProjectIdAtom); // Active project ID

  return (
    // <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="info/:invoice-type" element={<InvoiceInfo />} /> */}
            {/* <Route path="client-details" element={<ClientDetails />} /> */}
            {/* <Route path="item-selection" element={<ItemSelectionScreen />} /> */}
            {/* Redirect to the first project if no matching route */}

            <Route index element={<HomePage />} />
            {/* <Route index element={<InvoiceBill />} /> */}
            <Route path="/project/bill" element={<InvoiceBill />} />
            <Route path="/project/selection" element={<InvoiceSelection />} />
            <Route
              path="/project/selectMaterial"
              element={<SelectMaterialPage />}
            />
            <Route
              path="/project/EditAddAttribute"
              element={<EditAddAttributePopUp />}
            />
            <Route
              path="/project/existingPtoject"
              element={<SelectedExistingProject />}
            />
            {/* Initially open the first project */}
            {projects.map((project) => (
              <Route
                key={project.id}
                path={`/project/${project.id}`}
                element={<Home />}
              />
            ))}
            <Route
              path="*"
              element={
                activeProjectId !== null ? (
                  <Home />
                ) : (
                  <Home projectId={projects[0]?.id} />
                )
              }
            />
          </Route>
        </Routes>
      </Suspense>
    // </HashRouter>
  );
};

export default AppRouter;
