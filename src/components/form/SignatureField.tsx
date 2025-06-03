import {
  ClientContractorErrorsType,
  ClientContractorStates,
} from "../../variables/electricalInvoiceVariable";
import React, { useState } from "react";
import { MdOutlineImage } from "react-icons/md";

interface SignatureFieldProps {
  label: string;
  nameEditable: boolean;
  setNameEditable: (val: boolean) => void;
  updateSignatureName: (
    field: keyof ClientContractorStates | keyof ClientContractorErrorsType,
    value: any
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  signatureFile: File | null;
  error?: string;
  fieldKey: keyof ClientContractorStates; // 'clientSign' | 'contractorSign'
}

const SignatureField: React.FC<SignatureFieldProps> = ({
  label,
  nameEditable,
  setNameEditable,
  updateSignatureName,
  handleFileChange,
  signatureFile,
  error,
  fieldKey,
}) => {
  const [selectedOption, setSelectedOption] = useState<"upload" | "manual">(
    
  );

  return (
    <div className="flex flex-col w-fit bg-transparent mt-8 mb-4">
      <label className="text-lg font-semibold dark:text-white text-black mb-3">
        {/* Signature Name Input */}
        <div className="flex flex-row justify-between items-center w-[244px] text-lg text-black dark:text-white mb-2">
          {nameEditable ? (
            `${label}*`
          ) : (
            <input
              type="text"
              placeholder={nameEditable ? `${label}*` : `Enter ${label}*`}
              className="outline-none flex p-1 w-[90%] bg-transparent"
              disabled={nameEditable}
              onChange={(e) => updateSignatureName(fieldKey, e.target.value)}
            />
          )}
          <span
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setNameEditable(!nameEditable)}
          >
            ✎
          </span>
        </div>
      </label>

      {/* Upload Signature Option */}
      <div
        className="flex w-[244px] items-center justify-between mb-3 cursor-pointer"
        onClick={() => setSelectedOption("upload")}
      >
        <span
          className={`w-4 h-4 mr-2 flex items-center justify-center border-2 rounded-full ${
            selectedOption === "upload"
              ? "border-[#00C5FF]"
              : "border-[#A9A5A5] dark:border-white"
          }`}
        >
          {selectedOption === "upload" && (
            <span className="w-2 h-2 bg-[#00C5FF] rounded-full" />
          )}
        </span>

        <div className="flex flex-col justify-between items-center w-[90%]">
          <div className="flex justify-between items-center w-full">
            <span className="text-[#000000B2] dark:text-white text-base">
              {!signatureFile ? "Upload Signature*" : `${fieldKey}-uploaded`}
            </span>

            <label
              htmlFor={`upload-${fieldKey}`}
              className="w-fit h-fit flex flex-row justify-center items-center cursor-pointer bg-transparent"
            >
              {/* {!signatureFile ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                  <p className="text-[#00000080] dark:text-white text-[32px] font-[400]">
                    +
                  </p>
                  <p className="text-[#00000080] dark:text-white text-[18px] font-[400] w-full text-center">
                    Drag or Upload PNG
                  </p>
                </div>
              ) : (
                <img
                  className="max-w-full max-h-full object-contain rounded-[5px]"
                  src={URL.createObjectURL(signatureFile)}
                  alt={`${label} Signature`}
                />
              )} */}
              <MdOutlineImage className="ml-2 text-xl text-[#000000B2] dark:text-white" />
              <input
                type="file"
                id={`upload-${fieldKey}`}
                name={fieldKey}
                accept="image/png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-row w-full border-b-2 border-black mt-2 mb-1" />
        </div>
      </div>

      {/* Sign Manually Option */}
      <div
        className="flex items-center mt-2 cursor-pointer"
        onClick={() => setSelectedOption("manual")}
      >
        <span
          className={`w-4 h-4 mr-2 flex items-center justify-center border-2 rounded-full ${
            selectedOption === "manual"
              ? "border-[#00C5FF]"
              : "border-[#A9A5A5] dark:border-white"
          }`}
        >
          {selectedOption === "manual" && (
            <span className="w-2 h-2 bg-[#00C5FF] rounded-full" />
          )}
        </span>
        <span className="text-[#000000B2] dark:text-white text-base">
          Sign Manually after Print*
        </span>
      </div>

      {error && (
        <p className="text-red-500 bg-transparent text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default SignatureField;
