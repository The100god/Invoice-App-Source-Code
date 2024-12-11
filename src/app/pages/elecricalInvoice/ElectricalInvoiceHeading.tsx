import { stepsAtom } from "../../../variables/Home";
import { useAtom } from "jotai";
import React from "react";

const ElectricalInvoiceHeading = () => {
  const [electricalSteps] = useAtom(stepsAtom);
  return (
    <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] bg-transparent">
      {electricalSteps == 1 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Select theType of Invoice
          </h1>
          <p className="text-[18px] leading-5 font-[400] text-center w-[75%] bg-transparent">
            Choose the type of invoice that best matches the proect phase
          </p>
        </>
      )}
      {electricalSteps == 2 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Recipient Details
          </h1>
        </>
      )}
      {electricalSteps == 3 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Invoice Content
          </h1>
        </>
      )}
      {electricalSteps == 4 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Labour
          </h1>
        </>
      )}
      {electricalSteps == 5 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
          Trip Charge (Optional)
          </h1>
        </>
      )}
      {electricalSteps == 6 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
          Tax Rate (Optional)
          </h1>
        </>
      )}
      {electricalSteps == 7 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
          Terms & Conditions (Optional)
          </h1>
        </>
      )}
      {electricalSteps == 8 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
          Client/Contractor Signature (Optional)
          </h1>
        </>
      )}
      {electricalSteps == 9 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Finalization
          </h1>
        </>
      )}
      {electricalSteps == 10 && (
        <>
          <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
            Finished
          </h1>
        </>
      )}
    </div>
  );
};

export default ElectricalInvoiceHeading;
