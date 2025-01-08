// import { activeTabIndexAtom } from "../../variables/NavbarVariables";
// import { stepsAtom } from "../../variables/Home";
// import { useAtom } from "jotai";

interface NavigateButtonsProps {
  handleCancel?: (() => void) | null;
  handleSave?:(() => void) | null;
}

const NavigationSaveCancel = ({
  handleCancel = null,
  handleSave = null,
}: NavigateButtonsProps) => {
//   const [stepsData,] = useAtom(stepsAtom);
//    const [activeTabIndex] = useAtom(activeTabIndexAtom);
//    const activeSteps = stepsData[activeTabIndex]
  return (
    <div className="flex flex-row w-full justify-end gap-x-4 items-center bg-transparent">
      <button
        onClick={handleCancel || (() => {
          //
        })}
        className="py-1 px-6 text-lg font-[700] bg-secondary border-2 border-bgcol rounded-[20px] text-bgcol"
      >
        Cancel
      </button>
      <button
        onClick={handleSave || (() => {
          //
        })}
        className="py-1 px-6 text-lg font-[700] bg-bgcol rounded-[20px] text-secondary"
      >
       Save
      </button>
    </div>
  );
};

export default NavigationSaveCancel;

