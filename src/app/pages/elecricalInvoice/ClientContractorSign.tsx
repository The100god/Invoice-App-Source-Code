/* eslint-disable @typescript-eslint/no-explicit-any */
import RadioGroup from "../../../components/form/RadioGroup";
import FormField from "../../../components/form/FormField";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  clientContractorAtom,
  clientContractorErrorsAtom,
} from "../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";

const ClientContractorSign: React.FC = () => {
  const [clientContractorData, setClientContractorData] = useAtom(clientContractorAtom)
  const [clientContractorErrors, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );
  const [activeTabIndex,] =useAtom(activeTabIndexAtom)

  const activeClientContractorData = clientContractorData[activeTabIndex]
  const activeClientContractorError = clientContractorErrors[activeTabIndex]

  const updateClientContractorData = (key: keyof typeof activeClientContractorData, value:any)=>{
    setClientContractorData((prev)=>{
      const updated = [...prev]
      updated[activeTabIndex] = {...updated[activeTabIndex], [key]:value}
      return updated
    })
    updateClientContractorError(key, "")

  }
  const handleContractorFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      updateClientContractorData("contractorSign",file);
      updateClientContractorError("contractorSign", "")
    }
  };
  const handleClientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      updateClientContractorData("clientSign",file);
      updateClientContractorError("clientSign", "")
    }
  };

  const updateClientContractorError = (key:keyof typeof activeClientContractorError, value:string)=>{
    setClientContractorErrors((prev)=>{
      const updated = [...prev]
      updated[activeTabIndex] = {...updated[activeTabIndex], [key]:value}
      return updated
    })
  }
  useEffect(
    () =>
      setClientContractorErrors([...clientContractorErrors, {
        contractorNameValue: "",
        contractDateValue: "",
        contractorSign: "",
        clientNameValue: "",
        clientDateValue: "",
        clientSign: "",
        sign: "",
      }]),
    [activeClientContractorData.sign]
  );

  return (
    <div id="clientContractorSignTour" className="h-full flex flex-col items-center justify-center bg-transparent ">
      <div className="flex flex-col justify-center items-center w-[600px] gap-y-8 bg-transparent">
        {/* Form Inputs */}
        <div className="flex w-full justify-center items-center bg-transparent">
          <RadioGroup
            name="signature"
            label="Require Signature*"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            selectedValue={activeClientContractorData.sign}
            onChange={(e)=>updateClientContractorData("sign",e)}
            error={activeClientContractorError.sign}
            width={259}
          />
        </div>

        <div
          className={`flex flex-row justify-between items-center w-full bg-transparent ${
            activeClientContractorData.sign === "No" ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Contractor section  */}
          <div className="flex flex-col flex-1 items-start gap-y-4 bg-transparent">
            <FormField
              title="Contractor’s Full Name*"
              name="contractor name"
              type="text"
              value={activeClientContractorData.contractorNameValue}
              handleChange={(e) => {
                updateClientContractorData("contractorNameValue",e.target.value);
              }}
              error={activeClientContractorError.contractorNameValue}
              width={244}
              height={51}
            />

            <div className="flex flex-col w-fit bg-transparent">
              <label className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                Contractor Signature*
              </label>
              <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[244px] h-[82px] justify-center items-center p-2">
                <label
                  htmlFor="actual-contractor-btn"
                  className="w-full h-full flex flex-col justify-center items-center cursor-pointer bg-transparent"
                >
                  {!activeClientContractorData.contractorSign ? (
                    <div className="flex flex-col justify-center items-center w-full h-full bg-transparent">
                      <p className="text-[#00000080] dark:text-white text-[32px] font-[400] bg-transparent">
                        +
                      </p>
                      <p className="text-[#00000080] dark:text-white text-[18px] font-[400] w-full text-center bg-transparent">
                        Drag or Upload PNG
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-transparent">
                      <img
                        className="max-w-full max-h-full object-contain rounded-[5px]"
                        src={URL.createObjectURL(activeClientContractorData.contractorSign)}
                        alt="Uploaded Contractor Signature"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="actual-contractor-btn"
                    name="contractorSign"
                    onChange={handleContractorFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {activeClientContractorError.contractorSign && (
                <p className="text-red-500 bg-transparent">
                  {activeClientContractorError.contractorSign}
                </p>
              )}
            </div>

            <FormField
              title="Date*"
              name="contractDate"
              type="date"
              value={activeClientContractorData.contractDateValue}
              handleChange={(e) => {
                updateClientContractorData("contractDateValue",e.target.value);
              }}
              error={activeClientContractorError.contractDateValue}
              width={244}
              height={51}
            />
          </div>

          {/* Client section  */}
          <div className="flex flex-col flex-1 items-end gap-y-4 bg-transparent">
            <FormField
              title="Client's Full Name*"
              name="client name"
              type="text"
              value={activeClientContractorData.clientNameValue}
              handleChange={(e) => {
                updateClientContractorData("clientNameValue",e.target.value);
              }}
              error={activeClientContractorError.clientNameValue}
              width={244}
              height={51}
            />

            <div className="flex flex-col w-fit bg-transparent">
              <label className="text-lg font-medium dark:text-white text-[#000000B2] mb-2 bg-transparent">
                {" "}
                Client Signature*
              </label>
              <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[244px] h-[82px] justify-center items-center p-2">
                <label
                  htmlFor="actual-client-btn"
                  className="w-full h-full flex flex-col justify-center items-center cursor-pointer bg-transparent"
                >
                  {!activeClientContractorData.clientSign ? (
                    <div className="flex flex-col justify-center items-center w-full h-full bg-transparent">
                      <p className="text-[#00000080] dark:text-white text-[32px] font-[400]">
                        +
                      </p>
                      <p className="text-[#00000080] dark:text-white text-[18px] font-[400] w-full text-center bg-transparent">
                        Drag or Upload PNG
                      </p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-transparent">
                      <img
                        className="max-w-full max-h-full object-contain rounded-[5px]"
                        src={URL.createObjectURL(activeClientContractorData.clientSign)}
                        alt="Uploaded Client Signature"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="actual-client-btn"
                    name="clientSign"
                    onChange={handleClientFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              {activeClientContractorError.clientSign && (
                <p className="text-red-500 bg-transparent">
                  {activeClientContractorError.clientSign}
                </p>
              )}
            </div>

            <FormField
              title="Date*"
              name="clientDate"
              type="date"
              value={activeClientContractorData.clientDateValue}
              handleChange={(e) => {
                updateClientContractorData("clientDateValue",e.target.value);
              }}
              error={activeClientContractorError.clientDateValue}
              width={244}
              height={51}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientContractorSign;
