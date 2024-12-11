// import FormField from "../../../components/form/FormField";
import {
  tripChargeErrorAtom,
  tripChargeValAtom,
} from "../../../variables/electricalInvoiceVariable";
import { useAtom } from "jotai";
import React, { useState } from "react";
// interface TripChargeProps {
//   tripChargeVal: string;
//   setTripChargeVal: (type: string) => void;
//   tripChargeError: string;
// }

const TripCharge = () =>
  //   {
  //   tripChargeVal,
  //   setTripChargeVal,
  //   tripChargeError,
  // }: TripChargeProps
  {
    const [tripChargeVal, setTripChargeVal] = useAtom(tripChargeValAtom);
    const [tripChargeError, setTripChargeError] = useAtom(tripChargeErrorAtom);
    const [isStandardCost, setIsStandardCost] = useState(false);
    const [isCalculateCost, setIsCalculateCost] = useState(false);
    const [amountPerMiles, setamountPerMiles] = useState("");
    const [traveledMiles, setTraveledMiles] = useState("");
    const [totalMilesAmount, setTotalMilesAmount] = useState("00.00");
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
                onChange={() => setIsStandardCost(!isStandardCost)}
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
              value={tripChargeVal}
              onChange={(e) => {
                setTripChargeVal(e.target.value);
                setTripChargeError("");
              }}
              disabled = {!isStandardCost}
              className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[8px] focus:border-[#00C5FF] w-full h-[51px]"
            />
            {tripChargeError && (
              <p className="text-red-500 mt-1 bg-transparent">{tripChargeError}</p>
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
                  onChange={() => setIsCalculateCost(!isCalculateCost)}
                />
                Calculate $/Mph**
              </label>
            </div>
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-col w-[200px] mt-1 bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">Amount $ per Miles*</label>

                <input
                  type="number"
                  value={amountPerMiles}
                  onChange={(e) => {
                    setamountPerMiles(e.target.value);
                    // setLabourErrors((prev) => ({
                    //   ...prev,
                    //   employeesRate: "",
                    // }));
                  }}
                  disabled = {!isCalculateCost}
                  className="p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                  placeholder="$00.00"
                />

                {tripChargeError && (
                  <p className="text-red-500">{tripChargeError}</p>
                )}
              </div>

              <div className="flex flex-col w-[200px] mt-1 bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">Miles Traveled*</label>

                <input
                  type="number"
                  value={traveledMiles}
                  onChange={(e) => {
                    setTraveledMiles(e.target.value);
                    // setLabourErrors((prev) => ({
                    //   ...prev,
                    //   employeesRate: "",
                    // }));
                  }}
                  disabled = {!isCalculateCost}
                  className="p-2 outline-none w-full h-[51px] text-primary border-2 border-[#A9A5A5] dark:border-white dark:bg-black dark:text-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                  placeholder="Miles"
                />

                {tripChargeError && (
                  <p className="text-red-500 bg-transparent">{tripChargeError}</p>
                )}
              </div>

              
            </div>
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-col items-start w-[200px] bg-transparent">
                <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                  Total Amount*
                </label>
                <div className="p-2 border-2 border-[#A9A5A5] dark:border-white  dark:text-white rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                  ${totalMilesAmount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TripCharge;
