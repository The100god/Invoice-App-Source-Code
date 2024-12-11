import RadioGroup from "../../../components/form/RadioGroup";
import FormField from "../../../components/form/FormField";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  clientContractorErrorsAtom,
  clientDateValueAtom,
  clientNameValueAtom,
  clientSignAtom,
  contractorDateValueAtom,
  contractorNameValueAtom,
  contractorSignAtom,
  signAtom,
} from "../../../variables/electricalInvoiceVariable";

const ClientContractorSign: React.FC = () => {
  const [contractorNameValue, setContractorNameValue] = useAtom(
    contractorNameValueAtom
  );
  const [contractDateValue, setContractDateValue] = useAtom(
    contractorDateValueAtom
  );
  const [contractorSign, setContractorSign] = useAtom(contractorSignAtom);
  const [clientNameValue, setClientNameValue] = useAtom(clientNameValueAtom);
  const [clientDateValue, setClientDateValue] = useAtom(clientDateValueAtom);
  const [clientSign, setClientSign] = useAtom(clientSignAtom);
  const [sign, setSign] = useAtom(signAtom);
  const [clientContractorErrors, setClientContractorErrors] = useAtom(
    clientContractorErrorsAtom
  );

  const handleContractorFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setContractorSign(file);
      setClientContractorErrors((prev) => ({
        ...prev,
        contractorSign: "",
      }));
    }
  };
  const handleClientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setClientSign(file);
      setClientContractorErrors((prev) => ({
        ...prev,
        clientSign: "",
      }));
    }
  };
  useEffect(
    () =>
      setClientContractorErrors({
        contractorNameValue: "",
        contractDateValue: "",
        contractorSign: "",
        clientNameValue: "",
        clientDateValue: "",
        clientSign: "",
        sign: "",
      }),
    [sign]
  );

  return (
    <div className="h-full flex flex-col items-center justify-center bg-transparent ">
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
            selectedValue={sign}
            onChange={setSign}
            error={clientContractorErrors.sign}
            width={259}
          />
        </div>

        <div
          className={`flex flex-row justify-between items-center w-full bg-transparent ${
            sign === "No" ? "opacity-50" : "opacity-100"
          }`}
        >
          {/* Contractor section  */}
          <div className="flex flex-col flex-1 items-start gap-y-4 bg-transparent">
            <FormField
              title="Contractor’s Full Name*"
              name="contractor name"
              type="text"
              value={contractorNameValue}
              handleChange={(e) => {
                setContractorNameValue(e.target.value);
                setClientContractorErrors((prev) => ({
                  ...prev,
                  contractorNameValue: "",
                }));
              }}
              error={clientContractorErrors.contractorNameValue}
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
                  {!contractorSign ? (
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
                        src={URL.createObjectURL(contractorSign)}
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
              {clientContractorErrors.contractorSign && (
                <p className="text-red-500 bg-transparent">
                  {clientContractorErrors.contractorSign}
                </p>
              )}
            </div>

            <FormField
              title="Date*"
              name="contractDate"
              type="date"
              value={contractDateValue}
              handleChange={(e) => {
                setContractDateValue(e.target.value);
                setClientContractorErrors((prev) => ({
                  ...prev,
                  contractDateValue: "",
                }));
              }}
              error={clientContractorErrors.contractDateValue}
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
              value={clientNameValue}
              handleChange={(e) => {
                setClientNameValue(e.target.value);
                setClientContractorErrors((prev) => ({
                  ...prev,
                  clientNameValue: "",
                }));
              }}
              error={clientContractorErrors.clientNameValue}
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
                  {!clientSign ? (
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
                        src={URL.createObjectURL(clientSign)}
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
              {clientContractorErrors.clientSign && (
                <p className="text-red-500 bg-transparent">
                  {clientContractorErrors.clientSign}
                </p>
              )}
            </div>

            <FormField
              title="Date*"
              name="clientDate"
              type="date"
              value={clientDateValue}
              handleChange={(e) => {
                setClientDateValue(e.target.value);
                setClientContractorErrors((prev) => ({
                  ...prev,
                  clientDateValue: "",
                }));
              }}
              error={clientContractorErrors.clientDateValue}
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
