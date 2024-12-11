interface NavigateButtonsProps {
  handleCloseForm?: (() => void) | null; // Allow null as a valid type
}
  
  const NavigateCloseButtons = ({

    handleCloseForm = null,
   
  }: NavigateButtonsProps) => {
    return (
      <div className="flex flex-row w-full justify-end gap-x-4 items-center bg-transparent">
        <button
          onClick={handleCloseForm || (() => {
            //
          })}
          className="py-1 px-6 text-lg font-[700] bg-secondary border-2 border-bgcol rounded-[20px] text-bgcol"
        >
          close
        </button>
      </div>
    );
  };
  
  export default NavigateCloseButtons;
  