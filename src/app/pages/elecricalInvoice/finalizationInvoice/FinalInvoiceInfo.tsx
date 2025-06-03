import { useAtom } from "jotai";
import {
  formDataAtom,
} from "../../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../../variables/NavbarVariables";

const FinalInvoiceInfo = () => {
  const [formData] = useAtom(formDataAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const activeFormData = formData[activeTabIndex];
  // console.log("formdata", formData)
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8 bg-transparent">
      <div className="flex flex-col gap-y-4 bg-transparent">
        <div className="flex flex-row justify-between items-center w-full bg-transparent">
            {/* Date */}
          <div
            className={`flex flex-col w-[306px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Date of Issue*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
{activeFormData.dateOfIssue}              
            </div>
          </div>

            {/* Company Name */}
          <div
            className={`flex flex-col w-[306px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Company Name*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.companyName}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full bg-transparent">
          <div>
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
              Phone Number*
            </div>
            <div className="flex w-[306px] h-[55px] border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] p-2 items-center">
              <div
                
                className="flex justify-start items-center bg-transparent border-none outline-none text-primary dark:text-white w-fit"
              >
                {activeFormData.countryCode}
              </div>
              <span className="px-2 text-primary dark:text-white bg-transparent">
                |
              </span>
              <div
                className="flex justify-start items-center outline-none border-none flex-grow bg-transparent"
                >
                {activeFormData.phoneNumber}
                </div>
            </div>
            
          </div>

           {/* Email */}
           <div
            className={`flex flex-col w-[306px] dark:bg-black dark:text-white `}
          >
            <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
            Email*
            </div>
            <div
              className={`flex justify-start items-center dark:[color-scheme:dark] p-2 outline-none border-2 dark:bg-transparent dark:text-white border-[#A9A5A5] dark:border-white rounded-[10px] focus:border-[#00C5FF] h-[55px]`}
            >
              {activeFormData.email}
            </div>
          </div>

          
        </div>

        <div className="flex flex-col w-full bg-transparent">
          <div className="text-lg font-medium text-[#000000B2] dark:text-white mb-2 bg-transparent">
            Company Logo*
          </div>
          <div className="mt-1 p-3 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-[693px] h-fit">
            <div className="w-full h-full justify-between bg-transparent">
              <div className="flex flex-col gap-2 w-full items-start bg-transparent">
                
                  <div className="flex justify-center items-center w-[83px] h-[77px] ml-4 rounded-[5px] bg-transparent">
                    <img
                      className="w-full h-full rounded-[5px]"
                      src={activeFormData.companyLogo? URL.createObjectURL(
                        activeFormData.companyLogo as File
                      ):"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyK9oaIYnSWqW3waOIj14bUudBZ_8KoWIlw&s"}
                      alt="Company Logo"
                    />
                  </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalInvoiceInfo;
