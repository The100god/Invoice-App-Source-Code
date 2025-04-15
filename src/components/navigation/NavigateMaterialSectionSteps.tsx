// import { activeTabIndexAtom } from "../../variables/NavbarVariables";
// import { useAtom } from "jotai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
// import { materialSectionStepsAtom } from "../../variables/electricalInvoiceVariable";

interface NavigateMaterialSectionStepsBtnProps {
  handleBack?: (() => void) | null;
  handleNext?: (() => void) | null;
  activeSteps:number;
}

const NavigateMaterialSectionStepsBtn = ({
  handleBack = null,
  handleNext = null,
  activeSteps
}: NavigateMaterialSectionStepsBtnProps) => {
  // Updated to use materialSectionStepsAtom
  // const [materialSectionSteps] = useAtom(materialSectionStepsAtom);
  // const [activeTabIndex] = useAtom(activeTabIndexAtom);
  // const activeSteps = activeSteps

  // Updated conditions
  const isFirstStep = activeSteps === 0;
  const isLastStep = activeSteps === 3;

  // Separate Ripple Animation States
  const [rippleBack, setRippleBack] = useState<{ x: number; y: number } | null>(null);
  const [rippleNext, setRippleNext] = useState<{ x: number; y: number } | null>(null);

  // Ripple Animation Function
  const createRipple = (
    e: React.MouseEvent<HTMLButtonElement>,
    setRipple: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => setRipple(null), 500);
  };

  return (
    <div className="flex flex-row w-full justify-end gap-x-4 items-center bg-transparent">
      {/* Back Button - Hidden on First Step */}
      {!isFirstStep && (
        <button
          onClick={(e) => {
            createRipple(e, setRippleBack);
            handleBack?.();
          }}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-bgcol border-2 border-bgcol hover:bg-bgcol hover:text-secondary transition-all duration-200 overflow-hidden"
        >
          <FaArrowLeft size={20} />
          {rippleBack && (
            <span
              className="absolute w-20 h-20 bg-bgcol opacity-30 rounded-full animate-ripple"
              style={{
                top: rippleBack.y - 40,
                left: rippleBack.x - 40,
              }}
            />
          )}
        </button>
      )}

      {/* Next Button - Hidden on Last Step */}
      {!isLastStep && (
        <button
          onClick={(e) => {
            createRipple(e, setRippleNext);
            handleNext?.();
          }}
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-bgcol text-secondary hover:bg-secondary hover:text-bgcol transition-all duration-200 overflow-hidden"
        >
          <FaArrowRight size={20} />
          {rippleNext && (
            <span
              className="absolute w-20 h-20 bg-secondary opacity-30 rounded-full animate-ripple"
              style={{
                top: rippleNext.y - 40,
                left: rippleNext.x - 40,
              }}
            />
          )}
        </button>
      )}
    </div>
  );
};

export default NavigateMaterialSectionStepsBtn;
