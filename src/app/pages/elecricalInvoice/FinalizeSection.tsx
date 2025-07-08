import {
  clientContractorAtom,
  taxRateAtom,
  termConditionAtom,
  tripChargeAtom,
} from "../../../variables/electricalInvoiceVariable";
import { breakDownAtom, invoiceSelectAtom } from "../../../variables/Home";
import { useAtom } from "jotai";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import FinalizeItemSelection from "./finalizationInvoice/FinalizeItemSelection";
import FinalInvoiceInfo from "./finalizationInvoice/FinalInvoiceInfo";
import FinalClientDetails from "./finalizationInvoice/FinalClientDetails";
import FinalLabourSection from "./finalizationInvoice/FinalLabourSection";
import FinalTripCharge from "./finalizationInvoice/FinalTripCharge";
import FinalTaxRate from "./finalizationInvoice/FinalTaxRate";
import FinalClientContractorSign from "./finalizationInvoice/FinalClientContractorSign";
import FinalTermsConditions from "./finalizationInvoice/FinalTermsConditions";

const FinalizeSection = () => {
  const [invoiceSelect] = useAtom(invoiceSelectAtom);
  // const [labourStateVariable] = useAtom(labourStateAtom);
  const [tripCharge] = useAtom(tripChargeAtom);
  const [taxRate] = useAtom(taxRateAtom);
  const [termsCondition] = useAtom(termConditionAtom)

  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [clientContractorData] = useAtom(clientContractorAtom);
  const [breakDown] = useAtom(breakDownAtom);
  const activeSelectedInvoice = invoiceSelect[activeTabIndex];
  const activeSelectedBreakDown = breakDown[activeTabIndex];
  const activeTripChargeData = tripCharge[activeTabIndex];
  const activeTaxData = taxRate[activeTabIndex]
  const activeTAndCTabData = termsCondition[activeTabIndex]

  return (
    <div
      id="finalizeSectionTour"
      className="flex flex-col justify-center items-center w-full h-fit bg-transparent"
    >
      <div className="flex flex-col w-[80%] h-fit justify-center bg-transparent">
        <div className="flex w-full justify-center items-center mb-4 bg-transparent">
          <div
            className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] rounded-[10px] text-secondary bg-invoice-btn-gradient border-2 border-[#069FDA]"
          >
            {activeSelectedInvoice.selectedInvoice}
          </div>
        </div>
        <FinalInvoiceInfo />
      </div>

      <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
        <div className="flex w-full justify-center items-center mb-4 bg-transparent">
          <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
            Recipient Details
          </h1>
        </div>
        <FinalClientDetails />
      </div>

      {!activeSelectedBreakDown.labourBreakDown && (
        <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
          <div className="flex w-full justify-center items-center mb-4 bg-transparent">
            <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
              {/* Labour {">"} {labourStateVariable[activeTabIndex].labourType}{" "}
              {">"} {labourStateVariable[activeTabIndex].labourSelectedVal} */}
              Labour
            </h1>
          </div>
          <FinalLabourSection />
        </div>
      )}

      {!activeSelectedBreakDown.materialBreakDown && (
        <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
          <div className="flex w-full justify-center items-center bg-transparent mb-4">
            <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
              Material
            </h1>
          </div>
          <FinalizeItemSelection />
        </div>
      )}
      
      {(!activeSelectedBreakDown.tripChargeBreakDown && (activeTripChargeData.isCalculateCost || activeTripChargeData.isStandardCost)) && (
        <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
          <div className="flex w-full justify-center items-center bg-transparent mb-4">
            <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
              Trip Charge
            </h1>
          </div>
          <FinalTripCharge />
        </div>
      )}
      {activeTaxData.tax.length>0 && <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
        <div className="flex w-full justify-center items-center bg-transparent mb-4">
          <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
            Tax Rate
          </h1>
        </div>
        <FinalTaxRate />
      </div>}
      {clientContractorData[activeTabIndex].sign === "Yes" && (
        <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
          <div className="flex w-full justify-center items-center bg-transparent mb-4">
            <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
              Contractors & Client Signatures
            </h1>
          </div>
          <FinalClientContractorSign />
        </div>
      )}
      {activeTAndCTabData.termAndCondition.length>0 && <div className="flex flex-col mt-6 w-[80%] h-fit justify-center bg-transparent">
        <div className="flex w-full justify-center items-center bg-transparent mb-4">
          <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
            Terms & Conditions
          </h1>
        </div>
        <FinalTermsConditions />
      </div>}
    </div>
  );
};

export default FinalizeSection;
