import React from "react";
import { IoClose } from "react-icons/io5";
import NavigationSaveCancel from "../navigation/NavigationSaveCancel";
import LabourSection from "../../app/pages/elecricalInvoice/labourSection";
import { useNavigate } from "react-router/dist";
import { toast } from "react-toastify";

const SelectedExistingProject = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/project/selection");
    toast.success("Labour details is edited successfully", {
      position: "bottom-right",
    });
  };
  const handleCancel = () => {
    navigate("/project/selection");
    toast.info("Labour details is not edited", {
      position: "bottom-right",
    });
  };
  return (
    <div className="h-full w-full flex flex-row items-center justify-between overflow-y-scroll ">
      <div className=" m-auto relative h-[80%] w-[926px] flex flex-col items-center justify-between dark:bg-black shadow-[0_0px_12.2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0px_12.2px_5px_rgba(256,256,256,0.2)] rounded-[25px]">
        <span className=" absolute flex flex-col justify-center items-center top-2 right-2 w-6 h-6 text-[18px] cursor-pointer bg-transparent">
          <IoClose />
        </span>
        <div className="flex flex-col justify-center w-full items-center h-[fit-content] bg-transparent">
          <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] px-6 py-6 bg-transparent">
            <div className="flex flex-col justify-center w-full items-center gap-4 h-[fit-content] bg-transparent">
              <h1 className="text-4xl text-primary dark:text-white font-[700] font-[Helvetica Neue] bg-transparent">
                Labour
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[10px] bg-[#00C5FF29] dark:bg-[#B0EDFF54]"></div>

        <div
          className={`flex flex-col w-full h-[506px] bg-transparent p-4 overflow-y-scroll`}
        >
          <div className="mt-8 bg-transparent">
            <LabourSection />
          </div>
        </div>

        <div className="flex justify-between w-full h-[fit-content] bg-[#C5D9DE80] dark:darkBottom bottom-0 px-4 py-6 rounded-b-[15px]">
          <NavigationSaveCancel
            handleCancel={handleCancel}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedExistingProject;
