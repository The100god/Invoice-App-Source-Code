import React from "react";

const InvoiceBill: React.FC = () => {
  const invoiceData = {
    title: "Invoice Type",
    invoiceNumber: "#00000",
    dateOfIssue: "10/21/2024",
    billedTo: {
      name: "Thomas Residence",
      address: "123 Example Ave.",
      city: "Beverly Hills, CA",
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

  return (
    <div className="flex flex-col items-center gap-10 w-full h-full">
      {/* Header Section */}
      <div className="flex flex-row justify-between h-fit w-[1176px] bg-white dark:bg-black dark:text-white items-start p-6">
        <div className="flex flex-col justify-between w-full h-full items-start gap-9 bg-transparent">
          <div className="flex flex-col w-fit h-fit bg-transparent">
            <h1 className="text-5xl text-[#000000] dark:text-white font-[500] bg-transparent">
              {invoiceData.title}
            </h1>
            <p className="text-lg text-[#000000CC] dark:text-white font-[400] bg-transparent">
              {invoiceData.invoiceNumber}
            </p>
          </div>
          {/* Date of Issue */}
          <div className="flex flex-col w-fit h-fit bg-transparent">
            <p className="text-xl font-bold text-[#00000099] dark:text-white bg-transparent">DATE OF ISSUE</p>
            <p className="text-sm text-[#00000099] dark:text-white bg-transparent">
              {invoiceData.dateOfIssue}
            </p>
          </div>
        </div>
        {/* logo image */}
        <div className="w-[179px] h-[179px] bg-gray-300"></div>
      </div>
      <div className="w-[1176px] mx-auto bg-white dark:bg-black dark:text-white">
        {/* Information Section */}
        <div className="p-6 bg-transparent">
          <div className="grid grid-cols-2 gap-6 bg-transparent">
            {/* Billed To */}
            <div>
              <p className="text-xl font-bold text-[#00000099] dark:text-white bg-transparent">BILLED TO</p>
              <p className="text-[#00000099] dark:text-white bg-transparent">{invoiceData.billedTo.name}</p>
              <p className="text-[#00000099] dark:text-white bg-transparent">{invoiceData.billedTo.address}</p>
              <p className="text-[#00000099] dark:text-white bg-transparent">{invoiceData.billedTo.city}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          {/* Table Header */}
          <div className="flex justify-between items-center border-b-4 border-[#000000] dark:border-white bg-transparent py-3 text-xl font-bold text-[#00000099] dark:text-white">
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
              className="flex justify-between items-center py-3 border-b-2 border-[#000000E5] bg-transparent dark:border-white text-gray-800 dark:text-white"
            >
              {/* DESCRIPTION */}
              <p className="flex-1 text-left bg-transparent">{item.description}</p>
              {/* Smaller Fields on the Right */}
              <div className="flex gap-10 bg-transparent">
                <p className="w-[150px] text-center bg-transparent">
                  ${item.unitCost.toFixed(2)}
                </p>
                <p className="w-[150px] text-center bg-transparent">{item.quantity}</p>
                <p className="w-[150px] text-center bg-transparent">
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
              <p className="text-xl font-bold text-[#00000099] dark:text-white bg-transparent">INVOICE TOTAL</p>
              <p className="text-[52px] font-[400] text-[#000000] dark:text-white bg-transparent">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>

          {/* Subtotal, Tax, and Total */}
          <div className="space-y-2 text-right bg-transparent">
            <div className="flex gap-6 justify-between mb-5 bg-transparent">
              <p className="font-bold text-xl text-[#000000] dark:text-white bg-transparent">SUBTOTAL</p>
              <p className="font-bold text-xl text-[#00000099] dark:text-white bg-transparent">${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] dark:text-white bg-transparent">(TAX RATE) {invoiceData.taxRate}%</p>
              <p className="font-bold text-xl text-[#00000099] dark:text-white bg-transparent">${calculateTax().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] dark:text-white bg-transparent">TAX</p>
              <p className="font-bold text-xl text-[#00000099] dark:text-white bg-transparent">${calculateTax().toFixed(2)}</p>
            </div>
            <div className="flex gap-6 justify-between mb-2 bg-transparent">
              <p className="font-bold text-xl text-[#000000] dark:text-white bg-transparent">TOTAL</p>
              <p className="font-bold text-xl text-[#00000099] dark:text-white bg-transparent">${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
          </div>

          {/* Terms */}
          <p className="flex flex-col mt-6 text-xl text-gray-500 bg-transparent">
            <span className="font-bold text-xl text-[#00000099] dark:text-white bg-transparent">TERMS</span>
            <span className="font-[400] text-xl text-[#000000] dark:text-white bg-transparent"> 
            {invoiceData.terms}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBill;
