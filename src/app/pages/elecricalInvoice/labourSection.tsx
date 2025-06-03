/* eslint-disable @typescript-eslint/no-explicit-any */
import FormField from "../../../components/form/FormField";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  labourErrorsAtom,
  labourStateAtom,
} from "../../../variables/electricalInvoiceVariable";
import RadioGroup from "../../../components/form/RadioGroup";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";

interface Employee {
  name: string;
  hours: number;
  rate: number;
}

const labourSection = () => {
  const [labourStateVariable, setLabourStateVariable] =
    useAtom(labourStateAtom);
  const [labourErrors, setLabourErrors] = useAtom(labourErrorsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeLabourData = labourStateVariable[activeTabIndex];
  const activeLabourError = labourErrors[activeTabIndex];
  const addEmployee = () => {
    const updatedEmployees = [
      ...activeLabourData.variableAddEmployees,
      { name: "", hours: 0, rate: 0 },
    ];
    updateLabourData("variableAddEmployees", updatedEmployees);
    updateLabourErrors("variableAddEmployees", "");
  };

  const updateEmployee = <K extends keyof Employee>(
    index: number,
    field: K,
    value: Employee[K]
  ) => {
    setLabourStateVariable((prev) => {
      const updated = [...prev];
      const currentTab = updated[activeTabIndex];

      if (currentTab.variableAddEmployees) {
        const updatedEmployees = [...currentTab.variableAddEmployees];

        // Ensure index exists before trying to update
        if (updatedEmployees[index]) {
          updatedEmployees[index] = {
            ...updatedEmployees[index],
            [field]: value,
          };

          // Update the state
          updated[activeTabIndex] = {
            ...currentTab,
            variableAddEmployees: updatedEmployees,
          };
        }
        updateLabourErrors("variableAddEmployees", updatedEmployees);
      }
      return updated;
    });
    // const updatedEmployees = [...activeLabourData.variableAddEmployees];
    // updatedEmployees[index][field] = value;
    // console.log("updatedEmployees", updatedEmployees)
  };

  const updateLabourErrors = (
    key: keyof typeof activeLabourError,
    value: any
  ) => {
    setLabourErrors((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };

  useEffect(
    () =>
      setLabourErrors((prev) => {
        const updated = [...prev];
        updated[activeTabIndex] = {
          labourType: "",
          labourSelectedVal: "",
          labourHour: "",
          contContractorRate: "",
          employeesNo: "",
          employeesRate: "",
          uniformScopeWork: "",
          uniformProjectAmount: "",
          variableContTotHourRate: "",
          variableAddEmployees: "",
          variableContRatePerHour: "",
          materialCostVal: "",
          hourlyRateScopeWork: "",
          projectAmountQuantityVal: "",
        };
        return updated;
      }),
    [activeLabourData.materialCostVal]
  );
  useEffect(() => {
    updateLabourErrors("variableAddEmployees", "");
  }, [activeLabourData.variableAddEmployees]);

  const updateLabourData = (key: keyof typeof activeLabourData, value: any) => {
    setLabourStateVariable((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };
  // activeLabourData.variableAddEmployees
  // console.log("active", activeLabourData)
  // console.log("data", activeLabourData.variableAddEmployees);
  // console.log("Rendered JSX:", activeLabourData.variableAddEmployees.map((employee) => <div>{employee.name}</div>));
  return (
    <div id="labourSelectionDetailTour" className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent">
      <div className="flex flex-col w-[390px] gap-y-6 justify-center items-center bg-transparent">
        {/* labour selection page */}
        {!activeLabourData.labourSelectedVal && (
          <div id="labourSelectionMathodTour" className="flex flex-col gap-4 w-fit h-fit justify-center items-center bg-transparent mt-12">
            <button
              className={`flex justify-center items-center text-[32px] font-[500] rounded-[20px] dark:text-white text-center w-[306px] h-[81px] ${
                activeLabourData.labourSelectedVal === "Hourly Rate"
                  ? "bg-[#00C5FF] text-white"
                  : activeLabourData.labourSelectedVal === ""
                  ? "bg-[#00C5FF] text-white"
                  : "bg-[#D9D9D9] text-[#00000066] dark:text-black"
              }`}
              onClick={() =>
                updateLabourData("labourSelectedVal", "Hourly Rate")
              }
            >
              Hourly Rate
            </button>
            <button
              className={`flex justify-center items-center text-center text-[32px] font-[500] rounded-[20px] w-[306px] h-[81px] ${
                activeLabourData.labourSelectedVal === "Project Amount"
                  ? "bg-[#00C5FF] text-white"
                  : "bg-[#D9D9D9] text-[#00000066] dark:text-black"
              }`}
              onClick={() =>
                updateLabourData("labourSelectedVal", "Project Amount")
              }
            >
              Project Amount
            </button>
            {activeLabourError.labourSelectedVal && (
              <p className="text-red-500 bg-transparent">
                {activeLabourError.labourSelectedVal}
              </p>
            )}
          </div>
        )}

        {activeLabourData.labourSelectedVal === "Hourly Rate" && (
          <div className="flex flex-col gap-y-6 bg-transparent">
            <div className="flex flex-row w-full h-[41px] justify-between items-center bg-transparent">
              <div className="flex flex-row h-full justify-start items-center bg-transparent">
                <label className="flex items-center text-[14px] cursor-pointer bg-transparent">
                  <input
                    type="radio"
                    name="Uniform"
                    value="Uniform"
                    checked={activeLabourData.labourType === "Uniform"}
                    onChange={(e) =>
                      updateLabourData("labourType", e.target.value)
                    }
                    className="mr-2 text-[#00C5FF66] checked:bg-[#00C5FF66]"
                    hidden
                  />
                  <span
                    className={`w-4 h-4 mr-2 flex items-center justify-center bg-transparent border-2 rounded-full ${
                      activeLabourData.labourType === "Uniform"
                        ? "border-[#00C5FF]"
                        : "border-gray-400 dark:border-white"
                    }`}
                  >
                    {activeLabourData.labourType === "Uniform" && (
                      <span className="w-2 h-2 bg-[#00C5FF] rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`flex w-[104px] h-[40px] justify-center items-center rounded-[10px] ${
                      activeLabourData.labourType === "Uniform"
                        ? "bg-[#00C5FF] text-white dark:text-white "
                        : "bg-[#D9D9D9] text-[#00000066] dark:bg-black dark:text-white"
                    }`}
                  >
                    Uniform
                  </span>
                </label>
              </div>
              <div className="flex flex-row w-full justify-end items-center bg-transparent">
                <label className="flex items-center text-[14px] cursor-pointer bg-transparent">
                  <input
                    type="radio"
                    name="Variable"
                    value="Variable"
                    checked={activeLabourData.labourType === "Variable"}
                    onChange={(e) =>
                      updateLabourData("labourType", e.target.value)
                    }
                    className="mr-2 text-[#00C5FF66] checked:bg-[#00C5FF66]"
                    hidden
                  />
                  <span
                    className={`w-4 h-4 mr-2 flex items-center justify-center border-2 bg-transparent rounded-full ${
                      activeLabourData.labourType === "Variable"
                        ? "border-[#00C5FF]"
                        : "border-gray-400 dark:border-white"
                    }`}
                  >
                    {activeLabourData.labourType === "Variable" && (
                      <span className="w-2 h-2 bg-[#00C5FF] rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`flex w-[104px] h-[40px] justify-center items-center rounded-[10px] ${
                      activeLabourData.labourType === "Variable"
                        ? "bg-[#00C5FF] text-white dark:text-white"
                        : "bg-[#D9D9D9] text-[#00000066] dark:bg-black dark:text-white"
                    }`}
                  >
                    Variable
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col w-full h-fit mt-1 bg-transparent">
              <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                Scope of Work*
              </label>
              <textarea
                placeholder="Describe the work being done, including key details..."
                value={activeLabourData.hourlyRateScopeWork}
                onChange={(e) => {
                  updateLabourData("hourlyRateScopeWork", e.target.value);
                  setLabourErrors((prev) => {
                    const updatedErrors = [...prev];
                    updatedErrors[activeTabIndex] = {
                      ...updatedErrors[activeTabIndex],
                      hourlyRateScopeWork: "",
                    };
                    return updatedErrors;
                  });
                }}
                className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full min-h-[55px]"
              />
              {activeLabourError.hourlyRateScopeWork && (
                <p className="text-red-500 mt-1 bg-transparent">
                  {activeLabourError.hourlyRateScopeWork}
                </p>
              )}
            </div>

            {activeLabourData.labourType == "Uniform" && (
              <div className="flex flex-col w-full gap-y-4 justify-center items-center bg-transparent">
                <div className="flex flex-row w-full justify-between items-start gap-3 bg-transparent">
                  <FormField
                    title="Total Hours*"
                    name="text"
                    type="number"
                    placeholder="0"
                    value={activeLabourData.labourHour}
                    handleChange={(e) => {
                      updateLabourData("labourHour", e.target.value);
                      updateLabourErrors("labourHour", "");
                    }}
                    error={activeLabourError.labourHour}
                    width={176}
                    height={55}
                  />
                  <div className="flex flex-col w-[200px] bg-transparent">
                    <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                      Contractor’s Rate/hr*
                    </label>
                    <div className="relative bg-transparent">
                      <input
                        type="number"
                        value={activeLabourData.contContractorRate}
                        onChange={(e) => {
                          updateLabourData(
                            "contContractorRate",
                            e.target.value
                          );
                          updateLabourErrors("contContractorRate", "");
                        }}
                        className="p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                        placeholder="15"
                      />
                      <span className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-transparent ">
                        $
                      </span>
                    </div>
                    {activeLabourError.contContractorRate && (
                      <p className="text-red-500 bg-transparent">
                        {activeLabourError.contContractorRate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center bg-transparent">
                  <div className="flex flex-row w-full justify-between items-start gap-3 bg-transparent">
                    <FormField
                      title="No. of Employees*"
                      name="text"
                      type="number"
                      placeholder="0"
                      value={activeLabourData.employeesNo}
                      handleChange={(e) => {
                        updateLabourData("employeesNo", e.target.value);
                        updateLabourErrors("employeesNo", "");
                      }}
                      error={activeLabourError.employeesNo}
                      width={176}
                      height={55}
                    />

                    <div className="flex flex-col w-[200px] bg-transparent">
                      <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                        Employee’s Rate/hr*
                      </label>
                      <div className="relative bg-transparent">
                        <input
                          type="number"
                          value={activeLabourData.employeesRate}
                          onChange={(e) => {
                            updateLabourData("employeesRate", e.target.value);
                            updateLabourErrors("employeesRate", "");
                          }}
                          className="p-2 outline-none w-full h-[55px] text-primary bg-transparent dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                          placeholder="15"
                        />
                        <span className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-transparent ">
                          $
                        </span>
                      </div>
                      {activeLabourError.employeesRate && (
                        <p className="text-red-500 bg-transparent">
                          {activeLabourError.employeesRate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabourData.labourType == "Variable" && (
              <div className="flex flex-col gap-y-4 bg-transparent">
                <div className="flex flex-col w-[337px] bg-transparent">
                  <label className="text-primary  dark:text-white mb-1 bg-transparent">
                    Contractor's Total Hourly Rate*
                  </label>
                  <div className=" bg-transparent">
                    <input
                      type="number"
                      value={activeLabourData.variableContTotHourRate}
                      onChange={(e) => {
                        updateLabourData(
                          "variableContTotHourRate",
                          e.target.value
                        );
                        updateLabourErrors("variableContTotHourRate", "");
                      }}
                      className="p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                      placeholder="No."
                    />
                  </div>
                  {activeLabourError.variableContTotHourRate && (
                    <p className="text-red-500 bg-transparent">
                      {activeLabourError.variableContTotHourRate}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-[337px] bg-transparent">
                  <label className="text-primary  dark:text-white mb-1 bg-transparent">
                    Contractor’s Rate/hr*
                  </label>
                  <div className="relative bg-transparent">
                    <input
                      type="number"
                      value={activeLabourData.variableContRatePerHour}
                      onChange={(e) => {
                        updateLabourData(
                          "variableContRatePerHour",
                          e.target.value
                        );
                        updateLabourErrors("variableContRatePerHour", "");
                      }}
                      className="p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                      placeholder="15"
                    />
                    <span className="absolute left-12 top-1/2 dark:text-white transform -translate-y-1/2 bg-transparent ">
                      $
                    </span>
                  </div>
                  {activeLabourError.variableContRatePerHour && (
                    <p className="text-red-500 bg-transparent">
                      {activeLabourError.variableContRatePerHour}
                    </p>
                  )}
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
                          <label className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Employee Name*
                          </label>
                          <input
                            type="text"
                            className="p-2 text-[#00000080] dark:text-white text-[12px] font-[400] outline-none border-2 bg-transparent border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full h-[55px]"
                            placeholder="Electrician (John Doe)"
                            value={employee.name || ""}
                            onChange={(e) =>
                              updateEmployee(index, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col w-[80px] bg-transparent">
                          <label className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Total Hours*
                          </label>
                          <input
                            type="number"
                            className="p-2 text-[#00000080] dark:text-white outline-none border-2 border-[#A9A5A5] bg-transparent dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full h-[55px]"
                            placeholder="5"
                            value={employee.hours || 0}
                            onChange={(e) =>
                              updateEmployee(
                                index,
                                "hours",
                                parseInt(e.target.value, 10) || 0
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col w-[80px] bg-transparent">
                          <label className="text-[#00000080] dark:text-white text-[12px] leading-[11.86px] font-[500] mb-2 bg-transparent">
                            Hourly Rate*
                          </label>
                          <div className=" relative bg-transparent">
                            <input
                              type="number"
                              className="p-2 outline-none text-[#00000080] dark:text-white border-2 border-[#A9A5A5] bg-transparent dark:border-white rounded-[10px] focus:border-[#00C5FF] w-full h-[55px]"
                              placeholder="5$"
                              value={employee.rate || 0}
                              onChange={(e) =>
                                updateEmployee(
                                  index,
                                  "rate",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                            />
                            <span className="absolute text-[#00000080] bg-transparent dark:text-white left-10 top-1/2 transform -translate-y-1/2 ">
                              $
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className="flex flex-col w-full bg-transparent">
                  <div
                    onClick={addEmployee}
                    className="flex justify-center items-center text-[#00000080] dark:text-white text-[12px] font-[400] leading-[11.94px] w-full h-[30px] rounded-[8px] bg-[#99E8FF33] cursor-pointer"
                  >
                    Add Employee +
                  </div>
                  {activeLabourError.variableAddEmployees && (
                    <p className="text-red-500 mt-1 bg-transparent">
                      {activeLabourError.variableAddEmployees}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeLabourData.labourSelectedVal === "Project Amount" && (
          <div className="flex flex-col gap-y-6 bg-transparent">
            <div className="flex flex-col gap-y-6 bg-transparent">
              <div className="flex w-full justify-center mt-2 bg-transparent">
                <RadioGroup
                  name="Material Cost*"
                  label="Material Cost*"
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                  selectedValue={activeLabourData.materialCostVal}
                  onChange={(e) => updateLabourData("materialCostVal", e)}
                  error={activeLabourError.materialCostVal}
                  width={158}
                />
              </div>

              <div className="flex flex-col w-[337px] h-fit mt-1 bg-transparent">
                <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                  Scope of Work*
                </label>
                <textarea
                  placeholder="Describe the work being done, including key details..."
                  value={activeLabourData.uniformScopeWork}
                  onChange={(e) => {
                    updateLabourData("uniformScopeWork", e.target.value);
                    updateLabourErrors("uniformScopeWork", "");
                  }}
                  disabled={
                    activeLabourData.materialCostVal === "No" ? true : false
                  }
                  className={` p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full min-h-[55px] ${
                    activeLabourData.materialCostVal === "No"
                      ? "opacity-50"
                      : ""
                  }`}
                />
                {activeLabourError.uniformScopeWork && (
                  <p className="text-red-500 mt-1 bg-transparent">
                    {activeLabourError.uniformScopeWork}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-[337px] bg-transparent">
                <label className="text-primary dark:text-white mb-1 bg-transparent">
                  Amount*
                </label>
                <div className="relative bg-transparent">
                  <input
                    type="number"
                    value={activeLabourData.uniformProjectAmount}
                    onChange={(e) => {
                      updateLabourData("uniformProjectAmount", e.target.value);
                      updateLabourErrors("uniformProjectAmount", "");
                    }}
                    disabled={
                      activeLabourData.materialCostVal === "No" ? true : false
                    }
                    className={`p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none ${
                      activeLabourData.materialCostVal === "No"
                        ? "opacity-50"
                        : ""
                    }`}
                    placeholder="15"
                  />
                  <span className="absolute left-8 top-1/2 dark:text-white transform -translate-y-1/2 bg-transparent ">
                    $
                  </span>
                </div>
                {activeLabourError.uniformProjectAmount && (
                  <p className="text-red-500 bg-transparent">
                    {activeLabourError.uniformProjectAmount}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-[337px] bg-transparent">
                <label className="text-primary dark:text-white mb-1 bg-transparent">
                  Quantity*
                </label>
                <div className="relative bg-transparent">
                  <input
                    type="number"
                    value={activeLabourData.projectAmountQuantityVal}
                    onChange={(e) => {
                      updateLabourData(
                        "projectAmountQuantityVal",
                        e.target.value
                      );
                      updateLabourErrors("projectAmountQuantityVal", "");
                    }}
                    disabled={
                      activeLabourData.materialCostVal === "No" ? true : false
                    }
                    className={`p-2 outline-none w-full h-[55px] text-primary bg-transparent dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none ${
                      activeLabourData.materialCostVal === "No"
                        ? "opacity-50"
                        : ""
                    }`}
                    placeholder="1"
                  />
                </div>
                {activeLabourError.projectAmountQuantityVal && (
                  <p className="text-red-500 bg-transparent">
                    {activeLabourError.projectAmountQuantityVal}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default labourSection;
