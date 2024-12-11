import { useAtom } from "jotai";
import FormField from "../../../components/form/FormField";
import { errorsAtom, formDataAtom } from "../../../variables/electricalInvoiceVariable";

const InvoiceInfo = () => {

  const [formData, setFormData] = useAtom(formDataAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  // Input change handler
  // Input change handler with real-time error removal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update errors as the user types and corrects the inputs
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Validation checks for each field
      if (name === "dateOfIssue" && value) {
        newErrors.dateOfIssue = "";
      }

      if (name === "companyName" && value) {
        newErrors.companyName = "";
      }
      
      if (name === "phoneNumber" && /^\d{10}$/.test(value)) {
        newErrors.phoneNumber = "";
      }

      if (name === "email" && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        newErrors.email = "";
      }

      return newErrors;
    });
  };
  // console.log(formData.companyLogo);
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    setFormData({
      ...formData,
      companyLogo: file,
    });
    setErrors((prev) => ({
      ...prev,
      companyLogo: ""
    })); 

  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8 bg-transparent ">
      {/* Form Inputs */}
      <div className="flex flex-col gap-y-4 bg-transparent">
        <div className="flex flex-row justify-between items-center w-full bg-transparent">
          <FormField
            title="Date of Issue*"
            name="dateOfIssue"
            type="date"
            value={formData.dateOfIssue}
            handleChange={handleChange}
            error={errors.dateOfIssue}
            width={306}
            height={55}
          />

          <FormField
            title="Company Name*"
            name="companyName"
            type="text"
            value={formData.companyName}
            handleChange={handleChange}
            error={errors.companyName}
            width={306}
            height={55}
          />
        </div>
        <div className="flex flex-row justify-between items-center w-full bg-transparent">
          <div>
            <label className="block mb-2 text-primary dark:text-white bg-transparent">Phone Number*</label>
            <div className="flex w-[306px] h-[55px] border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] p-2 items-center">
              {/* Country Code */}
              <select
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    countryCode: e.target.value,
                  }))
                }
                className="bg-transparent border-none outline-none text-primary dark:text-white w-fit"
              >
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+91">IN +91</option>
                {/* Add more country codes as needed */}
              </select>

              {/* Divider */}
              <span className="px-2 text-primary dark:text-white bg-transparent">|</span>

              {/* Phone Number Input */}
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="outline-none border-none w-full flex-grow bg-transparent"
                placeholder="123-456-7890"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 bg-transparent">{errors.phoneNumber}</p>
            )}
          </div>

          <FormField
            title="Email*"
            name="email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            error={errors.email}
            width={306}
            height={55}
          />
        </div>

        {/* Company Logo with Drag and Drop */}
        <div className="flex flex-col w-full bg-transparent">
          <label className="block mb-2 text-primary dark:text-white bg-transparent">Company Logo*</label>
          <div className="mt-1 p-3 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-[693px] h-fit">
            <div className="w-full h-full justify-between bg-transparent">
              {!formData.companyLogo && <p className="text-[#0000004D] dark:text-white text-[18px] mt-1 ml-1 mb-4 bg-transparent">
                Drag and Drop here
              </p>}
              {/* <p className="text-gray-400">or</p> */}
              <div className="flex flex-col gap-2 w-full items-start bg-transparent">
                {formData.companyLogo && (
                  <div className="flex justify-center items-center w-[83px] h-[77px] ml-4 rounded-[5px] bg-transparent">
                    <img
                      className="w-full h-full  rounded-[5px]"
                      src={URL.createObjectURL(formData.companyLogo)}
                      alt=""
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="actual-btn"
                  name="companyLogo"
                  onChange={handleFileChange}
                  className=" ml-4 mt-4 mb-2 w-full"
                  hidden
                />
                <label
                  htmlFor="actual-btn"
                  className="flex justify-center items-center text-center ml-4 mt-2 cursor-pointer  w-[110px] font-[400] text-[14px] font-[#000000B2] h-[30px] rounded-[5px] bg-[#D9D9D9] dark:text-black"
                >
                  {formData.companyLogo ?"Replace Logo" :"Upload Logo"}
                </label>
              </div>
            </div>
          </div>
          {errors.companyLogo && (
            <p className="text-red-500 bg-transparent">{errors.companyLogo}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;
