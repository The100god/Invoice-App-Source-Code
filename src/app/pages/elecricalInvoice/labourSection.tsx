import FormField from "../../../components/form/FormField";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  contContractorRateAtom,
  employeesNoAtom,
  employeesRateAtom,
  hourlyRateScopeWorkAtom,
  labourErrorsAtom,
  labourHourAtom,
  labourMaterialCostAtom,
  labourSelectedValAtom,
  labourTypeAtom,
  projectAmountQuantityValAtom,
  uniformProjectAmountAtom,
  uniformScopeWorkAtom,
  variableAddEmployeesAtom,
  varriableContRatePerHourAtom,
  varriableContTotHourRateAtom,
} from "../../../variables/electricalInvoiceVariable";
import RadioGroup from "../../../components/form/RadioGroup";

interface Employee {
  name: string;
  hours: number;
  rate: number;
}

const labourSection = () => {
  const [labourSelectedVal, setLabourSelectedVal] = useAtom(
    labourSelectedValAtom
  );
  const [labourType, setLabourType] = useAtom(labourTypeAtom);
  const [labourHour, setLabourHour] = useAtom(labourHourAtom);
  const [contContractorRate, setContContractorRate] = useAtom(
    contContractorRateAtom
  );
  const [employeesNo, setEmployeesNo] = useAtom(employeesNoAtom);
  const [employeesRate, setEmployeesRate] = useAtom(employeesRateAtom);
  const [uniformScopeWork, setUniformScopeWork] = useAtom(uniformScopeWorkAtom);
  const [hourlyRateScopeWork, setHourlyRateScopeWork] = useAtom(
    hourlyRateScopeWorkAtom
  );
  const [uniformProjectAmount, setUniformProjectAmount] = useAtom(
    uniformProjectAmountAtom
  );
  const [varriableContTotHourRate, setVarriableContTotHourRate] = useAtom(
    varriableContTotHourRateAtom
  );
  const [varriableContRatePerHour, setVarriableContRatePerHour] = useAtom(
    varriableContRatePerHourAtom
  );
  const [variableAddEmployees, setVariableAddEmployees] = useAtom(
    variableAddEmployeesAtom
  );
  const [labourErrors, setLabourErrors] = useAtom(labourErrorsAtom);
  const [materialCostVal, setMaterialCostVal] = useAtom(labourMaterialCostAtom);
  const [projectAmountQuantityVal, setProjectAmountQuantityVal] = useAtom(
    projectAmountQuantityValAtom
  );

  const addEmployee = () => {
    setVariableAddEmployees([
      ...variableAddEmployees,
      { name: "", hours: 0, rate: 0 },
    ]);
    setLabourErrors((prev) => ({
      ...prev,
      variableAddEmployees: "",
    }));
  };

  const updateEmployee = <K extends keyof Employee>(
    index: number,
    field: K,
    value: Employee[K]
  ) => {
    const updatedEmployees = [...variableAddEmployees];
    updatedEmployees[index][field] = value;
    setVariableAddEmployees(updatedEmployees);
  };

  useEffect(
    () =>
      setLabourErrors({
        labourType: "",
        labourSelectedVal: "",
        labourHour: "",
        contContractorRate: "",
        employeesNo: "",
        employeesRate: "",
        uniformScopeWork: "",
        uniformProjectAmount: "",
        varriableContTotHourRate: "",
        variableAddEmployees: "",
        varriableContRatePerHour: "",
        materialCostVal: "",
        hourlyRateScopeWork: "",
        projectAmountQuantityVal: "",
      }),
    [materialCostVal]
  );

  return (
    <div className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent">
      <div className="flex flex-col w-[390px] gap-y-6 justify-center items-center bg-transparent">
        {/* labour selection page */}
        {!labourSelectedVal && (
          <div className="flex flex-col gap-4 w-fit h-fit justify-center items-center bg-transparent mt-12">
            <button
              className={`flex justify-center items-center text-[32px] font-[500] rounded-[20px] dark:text-white text-center w-[306px] h-[81px] ${
                labourSelectedVal === "Hourly Rate"
                  ? "bg-[#00C5FF] text-white"
                  : labourSelectedVal === ""
                  ? "bg-[#00C5FF] text-white"
                  : "bg-[#D9D9D9] text-[#00000066] dark:text-black"
              }`}
              onClick={() => setLabourSelectedVal("Hourly Rate")}
            >
              Hourly Rate
            </button>
            <button
              className={`flex justify-center items-center text-center text-[32px] font-[500] rounded-[20px] w-[306px] h-[81px] ${
                labourSelectedVal === "Project Amount"
                  ? "bg-[#00C5FF] text-white"
                  : "bg-[#D9D9D9] text-[#00000066] dark:text-black"
              }`}
              onClick={() => setLabourSelectedVal("Project Amount")}
            >
              Project Amount
            </button>
            {labourErrors.labourSelectedVal && (
              <p className="text-red-500 bg-transparent">
                {labourErrors.labourSelectedVal}
              </p>
            )}
          </div>
        )}

        {labourSelectedVal === "Hourly Rate" && (
          <div className="flex flex-col gap-y-6 bg-transparent">
            <div className="flex flex-row w-full h-[41px] justify-between items-center bg-transparent">
              <div className="flex flex-row h-full justify-start items-center bg-transparent">
                <label className="flex items-center text-[14px] cursor-pointer bg-transparent">
                  <input
                    type="radio"
                    name="Uniform"
                    value="Uniform"
                    checked={labourType === "Uniform"}
                    onChange={(e) => setLabourType(e.target.value)}
                    className="mr-2 text-[#00C5FF66] checked:bg-[#00C5FF66]"
                    hidden
                  />
                  <span
                    className={`w-4 h-4 mr-2 flex items-center justify-center bg-transparent border-2 rounded-full ${
                      labourType === "Uniform"
                        ? "border-[#00C5FF]"
                        : "border-gray-400 dark:border-white"
                    }`}
                  >
                    {labourType === "Uniform" && (
                      <span className="w-2 h-2 bg-[#00C5FF] rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`flex w-[104px] h-[40px] justify-center items-center rounded-[10px] ${
                      labourType === "Uniform"
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
                    checked={labourType === "Variable"}
                    onChange={(e) => setLabourType(e.target.value)}
                    className="mr-2 text-[#00C5FF66] checked:bg-[#00C5FF66]"
                    hidden
                  />
                  <span
                    className={`w-4 h-4 mr-2 flex items-center justify-center border-2 bg-transparent rounded-full ${
                      labourType === "Variable"
                        ? "border-[#00C5FF]"
                        : "border-gray-400 dark:border-white"
                    }`}
                  >
                    {labourType === "Variable" && (
                      <span className="w-2 h-2 bg-[#00C5FF] rounded-full"></span>
                    )}
                  </span>
                  <span
                    className={`flex w-[104px] h-[40px] justify-center items-center rounded-[10px] ${
                      labourType === "Variable"
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
                value={hourlyRateScopeWork}
                onChange={(e) => {
                  setHourlyRateScopeWork(e.target.value);
                  setLabourErrors((prev) => ({
                    ...prev,
                    hourlyRateScopeWork: "",
                  }));
                }}
                className=" p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full min-h-[55px]"
              />
              {labourErrors.hourlyRateScopeWork && (
                <p className="text-red-500 mt-1 bg-transparent">
                  {labourErrors.hourlyRateScopeWork}
                </p>
              )}
            </div>

            {labourType == "Uniform" && (
              <div className="flex flex-col w-full gap-y-4 justify-center items-center bg-transparent">
                <div className="flex flex-row w-full justify-between items-start gap-3 bg-transparent">
                  <FormField
                    title="Total Hours*"
                    name="text"
                    type="number"
                    value={labourHour}
                    handleChange={(e) => {
                      setLabourHour(e.target.value);
                      setLabourErrors((prev) => ({
                        ...prev,
                        labourHour: "",
                      }));
                    }}
                    error={labourErrors.labourHour}
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
                        value={contContractorRate}
                        onChange={(e) => {
                          setContContractorRate(e.target.value);
                          setLabourErrors((prev) => ({
                            ...prev,
                            contContractorRate: "",
                          }));
                        }}
                        className="p-2 outline-none w-full h-[55px] bg-transparent text-primary dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                        placeholder="15"
                      />
                      <span className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-transparent ">
                        $
                      </span>
                    </div>
                    {labourErrors.contContractorRate && (
                      <p className="text-red-500 bg-transparent">
                        {labourErrors.contContractorRate}
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
                      value={employeesNo}
                      handleChange={(e) => {
                        setEmployeesNo(e.target.value);
                        setLabourErrors((prev) => ({
                          ...prev,
                          employeesNo: "",
                        }));
                      }}
                      error={labourErrors.employeesNo}
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
                          value={employeesRate}
                          onChange={(e) => {
                            setEmployeesRate(e.target.value);
                            setLabourErrors((prev) => ({
                              ...prev,
                              employeesRate: "",
                            }));
                          }}
                          className="p-2 outline-none w-full h-[55px] text-primary bg-transparent dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                          placeholder="15"
                        />
                        <span className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-transparent ">
                          $
                        </span>
                      </div>
                      {labourErrors.employeesRate && (
                        <p className="text-red-500 bg-transparent">
                          {labourErrors.employeesRate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {labourType == "Variable" && (
              <div className="flex flex-col gap-y-4 bg-transparent">
                <div className="flex flex-col w-[337px] bg-transparent">
                  <label className="text-primary  dark:text-white mb-1 bg-transparent">
                    Contractor's Total Hourly Rate*
                  </label>
                  <div className=" bg-transparent">
                    <input
                      type="number"
                      value={varriableContTotHourRate}
                      onChange={(e) => {
                        setVarriableContTotHourRate(e.target.value);
                        setLabourErrors((prev) => ({
                          ...prev,
                          varriableContTotHourRate: "",
                        }));
                      }}
                      className="p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                      placeholder="No."
                    />
                  </div>
                  {labourErrors.varriableContTotHourRate && (
                    <p className="text-red-500 bg-transparent">
                      {labourErrors.varriableContTotHourRate}
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
                      value={varriableContRatePerHour}
                      onChange={(e) => {
                        setVarriableContRatePerHour(e.target.value);
                        setLabourErrors((prev) => ({
                          ...prev,
                          varriableContRatePerHour: "",
                        }));
                      }}
                      className="p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none"
                      placeholder="15"
                    />
                    <span className="absolute left-12 top-1/2 dark:text-white transform -translate-y-1/2 bg-transparent ">
                      $
                    </span>
                  </div>
                  {labourErrors.varriableContRatePerHour && (
                    <p className="text-red-500 bg-transparent">
                      {labourErrors.varriableContRatePerHour}
                    </p>
                  )}
                </div>

                {/* add item by click */}
                {variableAddEmployees.map((employee, index) => (
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
                          value={employee.name}
                          onChange={(e) => {
                            updateEmployee(index, "name", e.target.value);
                          }}
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
                          value={employee.hours}
                          onChange={(e) =>
                            updateEmployee(
                              index,
                              "hours",
                              parseInt(e.target.value, 10)
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
                            value={employee.rate}
                            onChange={(e) =>
                              updateEmployee(
                                index,
                                "rate",
                                parseInt(e.target.value, 10)
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
                ))}

                <div className="flex flex-col w-full bg-transparent">
                  <div
                    onClick={addEmployee}
                    className="flex justify-center items-center text-[#00000080] dark:text-white text-[12px] font-[400] leading-[11.94px] w-full h-[30px] rounded-[8px] bg-[#99E8FF33] cursor-pointer"
                  >
                    Add Employee +
                  </div>
                  {labourErrors.variableAddEmployees && (
                    <p className="text-red-500 mt-1 bg-transparent">
                      {labourErrors.variableAddEmployees}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {labourSelectedVal === "Project Amount" && (
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
                  selectedValue={materialCostVal}
                  onChange={setMaterialCostVal}
                  error={labourErrors.materialCostVal}
                  width={158}
                />
              </div>

              <div className="flex flex-col w-[337px] h-fit mt-1 bg-transparent">
                <label className=" px-2 pb-1 text-[#000000B2] dark:text-white text-[18px] font-[500] leading-[17.78px] mb-2 bg-transparent">
                  Scope of Work*
                </label>
                <textarea
                  placeholder="Describe the work being done, including key details..."
                  value={uniformScopeWork}
                  onChange={(e) => {
                    setUniformScopeWork(e.target.value);
                    setLabourErrors((prev) => ({
                      ...prev,
                      uniformScopeWork: "",
                    }));
                  }}
                  disabled={materialCostVal === "No" ? true : false}
                  className={` p-3 outline-none border-2 border-[#A9A5A5] dark:border-white bg-transparent rounded-[8px] focus:border-[#00C5FF] w-full min-h-[55px] ${
                    materialCostVal === "No" ? "opacity-50" : ""
                  }`}
                />
                {labourErrors.uniformScopeWork && (
                  <p className="text-red-500 mt-1 bg-transparent">
                    {labourErrors.uniformScopeWork}
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
                    value={uniformProjectAmount}
                    onChange={(e) => {
                      setUniformProjectAmount(e.target.value);
                      setLabourErrors((prev) => ({
                        ...prev,
                        uniformProjectAmount: "",
                      }));
                    }}
                    disabled={materialCostVal === "No" ? true : false}
                    className={`p-2 outline-none w-full h-[55px] text-primary dark:text-white bg-transparent border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none ${
                      materialCostVal === "No" ? "opacity-50" : ""
                    }`}
                    placeholder="15"
                  />
                  <span className="absolute left-8 top-1/2 dark:text-white transform -translate-y-1/2 bg-transparent ">
                    $
                  </span>
                </div>
                {labourErrors.uniformProjectAmount && (
                  <p className="text-red-500 bg-transparent">
                    {labourErrors.uniformProjectAmount}
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
                    value={projectAmountQuantityVal}
                    onChange={(e) => {
                      setProjectAmountQuantityVal(e.target.value);
                      setLabourErrors((prev) => ({
                        ...prev,
                        projectAmountQuantityVal: "",
                      }));
                    }}
                    disabled={materialCostVal === "No" ? true : false}
                    className={`p-2 outline-none w-full h-[55px] text-primary bg-transparent dark:text-white border-2 border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] appearance-none ${
                      materialCostVal === "No" ? "opacity-50" : ""
                    }`}
                    placeholder="1"
                  />
                </div>
                {labourErrors.projectAmountQuantityVal && (
                  <p className="text-red-500 bg-transparent">
                    {labourErrors.projectAmountQuantityVal}
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
