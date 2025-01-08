import React from "react";
import InvoiceInfo from "./InvoiceInfo";
import ClientDetails from "./ClientDetails";
import ItemSelectionScreen from "./ItemSelection";
import TripCharge from "./TripCharge";
import LabourSection from "./labourSection";
import { useAtom } from "jotai";
import { stepsAtom } from "../../../variables/Home";
import Finished from "../../../components/finished/Finished";
import FinalizeSection from "./FinalizeSection";
import TaxRate from "./TaxRate";
import TermsConditions from "./TermsConditions";
import ClientContractorSign from "./ClientContractorSign";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
// import InvoiceBill from "../../../components/invoiceBill/InvoiceBill";

const ElecricalInvoiceHero = () => {
  const [stepsData] = useAtom(stepsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeSteps = stepsData[activeTabIndex];

  return (
    <div>
      {activeSteps.electricalSteps == 1 && <InvoiceInfo />}
      {activeSteps.electricalSteps == 2 && <ClientDetails />}
      {activeSteps.electricalSteps == 3 && <ItemSelectionScreen />}
      {activeSteps.electricalSteps == 4 && <LabourSection />}
      {activeSteps.electricalSteps == 5 && <TripCharge />}
      {activeSteps.electricalSteps == 6 && <TaxRate />}
      {activeSteps.electricalSteps == 7 && <TermsConditions />}
      {activeSteps.electricalSteps == 8 && <ClientContractorSign />}
      {activeSteps.electricalSteps == 9 && <FinalizeSection />}
      {activeSteps.electricalSteps == 10 && <Finished />}
      {/* {activeSteps.electricalSteps == 11 && <InvoiceBill />} */}
    </div>
  );
};

export default ElecricalInvoiceHero;
