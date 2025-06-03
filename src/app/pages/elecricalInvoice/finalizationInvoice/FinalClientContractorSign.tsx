/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAtom } from "jotai";
import { clientContractorAtom } from "../../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";

const FinalClientContractorSign: React.FC = () => {
  const [clientContractorData] = useAtom(clientContractorAtom);

  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeClientContractorData = clientContractorData[activeTabIndex];

  return (
    <div className="h-full flex flex-col w-full items-center justify-center bg-transparent ">
      <div className="flex flex-col justify-center items-center w-full gap-y-8 bg-transparent">
        <div className="flex flex-row justify-between items-center gap-4 w-full bg-transparent">
          

          {/* Client section  */}
          <div className="flex flex-col flex-1 w-[45%] items-end gap-y-4 bg-transparent">
            <div
              className={`flex flex-col w-[100%] dark:bg-black dark:text-white `}
            >
              <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                Client's Full Name*
              </div>
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                {activeClientContractorData.clientNameValue}
              </div>
            </div>

            <div className="flex flex-col w-full bg-transparent mt-8 mb-4">
              <div className="flex flex-row w-[244px] border-b-2 border-black mb-1" />
              <div className="flex flex-row justify-between items-center w-[244px] text-lg text-[#000000] dark:text-white mb-2 bg-transparent">
                {activeClientContractorData.clientSign?activeClientContractorData.clientSign: "Client Signature*"}
              </div>
              
              {activeClientContractorData.clientSignFile? <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[100%] h-[82px] justify-center items-center p-2">
                <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer bg-transparent">
                  <div className="flex justify-center items-center w-full h-full bg-transparent">
                    <img
                      className="max-w-full max-h-full object-contain rounded-[5px]"
                      src={activeClientContractorData.clientSignFile?URL.createObjectURL(
                        activeClientContractorData.clientSignFile
                      ):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U6qbZNuxunkbUcJmlinBFyBUsUu-5mPGCQ&s"}
                      alt="Uploaded Client Signature"
                    />
                  </div>
                </div>
              </div> :
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                Sign Manually after Print*
              </div>
              }
            </div>

            <div
              className={`flex flex-col w-[100%] dark:bg-black dark:text-white `}
            >
              <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                clientDate*
              </div>
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                {activeClientContractorData.clientDateValue?activeClientContractorData.clientDateValue:"Write Manually after Print*"}
              </div>
            </div>
          </div>

          {/* Contractor section  */}
          <div className="flex flex-col flex-1 w-[45%] items-start gap-y-4 bg-transparent">
            <div
              className={`flex flex-col w-[100%] dark:bg-black dark:text-white `}
            >
              <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                Contractor’s Full Name*
              </div>
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                {activeClientContractorData.contractorNameValue}
              </div>
            </div>

            <div className="flex flex-col w-full bg-transparent mt-8 mb-4">
              <div className="flex flex-row w-[244px] border-b-2 border-black mb-1" />
              <div className="flex flex-row justify-between items-center w-[244px] text-lg text-[#000000] dark:text-white mb-2 bg-transparent">
                {activeClientContractorData.contractorSign?activeClientContractorData.contractorSign: "Contractor Signature*"}
              </div>
              
              {activeClientContractorData.contractorSignFile ? <div className="mt-1 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus-within:border-[#00C5FF] w-[100%] h-[82px] justify-center items-center p-2">
                <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer bg-transparent">
                  <div className="flex justify-center items-center w-full h-full bg-transparent">
                    <img
                      className="max-w-full max-h-full object-contain rounded-[5px]"
                      src={activeClientContractorData.contractorSignFile?URL.createObjectURL(activeClientContractorData.contractorSignFile):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2U6qbZNuxunkbUcJmlinBFyBUsUu-5mPGCQ&s"}
                      alt="Uploaded Contractor Signature"
                    />
                  </div>
                </div>
              </div>:
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                Sign Manually after Print*
              </div>
              }
            </div>

            <div
              className={`flex flex-col w-[100%] dark:bg-black dark:text-white `}
            >
              <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
                contractDate*
              </div>
              <div
                className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
              >
                {activeClientContractorData.contractDateValue? activeClientContractorData.contractDateValue : "Write Manually after Print*"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalClientContractorSign;
