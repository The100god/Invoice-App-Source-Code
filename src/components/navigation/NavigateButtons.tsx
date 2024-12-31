import { activeTabIndexAtom } from "../../variables/NavbarVariables";
import { stepsAtom } from "../../variables/Home";
import { useAtom } from "jotai";

interface NavigateButtonsProps {
  handleBack?: (() => void) | null;
  handleNext?:(() => void) | null;
}

const NavigateButtons = ({
  handleBack = null,
  handleNext = null,
}: NavigateButtonsProps) => {
  const [stepsData,] = useAtom(stepsAtom);
   const [activeTabIndex] = useAtom(activeTabIndexAtom);
   const activeSteps = stepsData[activeTabIndex]
  return (
    <div className="flex flex-row w-full justify-end gap-x-4 items-center bg-transparent">
      <button
        onClick={handleBack || (() => {
          //
        })}
        className="py-1 px-6 text-lg font-[700] bg-secondary border-2 border-bgcol rounded-[20px] text-bgcol"
      >
        Back
      </button>
      <button
        onClick={handleNext || (() => {
          //
        })}
        className="py-1 px-6 text-lg font-[700] bg-bgcol rounded-[20px] text-secondary"
      >
       {activeSteps.electricalSteps === 9 ?"Done":"Next Step"}
      </button>
    </div>
  );
};

export default NavigateButtons;
