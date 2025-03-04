
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import { termConditionAtom } from "../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";
import React from "react";


const TermsConditions = () => {
    const [termsCondition, setTermsConditions] = useAtom(termConditionAtom)
    const [activeTabIndex] = useAtom(activeTabIndexAtom)
    // const [taxRateError, setTaxRateError] = useState("")
    const updateTermCondition = (key: keyof typeof activeTAndCTabData, value:string)=>{
      setTermsConditions((prev)=>{
        const updated = [...prev]
        updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
      })

    }

    const activeTAndCTabData = termsCondition[activeTabIndex]
    
    return (
      <div id="termsCondTour" className="w-full h-full px-4 pb-4 flex flex-col items-center justify-center bg-transparent">
        <div className="flex flex-col w-[410px] justify-center items-center h-fit mt-10 gap-y-4 bg-transparent">
        <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
            <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
            Terms & Conditions (Leave blank if none)*
            </label>
            <textarea
              placeholder="Enter the terms & conditions"
              value={activeTAndCTabData.termAndCondition}
              onChange={(e) => {
                updateTermCondition("termAndCondition", e.target.value)
                // setTermsConditions(e.target.value);
                // setTaxRateError("");
              }}
              className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full min-h-[109px]"
            />
            {/* {taxRateError && (
              <p className="text-red-500 mt-1">{tripChargeError}</p>
            )} */}
          </div>
        </div>
      </div>
    );
}

export default TermsConditions


