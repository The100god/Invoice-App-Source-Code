// import FormField from "../../../components/form/FormField";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import {
  tripChargeAtom,
  tripChargeErrorAtom,
} from "../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";
import { useEffect } from "react";

const TripCharge = () =>
  {
    const [tripCharge, setTripCharge] = useAtom(tripChargeAtom);
    const [tripChargeError, setTripChargeError] = useAtom(tripChargeErrorAtom);
    const [activeTabIndex] = useAtom(activeTabIndexAtom);

    const activeTripChargeData = tripCharge[activeTabIndex];
    const activeTripChargeError = tripChargeError[activeTabIndex];

    const updateTripChargeData = (
      key: keyof typeof activeTripChargeData,
      value: any
    ) => {
      setTripCharge((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
        return updated;
      });
    };

    const updateTripChargeErrors = (
      key: keyof typeof activeTripChargeError,
      value: any
    ) => {
      setTripChargeError((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
        return updated;
      });
    };

    useEffect(() => {
      if (activeTripChargeData.isStandardCost) {
        updateTripChargeData(
          "totalMilesAmount",
          activeTripChargeData.tripChargeVal || 0
        );
      } else if (activeTripChargeData.isCalculateCost) {
        const amount =
          (parseFloat(activeTripChargeData.traveledMiles )|| 0 )*
          (parseFloat(activeTripChargeData.amountPerMiles ) || 0);
        updateTripChargeData("totalMilesAmount", amount);
      }
    }, [
      activeTripChargeData.isStandardCost,
      activeTripChargeData.isCalculateCost,
      activeTripChargeData.tripChargeVal,
      activeTripChargeData.traveledMiles,
      activeTripChargeData.amountPerMiles,
    ]);
    

    useEffect(
      () =>
        setTripChargeError((prev) => {
          const updated = [...prev];
          updated[activeTabIndex] = {
            tripChargeVal: "",
            amountPerMiles: "",
            traveledMiles: "",
          };
          return updated;
        }),
      [
        activeTripChargeData.isCalculateCost,
        activeTripChargeData.isStandardCost,
      ]
    );

    // console.log(amountPerMiles)
    return (
      <div className="w-full h-full px-4 pb-4 flex flex-col items-center justify-center bg-transparent">
        <div className="flex flex-col w-[450px] h-fit mt-6 gap-y-4 bg-transparent">
          <div className="flex flex-row justify-between items-start gap-2 w-full bg-transparent">
            <label
              htmlFor="standard"
              className="flex gap-2 text-[#000000B2] dark:text-white text-[18px] font-[400] bg-transparent"
            >
              <input
                type="checkbox"
                name="standard"
                className="text-[18px]"
                checked={activeTripChargeData.isStandardCost}
                onChange={() => {
                  updateTripChargeData(
                    "isStandardCost",
                    !activeTripChargeData.isStandardCost
                  );
                  updateTripChargeData("isCalculateCost", false);
                }}
              />
              Standard Cost*
            </label>
          </div>
          <div className="flex flex-col justify-between items-start gap-2 w-full bg-transparent">
            <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
              Amount for Traveling (Leave blank if none)*
            </label>
            <input
              type="number"
              placeholder="$00.00"
              min={0}
              value={activeTripChargeData.tripChargeVal}
              onChange={(e) => {
                updateTripChargeData("tripChargeVal", e.target.value);
                updateTripChargeErrors("tripChargeVal", "");
                // setTripChargeError("");
              }}
              disabled={!activeTripChargeData.isStandardCost}
              className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[8px] focus:border-[#00C5FF] w-full h-[51px]"
            />
            {activeTripChargeError.tripChargeVal && (
              <p className="text-red-500 mt-1 bg-transparent">
                {activeTripChargeError.tripChargeVal}
              </p>
            )}
          </div>
          <div className="flex w-full text-center dark:text-white justify-center items-center text-lg font-[400] my-8 bg-transparent">
            or
          </div>
          <div className="flex flex-col justify-between items-start w-full gap-y-4 bg-transparent">
            <div className="flex flex-row justify-between items-start gap-2 w-full bg-transparent ">
              <label
                htmlFor="CalculateCost"
                className="flex gap-2 text-[#000000B2] dark:text-white text-[18px] font-[400] bg-transparent"
              >
                <input
                  type="checkbox"
                  name="CalculateCost"
                  className="text-[18px]"
                  checked={activeTripChargeData.isCalculateCost}
                  onChange={() => {
                    updateTripChargeData(
                      "isCalculateCost",
                      !activeTripChargeData.isCalculateCost
                    );
                    updateTripChargeData("isStandardCost", false);
                  }}
                />
                Calculate $/Mph**
              </label>
            </div>
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-col w-[200px] mt-1 bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Amount $ per Miles*
                </label>

                <input
                  type="number"
                  value={activeTripChargeData.amountPerMiles}
                  min={0}
                  onChange={(e) => {
                    updateTripChargeData("amountPerMiles", e.target.value);
                    updateTripChargeErrors("amountPerMiles", "");
                    // setLabourErrors((prev) => ({
                    //   ...prev,
                    //   employeesRate: "",
                    // }));
                  }}
                  disabled={!activeTripChargeData.isCalculateCost}
                  className="p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                  placeholder="$00.00"
                />

                {activeTripChargeError.amountPerMiles && (
                  <p className="text-red-500">
                    {activeTripChargeError.amountPerMiles}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-[200px] mt-1 bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Miles Traveled*
                </label>

                <input
                  type="number"
                  value={activeTripChargeData.traveledMiles}
                  min={0}
                  onChange={(e) => {
                    updateTripChargeData("traveledMiles", e.target.value);
                    updateTripChargeErrors("traveledMiles", "");
                    // setLabourErrors((prev) => ({
                    //   ...prev,
                    //   employeesRate: "",
                    // }));
                  }}
                  disabled={!activeTripChargeData.isCalculateCost}
                  className="p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                  placeholder="Miles"
                />

                {activeTripChargeError.traveledMiles && (
                  <p className="text-red-500 bg-transparent">
                    {activeTripChargeError.traveledMiles}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-col items-start w-[200px] bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Total Amount*
                </label>
                <div className="p-2 border-2 border-[#A9A5A5] dark:border-white  dark:text-white rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                  ${activeTripChargeData.totalMilesAmount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TripCharge;
