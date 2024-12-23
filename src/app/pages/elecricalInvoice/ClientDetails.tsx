// import { useAtom } from "jotai";
// import FormField from "../../../components/form/FormField";
// import { states } from "../../../constants/states";
// import { clientErrorsAtom, clientFormDataAtom } from "../../../variables/electricalInvoiceVariable";

// const ClientDetails = (
// ) => {

//   const [clientFormData, setClientFormData] = useAtom(clientFormDataAtom);
//   const [clientErrors, setClientErrors] = useAtom(clientErrorsAtom);
  
//   // Input change handler with real-time error removal
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setClientFormData({
//       ...clientFormData,
//       [name]: value,
//     });

//     // Update errors based on valid input
//     setClientErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };

//       if (name === "clientName" && value) {
//         newErrors.clientName = "";
//       }
//       if (name === "address" && value) {
//         newErrors.address = "";
//       }
//       if (name === "city" && value) {
//         newErrors.city = "";
//       }
//       if (name === "state" && value) {
//         newErrors.state = "";
//       }
//       if (name === "zipCode" && /^\d{5}$/.test(value)) {
//         newErrors.zipCode = "";
//       }

//       return newErrors;
//     });
//   };

//   return (
//     <div className="h-full w-full flex flex-col items-center justify-center gap-y-8 bg-transparent">
//       <div className="flex flex-col gap-y-4 min-w-40 bg-transparent">
//         {/* Client's Name */}
//         <FormField
//           title="Client's Name*"
//           name="clientName"
//           type="text"
//           value={clientFormData.clientName}
//           handleChange={handleChange}
//           error={clientErrors.clientName}
//           width={595}
//           height={55}
//         />

//         {/* City and State */}
//         <div className="flex flex-row justify-between items-center gap-x-4 bg-transparent">
//           <FormField
//             title="City*"
//             name="city"
//             type="text"
//             value={clientFormData.city}
//             handleChange={handleChange}
//             error={clientErrors.city}
//             width={250}
//             height={55}
//           />

//           <div className="flex flex-col w-[250px] bg-transparent">
//             <label className="text-primary dark:text-white mb-2 bg-transparent">State*</label>
//             <select
//               name="state"
//               value={clientFormData.state}
//               onChange={handleChange}
//               className="p-2 border-2 border-[#A9A5A5] dark:bg-black h-[55px] rounded-[10px]"
//             >
//               <option value="">Select a state</option>
//               {states.map((state) => (
//                 <option key={state} value={state}>
//                   {state}
//                 </option>
//               ))}
//             </select>
//             {clientErrors.state && (
//               <p className="text-red-500 bg-transparent">{clientErrors.state}</p>
//             )}
//           </div>
//         </div>

//         {/* Address */}
//         <FormField
//           title="Address*"
//           name="address"
//           type="text"
//           value={clientFormData.address}
//           handleChange={handleChange}
//           error={clientErrors.address}
//           width={595}
//           height={55}
//         />

//         {/* Zip Code */}
//         <FormField
//           title="Zip Code*"
//           name="zipCode"
//           type="text"
//           value={clientFormData.zipCode}
//           handleChange={handleChange}
//           error={clientErrors.zipCode}
//           width={306}
//           height={55}
//         />
//       </div>
//     </div>
//   );
// };

// export default ClientDetails;


import { useAtom } from "jotai";
import FormField from "../../../components/form/FormField";
import { states } from "../../../constants/states";
import { clientErrorsAtom, clientFormDataAtom } from "../../../variables/electricalInvoiceVariable";
import { activeTabIndexAtom } from "../../../variables/NavbarVariables";

const ClientDetails = () => {
  const [clientFormData, setClientFormData] = useAtom(clientFormDataAtom);
  const [clientErrors, setClientErrors] = useAtom(clientErrorsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);

  // Input change handler with real-time error removal
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update active tab's form data
    const updatedFormData = [...clientFormData];
    updatedFormData[activeTabIndex] = {
      ...updatedFormData[activeTabIndex],
      [name]: value,
    };
    setClientFormData(updatedFormData);

    // Update errors based on valid input
    const updatedErrors = [...clientErrors];
    const newErrors = { ...updatedErrors[activeTabIndex] };

    if (name === "clientName" && value) {
      newErrors.clientName = "";
    }
    if (name === "address" && value) {
      newErrors.address = "";
    }
    if (name === "city" && value) {
      newErrors.city = "";
    }
    if (name === "state" && value) {
      newErrors.state = "";
    }
    if (name === "zipCode" && /^\d{5}$/.test(value)) {
      newErrors.zipCode = "";
    }

    updatedErrors[activeTabIndex] = newErrors;
    setClientErrors(updatedErrors);
  };

  const activeFormData = clientFormData[activeTabIndex];
  const activeErrors = clientErrors[activeTabIndex];

  // console.log("clientData", clientFormData)

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-8 bg-transparent">
      <div className="flex flex-col gap-y-4 min-w-40 bg-transparent">
        {/* Client's Name */}
        <FormField
          title="Client's Name*"
          name="clientName"
          type="text"
          value={activeFormData.clientName}
          handleChange={handleChange}
          error={activeErrors.clientName}
          width={595}
          height={55}
        />

        {/* City and State */}
        <div className="flex flex-row justify-between items-center gap-x-4 bg-transparent">
          <FormField
            title="City*"
            name="city"
            type="text"
            value={activeFormData.city}
            handleChange={handleChange}
            error={activeErrors.city}
            width={250}
            height={55}
          />

          <div className="flex flex-col w-[250px] bg-transparent">
            <label className="text-primary dark:text-white mb-2 bg-transparent">
              State*
            </label>
            <select
              name="state"
              value={activeFormData.state}
              onChange={handleChange}
              className="p-2 border-2 border-[#A9A5A5] dark:bg-black h-[55px] rounded-[10px]"
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {activeErrors.state && (
              <p className="text-red-500 bg-transparent">{activeErrors.state}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <FormField
          title="Address*"
          name="address"
          type="text"
          value={activeFormData.address}
          handleChange={handleChange}
          error={activeErrors.address}
          width={595}
          height={55}
        />

        {/* Zip Code */}
        <FormField
          title="Zip Code*"
          name="zipCode"
          type="text"
          value={activeFormData.zipCode}
          handleChange={handleChange}
          error={activeErrors.zipCode}
          width={306}
          height={55}
        />
      </div>
    </div>
  );
};

export default ClientDetails;
