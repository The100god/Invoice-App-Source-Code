import { useAtom } from "jotai";
import FormField from "../../../components/form/FormField";
import {
  formDataAtom,
  errorsAtom,
  InvoiceFormData,
} from "../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";

const InvoiceInfo = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const [errors, setErrors] = useAtom(errorsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  const handleChange = (
    key: keyof InvoiceFormData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    // Update the specific tab's formData
    const updatedData = [...formData];
    if (key === "companyLogo") {
      console.error("Use handleFileChange for file inputs");
      return; // Ensure companyLogo is handled separately
    }
    updatedData[activeTabIndex][key] = value;
    setFormData(updatedData);

    // Update the specific tab's errors
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];

      if (key === "phoneNumber" && /^\d{10}$/.test(value)) {
        updatedErrors[activeTabIndex].phoneNumber = "";
      } else if (
        key === "email" &&
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ) {
        updatedErrors[activeTabIndex].email = "";
      } else if (key === "dateOfIssue" && value) {
        updatedErrors[activeTabIndex].dateOfIssue = "";
      } else if (key === "companyName" && value) {
        updatedErrors[activeTabIndex].companyName = "";
      }

      return updatedErrors;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    // Update the specific tab's formData for the file input
    const updatedData = [...formData];
    updatedData[activeTabIndex].companyLogo = file; // This ensures only a File or null is assigned
    setFormData(updatedData);

    // Clear any errors related to the file
    const updatedErrors = [...errors];
    updatedErrors[activeTabIndex].companyLogo = "";
    setErrors(updatedErrors);
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const updatedData = [...formData];
    updatedData[activeTabIndex].countryCode = value;
    setFormData(updatedData);
  };

  const activeFormData = formData[activeTabIndex];
  const activeErrors = errors[activeTabIndex];

  // console.log("formdata", formData)
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-8 bg-transparent">
      <div
        id="invoiceInfoTour"
        className="flex flex-col gap-y-4 bg-transparent"
      >
        <div className="flex flex-row justify-between items-center w-full bg-transparent">
          <FormField
            title="Date of Issue*"
            name="dateOfIssue"
            type="date"
            placeholder="dd/mm/yyyy"
            value={activeFormData.dateOfIssue}
            handleChange={(e) => handleChange("dateOfIssue", e)}
            error={activeErrors.dateOfIssue}
            width={306}
            height={55}
          />

          <FormField
            title="Company Name*"
            name="companyName"
            type="text"
            placeholder="Company"
            value={activeFormData.companyName}
            handleChange={(e) => handleChange("companyName", e)}
            error={activeErrors.companyName}
            width={306}
            height={55}
          />
        </div>

        <div className="flex flex-row justify-between items-center w-full bg-transparent">
          <div>
            <label className="block mb-2 text-primary dark:text-white bg-transparent">
              Phone Number*
            </label>
            <div className="flex w-[306px] h-[55px] border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] p-2 items-center">
              <select
                value={activeFormData.countryCode}
                onChange={handleCountryCodeChange}
                className="bg-transparent border-none outline-none text-primary dark:text-white w-fit"
              >
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+91">IN +91</option>
              </select>
              <span className="px-2 text-primary dark:text-white bg-transparent">
                |
              </span>
              <input
                type="text"
                name="phoneNumber"
                value={activeFormData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e)}
                className="outline-none border-none w-full flex-grow bg-transparent"
                placeholder="123-456-7890"
              />
            </div>
            {activeErrors.phoneNumber && (
              <p className="text-red-500 bg-transparent">
                {activeErrors.phoneNumber}
              </p>
            )}
          </div>

          <FormField
            title="Email*"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={activeFormData.email}
            handleChange={(e) => handleChange("email", e)}
            error={activeErrors.email}
            width={306}
            height={55}
          />
        </div>

        <div className="flex flex-col w-full bg-transparent">
          <label className="block mb-2 text-primary dark:text-white bg-transparent">
            Company Logo*
          </label>
          <div className="mt-1 p-3 flex border-2 border-[#A9A5A5] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-[693px] h-fit">
            <div className="w-full h-full justify-between bg-transparent">
              {!activeFormData.companyLogo && (
                <p className="text-[#0000004D] dark:text-white text-[18px] mt-1 ml-1 mb-4 bg-transparent">
                  Drag and Drop here
                </p>
              )}
              <div className="flex flex-col gap-2 w-full items-start bg-transparent">
                {activeFormData.companyLogo && (
                  <div className="flex justify-center items-center w-[83px] h-[77px] ml-4 rounded-[5px] bg-transparent">
                    <img
                      className="w-full h-full rounded-[5px]"
                      src={URL.createObjectURL(
                        activeFormData.companyLogo as File
                      )}
                      alt="Company Logo"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="actual-btn"
                  onChange={handleFileChange}
                  className="ml-4 mt-4 mb-2 w-full"
                  hidden
                />
                <label
                  htmlFor="actual-btn"
                  className="flex justify-center items-center text-center ml-4 mt-2 cursor-pointer w-[110px] h-[30px] rounded-[5px] bg-[#D9D9D9] dark:text-black"
                >
                  {activeFormData.companyLogo ? "Replace Logo" : "Upload Logo"}
                </label>
              </div>
            </div>
          </div>
          {activeErrors.companyLogo && (
            <p className="text-red-500 bg-transparent">
              {activeErrors.companyLogo}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;
