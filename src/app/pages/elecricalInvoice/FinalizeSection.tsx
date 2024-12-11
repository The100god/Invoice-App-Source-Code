import { labourSelectedValAtom, labourTypeAtom, signAtom } from '../../../variables/electricalInvoiceVariable';
import { invoiceSelectAtom } from '../../../variables/Home';
import { useAtom } from 'jotai';
import React from 'react'
import InvoiceInfo from './InvoiceInfo';
import ClientDetails from './ClientDetails';
import ItemSelectionScreen from './ItemSelection';
import TripCharge from './TripCharge';
import LabourSection from "./labourSection";
import TaxRate from './TaxRate';
import TermsConditions from './TermsConditions';
import ClientContractorSign from './ClientContractorSign';

const FinalizeSection = () => {
  const [invoiceSelect,] = useAtom(invoiceSelectAtom);
  const [labourType,] = useAtom(labourTypeAtom);
  const [labourSelectedVal,] = useAtom(labourSelectedValAtom);
  const [sign,] = useAtom(signAtom);
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit bg-transparent">
                <div className="flex flex-col w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <button disabled className=" flex justify-center items-center w-[200px] h-[45px] hover:border-blue-200 hover:border-2 text-[20px] font-[500] rounded-[10px] text-secondary bg-invoice-btn-gradient border-2 border-[#069FDA]">
                      {invoiceSelect}
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

                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Invoice Content
                    </h1>
                  </div>
                  <ItemSelectionScreen />
                </div>
                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center mb-6 bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Labour {">"} {labourType} {">"} {labourSelectedVal}
                    </h1>
                  </div>
                  <LabourSection />
                </div>
                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                      Trip Charge
                    </h1>
                  </div>
                  <TripCharge />
                </div>
                <div className="flex flex-col mt-6 w-full h-fit justify-center bg-transparent">
                  <div className="flex w-full justify-center items-center bg-transparent">
                    <h1 className="text-2xl text-primary dark:text-white font-[500] font-[Helvetica Neue] bg-transparent">
                    Tax Rate (Optional)
                    </h1>
                  </div>
                  <TaxRate />
                </div>
                {
                  sign === "Yes" && 
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