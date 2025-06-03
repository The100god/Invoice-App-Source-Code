import { useAtom } from "jotai";
import { clientFormDataAtom } from "../../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";

const FinalClientDetails = () => {
  const [clientFormData] = useAtom(clientFormDataAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeFormData = clientFormData[activeTabIndex];

  // console.log("clientData", clientFormData)

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-y-8 bg-transparent"
    >
      <div className="flex flex-col gap-y-4 w-full bg-transparent">
        <div className="flex flex-row justify-between items-center gap-x-4 bg-transparent">
          {/* Client's Name */}
          <div
            className={`flex flex-col w-[306px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Client's Name*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.clientName}
            </div>
          </div>

          {/* City and State */}
          <div
            className={`flex flex-col w-[150px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              City*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.city}
            </div>
          </div>

          <div className="flex flex-col w-[250px] bg-transparent">
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              State/Province*
            </div>
            <div className="flex justify-start items-center p-2 border-2 border-[#A9A5A5] dark:bg-black h-[55px] rounded-[10px]">
              {activeFormData.state}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-x-4 bg-transparent">

          {/* zip code */}
          <div
            className={`flex flex-col w-[150px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Zip Code*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.zipCode}
            </div>
          </div>

          {/* Address */}
          <div
            className={`flex flex-col w-[556px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              address*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.address}
            </div>
          </div>

          
        </div>

          
        
      </div>
    </div>
  );
};

export default FinalClientDetails;
