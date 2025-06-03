import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";
import { taxRateAtom } from "../../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";

const FinalTaxRate = () => {
  const [taxRate] = useAtom(taxRateAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeTaxData = taxRate[activeTabIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
      <div className="flex flex-col justify-center items-center w-full h-fit gap-y-4 bg-transparent">
        <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
          <div className="flex justify-start items-center px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
            Tax Rate*
          </div>
          <div className=" flex justify-start items-center p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full h-[51px]">
            {activeTaxData.tax}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalTaxRate;
