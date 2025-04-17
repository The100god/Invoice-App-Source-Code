import { clientContractorAtom, labourStateAtom } from '../../../variables/electricalInvoiceVariable';
import { breakDownAtom, invoiceSelectAtom } from '../../../variables/Home';
import { useAtom } from 'jotai';
import InvoiceInfo from './InvoiceInfo';
import ClientDetails from './ClientDetails';
import ItemSelectionScreen from './ItemSelection';
import TripCharge from './TripCharge';
import LabourSection from "./labourSection";
import TaxRate from './TaxRate';
import TermsConditions from './TermsConditions';
import ClientContractorSign from './ClientContractorSign';
import { activeTabIndexAtom } from '../../../variables/NavbarVariables';
import FinalizeItemSelection from './FinalizeItemSelection';

const FinalizeSection = () => {
  const [invoiceSelect,] = useAtom(invoiceSelectAtom);
  const [labourStateVariable,] = useAtom(labourStateAtom)
  const [activeTabIndex,] = useAtom(activeTabIndexAtom)
  const [clientContractorData,] = useAtom(clientContractorAtom)
  const [breakDown,] = useAtom(breakDownAtom) 
  const activeSelectedInvoice= invoiceSelect[activeTabIndex]
  const activeSelectedBreakDown= breakDown[activeTabIndex]
  return (
    <div id='finalizeSectionTour' className="flex flex-col justify-center items-center w-full h-fit bg-transparent">
                <div className="flex flex-col w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <button disabled className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] rounded-[10px] text-secondary bg-invoice-btn-gradient border-2 border-[#069FDA]">
                      {activeSelectedInvoice.selectedInvoice}
                    </button>
                  </div>
                  <InvoiceInfo />
                </div>

                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Recipient Details
                    </h1>
                  </div>
                  <ClientDetails />
                </div>

                {!activeSelectedBreakDown.materialBreakDown && <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Invoice Content
                    </h1>
                  </div>
                  <FinalizeItemSelection />
                </div>}
                {!activeSelectedBreakDown.labourBreakDown && <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Labour {">"} {labourStateVariable[activeTabIndex].labourType} {">"} {labourStateVariable[activeTabIndex].labourSelectedVal}
                    </h1>
                  </div>
                  <LabourSection />
                </div>}
                {!activeSelectedBreakDown.tripChargeBreakDown && <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Trip Charge
                    </h1>
                  </div>
                  <TripCharge />
                </div>}
                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                    Tax Rate (Optional)
                    </h1>
                  </div>
                  <TaxRate />
                </div>
                {
                  clientContractorData[activeTabIndex].sign === "Yes" && 
                  <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                    Client/Contractor Signature (Optional)
                    </h1>
                  </div>
                  <ClientContractorSign />
                </div>
                }
                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                    Terms & Conditions (Optional)
                    </h1>
                  </div>
                  <TermsConditions />
                </div>
              </div>
  )
}

export default FinalizeSection
