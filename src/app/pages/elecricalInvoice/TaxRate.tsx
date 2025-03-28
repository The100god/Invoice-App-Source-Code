
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import { taxRateAtom } from "../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";

const TaxRate = () => {

    const [taxRate, setTaxRate] = useAtom(taxRateAtom);
    const [activeTabIndex]= useAtom(activeTabIndexAtom)

    const updateTaxData = (key:keyof typeof activeTaxData, value:string)=>{
      setTaxRate((prev)=>{
        const updated = [...prev]
        updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;

      })
    }
    
    const activeTaxData = taxRate[activeTabIndex]

    return (
      <div id="taxRateTour" className="w-full h-full px-4 pb-4 flex flex-col items-center justify-center bg-transparent">
        <div className="flex flex-col justify-center items-center w-[361px] h-fit mt-10 gap-y-4 bg-transparent">
        <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
            <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
            Tax Rate (Leave blank if none)*
            </label>
            <input
              type="number"
              placeholder="Enter the % of tax rate"
              value={activeTaxData.tax}
              onChange={(e) => {
                updateTaxData("tax", e.target.value)
                // setTaxRate(e.target.value);
                // setTaxRateError("");
              }}
              className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full h-[51px]"
            />
            {/* {taxRateError && (
              <p className="text-red-500 mt-1">{tripChargeError}</p>
            )} */}
          </div>
        </div>
      </div>
    );
  };

export default TaxRate;
