/* eslint-disable @typescript-eslint/no-explicit-any */
import RadioGroup from "../../../components/form/RadioGroup";
import FormField from "../../../components/form/FormField";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  clientContractorAtom,
  clientContractorErrorsAtom,
} from "../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";
import DatePickerWithRadio from "../../../components/form/DatePickerWithRadio";
import SignatureField from "../../../components/form/SignatureField";

const ClientContractorSign: React.FC = () => {
  const [clientContractorData, setClientContractorData] =
    useAtom(clientContractorAtom);
  const [clientContractorErrors, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );
  const [clientSignName, setClientSignName] = useState(true);
  const [contractorSignName, setContractorSignName] = useState(true);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeClientContractorData = clientContractorData[activeTabIndex];
  const activeClientContractorError = clientContractorErrors[activeTabIndex];

  const updateClientContractorData = (
    key:
      | keyof typeof activeClientContractorData
      | keyof typeof activeClientContractorError,
    value: any
  ) => {
    setClientContractorData((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
    updateClientContractorError(key, "");
  };
  const handleContractorFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      updateClientContractorData("contractorSignFile", file);
      updateClientContractorError("contractorSignFile", "");
    }
  };
  const handleClientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      updateClientContractorData("clientSignFile", file);
      updateClientContractorError("clientSignFile", "");
    }
  };

  const updateClientContractorError = (
    key: keyof typeof activeClientContractorError,
    value: string
  ) => {
    setClientContractorErrors((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = { ...updated[activeTabIndex], [key]: value };
      return updated;
    });
  };
  useEffect(
    () =>
      setClientContractorErrors([
        ...clientContractorErrors,
        {
          contractorNameValue: "",
          contractDateValue: "",
          contractorSign: "",
          contractorSignFile: "",
          clientNameValue: "",
          clientDateValue: "",
          clientSign: "",
          clientSignFile: "",
          sign: "",
        },
      ]),
    [activeClientContractorData.sign]
  );
  // console.log("cddata: ", clientContractorData)

  return (
    <div
      id="clientContractorSignTour"
      className="h-full flex flex-col items-center justify-center bg-transparent "
    >
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
            onChange={(e) => updateClientContractorData("sign", e)}
            error={activeClientContractorError.sign}
            width={259}
          />
        </div>

        <div
          className={`flex flex-row justify-between items-center gap-5 w-full bg-transparent ${
            activeClientContractorData.sign === "No"
              ? "opacity-50"
              : "opacity-100"
          }`}
        >
          {/* Client section  */}
          <div className="flex flex-col flex-1 items-end gap-y-8 bg-transparent">
            <FormField
              title="Client's Full Name*"
              name="client name"
              type="text"
              placeholder="e.g John Doe"
              value={activeClientContractorData.clientNameValue}
              handleChange={(e) => {
                updateClientContractorData("clientNameValue", e.target.value);
              }}
              error={activeClientContractorError.clientNameValue}
              width={244}
              height={51}
            />

            {/* <div className="flex flex-col w-fit bg-transparent mt-8 mb-4"> */}
            {/* <label className="text-lg font-medium dark:text-white text-[#000000B2] mb-2 bg-transparent">
                {" "}
                Client Signature*
              </label> */}
            {/* <div className="flex flex-row w-[244px] border-b-2 border-black mb-1" />
              <div className="flex flex-row justify-between items-center w-[244px] text-lg text-[#000000] dark:text-white mb-2 bg-transparent">
                <input
                  type="text"
                  placeholder={`${
                    clientSignName
                      ? "Client Signature*"
                      : "Enter Client Signature*"
                  }`}
                  className=" outline-none flex p-1 w-[90%] bg-transparent"
                  disabled={clientSignName}
                  onChange={(e) => {
                    updateClientContractorData("clientSign", e.target.value);
                  }}
                />

                <span
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => setClientSignName(!clientSignName)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 64 64"
                  >
                    <path d="M53.414,16.757c0.781,0.781,0.781,2.047,0,2.828L22.505,50.495l-10.201,3.412c-1.367,0.457-2.668-0.844-2.211-2.211	l3.412-10.201l30.909-30.909c0.781-0.781,2.047-0.781,2.828,0L53.414,16.757z M41.657,19L17.162,43.495L15,48l1,1l4.505-2.162	L45,22.343L41.657,19z"></path>
                  </svg>
                </span>
              </div> */}
            {/* <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[244px] h-[82px] justify-center items-center p-2">
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
              </div> */}
            {/* {activeClientContractorError.clientSign && (
                <p className="text-red-500 bg-transparent">
                  {activeClientContractorError.clientSign}
                </p>
              )} */}
            <SignatureField
              label="Client Signature"
              nameEditable={clientSignName}
              setNameEditable={setClientSignName}
              updateSignatureName={updateClientContractorData}
              handleFileChange={handleClientFileChange}
              signatureFile={activeClientContractorData.clientSignFile}
              error={activeClientContractorError.clientSign}
              fieldKey="clientSign"
            />
            {/* </div> */}

            <DatePickerWithRadio
              title="Date*"
              name="clientDate"
              value={activeClientContractorData.clientDateValue}
              handleChange={(e) => {
                updateClientContractorData("clientDateValue", e.target.value);
              }}
              width={244}
              height={51}
              error={activeClientContractorError.clientDateValue}
            />
            {/* <FormField
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
            /> */}
          </div>

          {/* Contractor section  */}
          <div className="flex flex-col flex-1 items-start gap-y-8 bg-transparent">
            <FormField
              title="Contractor’s Full Name*"
              name="contractor name"
              type="text"
              placeholder="e.g John Doe"
              value={activeClientContractorData.contractorNameValue}
              handleChange={(e) => {
                updateClientContractorData(
                  "contractorNameValue",
                  e.target.value
                );
              }}
              error={activeClientContractorError.contractorNameValue}
              width={244}
              height={51}
            />

            {/* <div className="flex flex-col w-fit bg-transparent mt-8 mb-4">
              <div className="flex flex-row border-2 w-[244px] border-b-black mb-1" />
              <div className="flex flex-row justify-between items-center w-[244px] text-lg text-[#000000] dark:text-white mb-2 bg-transparent">
                <input
                  type="text"
                  placeholder={`${
                    contractorSignName
                      ? "Contractor Signature*"
                      : "Enter Contractor Signature*"
                  }`}
                  className=" outline-none flex p-1 w-[90%] bg-transparent"
                  disabled={contractorSignName}
                  onChange={(e) => {
                    updateClientContractorData(
                      "contractorSign",
                      e.target.value
                    );
                  }}
                />

                <span
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => setContractorSignName(!contractorSignName)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 64 64"
                  >
                    <path d="M53.414,16.757c0.781,0.781,0.781,2.047,0,2.828L22.505,50.495l-10.201,3.412c-1.367,0.457-2.668-0.844-2.211-2.211	l3.412-10.201l30.909-30.909c0.781-0.781,2.047-0.781,2.828,0L53.414,16.757z M41.657,19L17.162,43.495L15,48l1,1l4.505-2.162	L45,22.343L41.657,19z"></path>
                  </svg>
                </span>
              </div> */}
            {/* <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[244px] h-[82px] justify-center items-center p-2">
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
              </div> */}
            {/* {activeClientContractorError.contractorSign && (
                <p className="text-red-500 bg-transparent">
                  {activeClientContractorError.contractorSign}
                </p>
              )} */}
            <SignatureField
              label="Contractor Signature"
              nameEditable={contractorSignName}
              setNameEditable={setClientSignName}
              updateSignatureName={updateClientContractorData}
              handleFileChange={handleContractorFileChange}
              signatureFile={activeClientContractorData.contractorSignFile}
              error={activeClientContractorError.contractorSign}
              fieldKey="contractorSign"
            />

            {/* </div> */}

            <DatePickerWithRadio
              title="Date*"
              name="contractDate"
              value={activeClientContractorData.contractDateValue}
              handleChange={(e) => {
                updateClientContractorData("contractDateValue", e.target.value);
              }}
              width={244}
              height={51}
              error={activeClientContractorError.contractDateValue}
            />
            {/* <FormField
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
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientContractorSign;
