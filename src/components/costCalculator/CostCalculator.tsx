
import { costCalculatorAtom } from '../../variables/NavbarVariables';
import { useAtom } from 'jotai';
import React, { useState } from 'react'
import { IoCalculatorOutline, IoClose } from 'react-icons/io5'
import { PiCaretDoubleLeftFill, PiCaretDoubleRightFill } from "react-icons/pi";

const CostCalculator = () => {
    const [costCalculator, setCostCalculator] = useAtom(costCalculatorAtom);
    const [shrinked, setShrinked] = useState(false);

    const [calculatedProjectNo, setCalculatedProjectNo] = useState("1")
    const [calculatedLabourCost, setCalculatedLabourCost] = useState("$1250")
    const [calculatedMaterialCost, setCalculatedMaterialCost] = useState("$15")
    const [calculatedSubTotal, setCalculatedSubTotal] = useState("$1265")

    const toggleShrink = () => setShrinked((prev) => !prev);

  return (
    <div className={`absolute top-0 right-0 transition-all duration-300 ease-in-out ${
        shrinked ? "w-[35px] h-[64px] " : "w-[398px] h-[362px]"
      }  border-Mixed border-solid border-[#A49F9F80] dark:border-white bg-[#000000] dark:text-primary dark:bg-white rounded-[10px] backdrop-blur-[100px]`}>
        {shrinked ? (
            <div className='flex w-full h-full relative'>
            <span
            className=" absolute flex justify-center items-center top-0 left-0 w-6 h-6 text-[10px] text-white dark:text-primary cursor-pointer"
            onClick={toggleShrink}
            ><PiCaretDoubleLeftFill /></span>
        <span
          className="flex justify-center items-center w-full h-full mt-2 text-white dark:text-primary text-[21px] cursor-pointer p-2"
          onClick={toggleShrink}
        >
          <IoCalculatorOutline />
        </span>
        </div>
      ) :
        (<div className='flex relative flex-col w-full h-full bg-transparent'>
            <span 
            className=" absolute flex justify-center items-center top-1 right-2 w-6 h-6 text-[12px] text-white dark:text-primary cursor-pointer"
            onClick={()=> setCostCalculator(!costCalculator)}
            ><IoClose /></span>
            <span
             className=" absolute flex justify-center items-center top-1 left-2 w-6 h-6 text-[12px] text-white dark:text-primary cursor-pointer"
             onClick={toggleShrink}
             ><PiCaretDoubleRightFill /></span>


            <div className='flex text-center justify-center items-center w-full h-[50px] border-b-[0.5px] border-solid border-[#A49F9F80] dark:border-white '>
                <span className='font-[500] text-[16px] leading-[15.81px] text-[#E5E3E3] dark:text-primary dark:bg-white '>Cost Calculator</span>
            </div>

            <div className='flex flex-col item-center w-full h-full'>
                <div className='flex flex-row p-1 w-full h-[49px]'>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    Project
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    Labour
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    Material
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    Subtotal
                    </div>
                </div>
            

                <div className='flex flex-row p-1 w-full h-[49px] bg-[#99E8FF0D] border-[0.25px] border-solid border-[#A49F9F80] backdrop-blur-[100px]'>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    {calculatedProjectNo}
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    {calculatedLabourCost}
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    {calculatedMaterialCost}
                    </div>
                    <div className='flex flex-1 justify-center items-center text-center font-[500] text-[12px] leading-[11.86px] text-[#E5E3E3] dark:text-primary dark:bg-white'>
                    {calculatedSubTotal}
                    </div>
                </div>

            </div>

        </div>)}
      
    </div>
  )
}

export default CostCalculator
