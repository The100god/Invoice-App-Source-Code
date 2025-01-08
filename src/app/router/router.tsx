import { HashRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import InvoiceSelection from "../pages/InvoiceSelection";
import { useAtom } from "jotai";
import { activeProjectIdAtom, projectsAtom } from "../../variables/NavbarVariables";

import InvoiceBill from "../../components/invoiceBill/InvoiceBill";
import SelectedExistingProject from "../../components/setectedExistingProject/SelectedExistingProject";
// import InvoiceInfo from "../pages/InvoiceInfo";
// import ClientDetails from "../pages/ClientDetails";
// import ItemSelectionScreen from "../pages/ItemSelection";

const AppRouter = () => {
  const [projects] = useAtom(projectsAtom); // List of projects
  const [activeProjectId] = useAtom(activeProjectIdAtom); // Active project ID
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<Home />} />
          <Route path="/project/bill" element={<InvoiceBill />} />
          <Route path="/project/selection" element={<InvoiceSelection />} />
          <Route path="/project/existingPtoject" element={<SelectedExistingProject />} />
          {/* Initially open the first project */}
          {projects.map((project, index) => (
            <Route
              key={project.id}
              path={`/project/${project.id}`}
              element={<Home />}
            />
          ))}
          {/* <Route path="info/:invoice-type" element={<InvoiceInfo />} /> */}
          {/* <Route path="client-details" element={<ClientDetails />} /> */}
          {/* <Route path="item-selection" element={<ItemSelectionScreen />} /> */}
          {/* Redirect to the first project if no matching route */}
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
    </HashRouter>
  );
};

export default AppRouter;
