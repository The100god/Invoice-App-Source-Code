import {
  activeDropdownAtom,
  // activeProjectIdAtom,
  // activeTabIndexAtom,
  showDescriptionsColorPickerAtom,
  showLabelColorPickerAtom,
  showOutlineColorPickerAtom,
  showValueColorPickerAtom,
} from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
// import { IoClose } from "react-icons/io5";

const Home = () => {
  const [, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );
  // const[activeProjectId]=useAtom(activeProjectIdAtom)
  // const [,setActiveTabIndex] = useAtom(activeTabIndexAtom);
  const [, setShowLabalColorPicker] = useAtom(showLabelColorPickerAtom);
  const [, setShowValueColorPicker] = useAtom(showValueColorPickerAtom);
  const [, setShowOutlineColorPicker] = useAtom(showOutlineColorPickerAtom);

  const handleClick = () => {
    setActiveDropdown(null);
    setShowDescriptionsColorPicker(false);
    setShowValueColorPicker(false);
    setShowLabalColorPicker(false);
    setShowOutlineColorPicker(false);
  };
  return (
    <div
      onClick={handleClick}
      className="h-full w-full flex flex-col items-center justify-center overflow-y-scroll"
    >
      <div className=" relative h-[80%] w-[60%] bg-diamond-gradient bg-blend-multiply flex flex-col items-center justify-center gap-y-4 shadow-[0_0px_10.2px_7px_rgba(0,0,0,0.3)] rounded-[25px]">
        {/* <span className=" absolute flex justify-center items-center top-2 right-2 w-6 h-6 text-[18px] cursor-pointer"><IoClose /></span> */}
        <div className="flex flex-col w-[480px] justify-center items-center gap-0">
          <div className="text-[32px] text-secondary font-[Helvetica Neue]">
            Welcome to
          </div>
          <div className="text-[72px] font-[700] text-secondary mt-[-15px] font-[Helvetica Neue]">
            Bill Smart
          </div>
          <p className="text-[18px] text-secondary mt-2 leading-5 font-[400] text-center w-full">
            Your tool for creating efficient, detailed invoices, tailored for
            electrical contractors in few steps.
          </p>
          <Link to={`/project/selection`}>
            <button className="mt-10 text-center text-[20px] w-[210px] h-[50px] leading-[19.9px] bg-custom-gradient tracking-[0.02em] shadow-custom-inset bg-bgcol rounded-md text-secondary font-[700]">
              Let’s Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
