import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import { stepsAtom } from "../../../variables/Home";
import { useAtom } from "jotai";

const ElectricalInvoiceHeading = () => {
  const [stepsData] = useAtom(stepsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const activeSteps = stepsData[activeTabIndex];
  return (
    <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] bg-transparent">
      {activeSteps.electricalSteps == 1 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Select theType of Invoice
          </h1>
          <p className="text-[18px] leading-5 font-[400] text-center w-[75%] bg-transparent">
            Choose the type of invoice that best matches the proect phase
          </p>
        </>
      )}
      {activeSteps.electricalSteps == 2 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Recipient Details
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 3 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Labour
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 4 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Invoice Content
          </h1>
        </>
      )}
      
      {activeSteps.electricalSteps == 5 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Trip Charge (Optional)
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 6 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Tax Rate (Optional)
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 7 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Terms & Conditions (Optional)
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 8 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Client/Contractor Signature (Optional)
          </h1>
        </>
      )}
      {activeSteps.electricalSteps == 9 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Finalization
          </h1>
        </>
      )}
    </div>
  );
};

export default ElectricalInvoiceHeading;
