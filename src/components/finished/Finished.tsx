import React from "react";

const Finished = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full dark:bg-gray-900 dark:text-white">

      <div className="flex flex-col justify-center items-center w-[592px] h-fit p-2 mt-8 bg-transparent">
        <div className="flex flex-col w-full h-fit justify-center items-center gap-3 bg-transparent">
          <span className="text-[36px] font-[500] leading-[35.57px] text-center text-[#000000] dark:text-white bg-transparent">Congratulations!</span>
          <span className="text-[20px] font-[500] leading-[19.76px] text-center text-[#00C5FF] bg-transparent">Your invoice has been successfully created.</span>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 w-full h-fit p-2 bg-transparent">
          <p className="text-[18px] font-[400] leading-[17.91px] text-center text-[#000000B2] dark:text-white bg-transparent">
            We’ll send a finalized copy to your email within the next 24-48
            hours. Feel free to check your inbox, and don’t hesitate to reach
            out if you need any further assistance.
          </p>
        </div>
      </div>

        <div className="relative flex flex-col justify-center items-center w-[592px] top-[6rem] h-fit p-2 bg-transparent">
            <span className="text-[18px] font-[500] leading-[17.78px] text-center text-[#000000E5] dark:text-white bg-transparent">We appreciate your business!</span>
        </div>

    </div>
  );
};

export default Finished;
