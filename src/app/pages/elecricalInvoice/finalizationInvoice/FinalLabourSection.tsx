/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from "jotai";
import { labourStateAtom } from "../../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";

const FinalLabourSection = () => {
  const [labourStateVariable] = useAtom(labourStateAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeLabourData = labourStateVariable[activeTabIndex];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-8 bg-transparent">
      <div className="flex flex-col w-full gap-y-6 justify-center items-center bg-transparent">
        {/* labour selection page */}

        {activeLabourData.labourSelectedVal === "Hourly Rate" && (
          <div className="flex flex-col w-full gap-y-6 bg-transparent">
            <div className="flex flex-col w-full h-fit bg-transparent">
              <div className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                Scope of Work*
              </div>
              <div
                className={` p-2 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full h-[55px] overflow-hidden overflow-y-auto`}
              >
                {activeLabourData.hourlyRateScopeWork}
              </div>
            </div>

            {activeLabourData.labourType == "Uniform" && (
              <div className="flex flex-col w-full gap-y-4 justify-center items-center bg-transparent">
                <div className="flex flex-row w-full justify-between items-start gap-3 bg-transparent">
                  <div
                    className={`flex flex-col w-[45%] dark:bg-black dark:text-white `}
                  >
                    <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                      Total Hours*
                    </div>
                    <div
                      className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
                    >
                      {activeLabourData.labourHour}
                    </div>
                  </div>

                  <div className="flex flex-col w-[45%] bg-transparent">
                    <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                      Contractor’s Rate/hr*
                    </div>
                    <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                      <div className=" flex justify-start items-center p-2 w-fit h-[55px] bg-transparent">
                        {" "}
                        {activeLabourData.contContractorRate}
                      </div>
                      <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                        $
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center bg-transparent">
                  <div className="flex flex-row w-full justify-between items-start gap-3 bg-transparent">
                    <div
                      className={`flex flex-col w-[45%] dark:bg-black dark:text-white `}
                    >
                      <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                        No. of Employees*
                      </div>
                      <div
                        className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
                      >
                        {activeLabourData.employeesNo}
                      </div>
                    </div>

                    <div className="flex flex-col w-[45%] bg-transparent">
                      <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                        Employee’s Rate/hr*
                      </div>
                      <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                        <div className=" flex justify-start items-center p-2 w-fit h-[55px] bg-transparent">
                          {" "}
                          {activeLabourData.employeesRate}
                        </div>
                        <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                          $
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabourData.labourType == "Variable" && (
              <div className="flex flex-col gap-y-4 bg-transparent">
                <div className="flex flex-row gap-3 w-full bg-transparent">
                  <div className="flex flex-col w-[45%] bg-transparent">
                    <div className="text-primary  dark:text-white mb-1 bg-transparent">
                      Contractor's Total Hours*
                    </div>
                    <div className=" bg-transparent">
                      <div className="flex justify-start items-center p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                        {" "}
                        {activeLabourData.variableContTotHourRate}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-[45%] bg-transparent">
                    <div className="text-primary  dark:text-white mb-1 bg-transparent">
                      Contractor’s Rate/hr*
                    </div>
                    <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                      <div className=" flex justify-start items-center p-2 w-fit h-[55px] bg-transparent">
                        {" "}
                        {activeLabourData.variableContRatePerHour}
                      </div>
                      <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                        $
                      </div>
                    </div>
                  </div>
                </div>

                {/* add item by click */}
                {activeLabourData.variableAddEmployees?.map(
                  (employee, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-center mb-2 w-full pt-2 bg-transparent"
                    >
                      <div className="flex flex-row justify-between items-center w-full bg-transparent">
                        <div className="flex flex-col w-[134px] bg-transparent">
                          <div className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Employee Name*
                          </div>
                          <div className="flex justify-start items-center p-2 text-[#00000080] dark:text-white text-[12px] font-[400] outline-none border-2 bg-transparent border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full h-[55px]">
                            {employee.name || ""}
                          </div>
                        </div>
                        <div className="flex flex-col w-[80px] bg-transparent">
                          <div className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Total Hours*
                          </div>
                          <div className=" flex justify-start items-center p-2 text-[#00000080] dark:text-white outline-none border-2 border-[#A9A5A5] bg-transparent dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full h-[55px]">
                            {employee.hours || 0}
                          </div>
                        </div>
                        <div className="flex flex-col w-[80px] bg-transparent">
                          <div className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Hourly Rate*
                          </div>

                          <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                            <div className=" flex justify-start items-center p-2 w-fit h-[55px] bg-transparent">
                              {" "}
                              {employee.rate || 0}
                            </div>
                            <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                              $
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {activeLabourData.labourSelectedVal === "Project Amount" && (
          <div className="flex flex-col w-full gap-y-6 bg-transparent">
            <div className="flex flex-row justify-between w-full gap-3 bg-transparent">
              <div className="flex flex-col w-[300px] h-fit bg-transparent">
                <div className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                  Scope of Work*
                </div>
                <div
                  className={` p-2 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full h-[55px] overflow-hidden overflow-y-auto`}
                >
                  {activeLabourData.uniformScopeWork}
                </div>
              </div>

              <div className="flex flex-col w-[150px] bg-transparent">
                <div className="px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                  Amount*
                </div>

                <div className="flex flex-row bg-transparent">
                  <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                    <div className=" flex justify-start items-center w-fit h-[55px] bg-transparent">
                      {" "}
                      {activeLabourData.uniformProjectAmount}
                    </div>
                    <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                      $
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-[150px] bg-transparent">
                <div className="px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                  Quantity*
                </div>
                <div className="flex flex-row justify-start items-center p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none">
                  <div className=" flex justify-start items-center w-fit h-[55px] bg-transparent">
                    {" "}
                    {activeLabourData.projectAmountQuantityVal}
                  </div>
                  <div className="flex justify-start items-center w-fit bg-transparent h-[55px] ">
                    $
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalLabourSection;
