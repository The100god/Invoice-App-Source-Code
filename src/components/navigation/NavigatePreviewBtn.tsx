interface NavigatePreviewProp {
    handlePreview?: (() => void) | null;
   
  }
  
  const NavigatePreview = ({
    handlePreview = null,
  }: NavigatePreviewProp) => {
    return (
      <div className="flex flex-row w-full justify-start gap-x-4 items-center bg-transparent">
        <button
          onClick={handlePreview || (() => {
            //
          })}
          className="py-1 px-6 text-lg font-[700] bg-secondary border-2 border-bgcol rounded-[20px] text-bgcol"
        >
          Preview
        </button>
        
      </div>
    );
  };
  
  export default NavigatePreview;
  