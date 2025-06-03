import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";
import { termConditionAtom } from "../../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";

const FinalTermsConditions = () => {
  const [termsCondition] = useAtom(termConditionAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeTAndCTabData = termsCondition[activeTabIndex];

  return (
    <div className="w-full h-full px-4 pb-4 flex flex-col items-center justify-center bg-transparent">
      <div className="flex flex-col w-full justify-center items-center h-fit mt-10 gap-y-4 bg-transparent">
        <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
          <div className="flex justify-start items-center px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
            Terms & Conditions*
          </div>
          <div className="flex justify-start items-center p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full h-fit">
            {activeTAndCTabData.termAndCondition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalTermsConditions;
