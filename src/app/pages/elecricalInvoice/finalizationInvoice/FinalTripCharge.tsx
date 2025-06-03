/* eslint-disable @typescript-eslint/no-explicit-any */

import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";
import { tripChargeAtom } from "../../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";

const FinalTripCharge = () => {
  const [tripCharge] = useAtom(tripChargeAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeTripChargeData = tripCharge[activeTabIndex];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent">
      <div className="flex flex-col w-full h-fit mt-6 gap-y-4 bg-transparent">
        {activeTripChargeData.isStandardCost && (
          <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
            <div className="flex justify-start items-center px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
              Amount for Traveling*
            </div>
            <div className="flex justify-start items-center p-3 outline-none border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[8px] focus:border-[#00C5FF] w-full h-[51px]">
              {activeTripChargeData.tripChargeVal}
            </div>
          </div>
        )}
        {activeTripChargeData.isStandardCost &&
          activeTripChargeData.isCalculateCost && (
            <div className="flex w-full text-center dark:text-white justify-center items-center text-lg font-[400] my-4 bg-transparent">
              or
            </div>
          )}
        <div className="flex flex-col justify-between items-start w-full gap-y-4 bg-transparent">
          {activeTripChargeData.isCalculateCost && (
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-col w-[45%] mt-1 bg-transparent">
                <div className="flex justify-start items-center text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Amount $ per Miles*
                </div>

                <div className="flex justify-start items-center p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                  {activeTripChargeData.amountPerMiles}
                </div>
              </div>

              <div className="flex flex-col w-[45%] mt-1 bg-transparent">
                <div className="flex justify-start items-center text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Miles Traveled*
                </div>

                <div className="flex justify-start items-center p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                  {activeTripChargeData.traveledMiles}
                </div>
              </div>
            </div>
          )}
        </div>
        {(activeTripChargeData.isStandardCost ||
          activeTripChargeData.isCalculateCost) && <div className="flex flex-row justify-between items-start w-full bg-transparent">
          <div className="flex flex-col items-start w-[200px] bg-transparent">
            <div className="flex justify-start items-center text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Total Amount*
            </div>
            <div className="flex justify-start items-center p-2 border-2 border-[#A9A5A5] dark:border-white  dark:text-white rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
              ${activeTripChargeData.totalMilesAmount}
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FinalTripCharge;
