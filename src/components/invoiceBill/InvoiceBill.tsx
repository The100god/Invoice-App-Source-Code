import { clientFormDataAtom } from "../../variables/electricalInvoiceVariable";
import { activeDropdownAtom, activeTabIndexAtom, colorChangeAtom, showDescriptionsColorPickerAtom, showLabelColorPickerAtom, showOutlineColorPickerAtom, showValueColorPickerAtom } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import React from "react";

const InvoiceBill: React.FC = () => {
  const [colorChange, ] = useAtom(colorChangeAtom)
  const [activeTabIndex, ] = useAtom(activeTabIndexAtom);

  const [clientFormData] = useAtom(clientFormDataAtom);
    const [, setActiveDropdown] = useAtom(activeDropdownAtom);
      const [, setShowLabalColorPicker] = useAtom(showLabelColorPickerAtom);
        const [, setShowValueColorPicker] = useAtom(showValueColorPickerAtom);
        const [, setShowOutlineColorPicker] = useAtom(showOutlineColorPickerAtom);
        const [, setShowDescriptionsColorPicker] =
          useAtom(showDescriptionsColorPickerAtom);
      const handleClickEvent = ()=>{
        setActiveDropdown(null);
        setShowDescriptionsColorPicker(false);
        setShowValueColorPicker(false);
        setShowLabalColorPicker(false);
        setShowOutlineColorPicker(false);
      }

  const activeClientData = clientFormData[activeTabIndex]
  const invoiceData = {
    title: "Invoice Type",
    invoiceNumber: "#00000",
    dateOfIssue: "10/21/2024",
    billedTo: {
      name: activeClientData.clientName? activeClientData.clientName:"Thomas Residence",
      address: activeClientData.address?activeClientData.address:"123 Example Ave.",
      city: activeClientData.city?activeClientData.city:"Beverly Hills, CA",
    },
    items: [
      { description: "Switches & Installations", unitCost: 50, quantity: 10 },
      { description: "6in. Can Light Trim", unitCost: 30, quantity: 5 },
      {
        description: "Receptacles & Cover Plates Installation",
        unitCost: 20,
        quantity: 15,
      },
    ],
    taxRate: 0,
    terms: "Change orders will result in a 'time & material' cost basis.",
  };

  const calculateSubtotal = () =>
    invoiceData.items.reduce(
      (total, item) => total + item.unitCost * item.quantity,
      0
    );

  const calculateTax = () => (calculateSubtotal() * invoiceData.taxRate) / 100;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const activeColorData = colorChange[activeTabIndex]
  return (
    <div onClick={handleClickEvent} className="flex justify-center pt-[24rem] pb-8 items-center w-full h-fit bg-transparent overflow-y-scroll">
    <div className="flex flex-col items-center gap-10 w-[782px] h-fit bg-white">
      {/* Header Section */}
      <div className="flex flex-row justify-between h-fit w-full bg-white items-start p-6">
        <div className="flex flex-col justify-between w-full h-full items-start gap-9 bg-transparent">
          <div className="flex flex-col w-fit h-fit bg-transparent">
            <h1 className="text-5xl text-[#000000] font-[500] bg-transparent">
              {invoiceData.title}
            </h1>
            <p className="text-lg text-[#000000CC] font-[400] bg-transparent">
              {invoiceData.invoiceNumber}
            </p>
          </div>
          {/* Date of Issue */}
          <div className="flex flex-col w-fit h-fit bg-transparent">
            <p style={{color:activeColorData.labelColor}} className="text-xl font-bold  bg-transparent">DATE OF ISSUE</p>
            <p className="text-sm text-[#00000099]  bg-transparent">
              {invoiceData.dateOfIssue}
            </p>
          </div>
        </div>
        {/* logo image */}
        <div className="w-[179px] h-[179px] bg-gray-300"></div>
      </div>
      <div className="w-full mx-auto bg-white ">
        {/* Information Section */}
        <div className="p-6 bg-transparent">
          <div className="grid grid-cols-2 gap-6 bg-transparent">
            {/* Billed To */}
            <div>
              <p style={{color:activeColorData.labelColor}} className="text-xl font-bold bg-transparent">BILLED TO</p>
              <p className="text-[#00000099] bg-transparent">{invoiceData.billedTo.name}</p>
              <p className="text-[#00000099] bg-transparent">{invoiceData.billedTo.address}</p>
              <p className="text-[#00000099] bg-transparent">{invoiceData.billedTo.city}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          {/* Table Header */}
          <div className="flex justify-between items-center border-b-4   bg-transparent py-3 text-xl font-bold text-[#00000099] "
          style={{ 
            borderColor: activeColorData.outlineColor,
            color:activeColorData.labelColor

           }}
          >
            {/* DESCRIPTION - Largest Field */}
            <p className="flex-1 text-left bg-transparent">DESCRIPTION</p>
            {/* Smaller Fields on the Right */}
            <div className="flex gap-10 bg-transparent">
              <p className="w-[150px] text-center bg-transparent">UNIT COST</p>
              <p className="w-[150px] text-center bg-transparent">QTY/HR RATE</p>
              <p className="w-[150px] text-center bg-transparent">AMOUNT</p>
            </div>
          </div>

          {/* Table Rows */}
          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b-2 bg-transparent text-gray-800"
              style={{ borderColor: activeColorData.outlineColor }}
            >
              {/* DESCRIPTION */}
              <p style={{color:activeColorData.descriptionsColor}} className="flex-1 text-left bg-transparent">{item.description}</p>
              {/* Smaller Fields on the Right */}
              <div className="flex gap-10 bg-transparent">
                <p style={{color:activeColorData.valuesColor}} className="w-[150px] text-center bg-transparent">
                  ${item.unitCost.toFixed(2)}
                </p>
                <p style={{color:activeColorData.valuesColor}} className="w-[150px] text-center bg-transparent">{item.quantity}</p>
                <p style={{color:activeColorData.valuesColor}} className="w-[150px] text-center bg-transparent">
                  ${(item.unitCost * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        {/* Footer Section */}
        <div className="p-6 mt-4 bg-transparent">
          {/* Invoice Total */}
          <div className="flex w-full justify-between items-start bg-transparent">

          <div className="flex justify-between items-center mb-6 bg-transparent">
            <div>
              <p
              style={{color:activeColorData.labelColor}}
               className="text-xl font-bold bg-transparent">INVOICE TOTAL</p>
              <p style={{color:activeColorData.valuesColor}} className="text-[52px] font-[400] bg-transparent">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>

          {/* Subtotal, Tax, and Total */}
          <div className="space-y-2 text-right bg-transparent">
            <div className="flex gap-6 justify-between mb-5 bg-transparent">
              <p className="font-bold text-xl text-[#000000] bg-transparent">SUBTOTAL</p>
              <p style={{color:activeColorData.valuesColor}} className="font-bold text-xl bg-transparent">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] bg-transparent">(TAX RATE) {invoiceData.taxRate}%</p>
              <p style={{color:activeColorData.valuesColor}} className="font-bold text-xl bg-transparent">${calculateTax().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] bg-transparent">TAX</p>
              <p style={{color:activeColorData.valuesColor}} className="font-bold text-xl bg-transparent">${calculateTax().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] bg-transparent">TOTAL</p>
              <p style={{color:activeColorData.valuesColor}} className="font-bold text-xl bg-transparent">${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
          </div>

          {/* Terms */}
          <p className="flex flex-col mt-6 text-xl text-gray-500 bg-transparent">
            <span style={{color:activeColorData.labelColor}} className="font-bold text-xl  bg-transparent">TERMS</span>
            <span className="font-[400] text-xl text-[#000000] bg-transparent"> 
            {invoiceData.terms}
            </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InvoiceBill;
