import React from "react";

const BillLayout11 = () => {
  return (
    <div
      id="invoice-container"
      //   onClick={handleClickEvent}
      className="print-page w-full h-full bg-white px-4 py-8 overflow-auto print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-[800px] bg-white">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-start w-full p-6 bg-white">
          <div className="flex flex-col gap-9 w-full">
            <div>
              <h1 className="text-5xl font-medium text-black">
                {/* {invoiceData.title} */}
                title
              </h1>
              <p className="text-lg text-black/80">
                {/* {invoiceData.invoiceNumber} */}
                00000
              </p>
            </div>
            <div>
              <p
                // style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                DATE OF ISSUE
              </p>
              <p className="text-sm text-black/60">
                {/* {invoiceData.dateOfIssue} */}
                230333
              </p>
            </div>
          </div>
          <div className="w-[179px] h-[150px] bg-gray-900 border-black rounded-full">
            <img
              className="flex justify-center items-center object-contain rounded-full p-1 w-full h-full "
              src={
                // imageData
                //   ? URL.createObjectURL(imageData)
                //   :
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
              }
              alt="Company Logo"
            />
          </div>
        </div>

        {/* Billed To Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p
                // style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                BILLED TO
              </p>
              <p className="text-black/60">
                {/* {invoiceData.billedTo.name} */}
                billto name
              </p>
              <p className="text-black/60">
                {/* {invoiceData.billedTo.address} */}
                bill to address
              </p>
              <p className="text-black/60">
                {/* {invoiceData.billedTo.city} */}
                bill to city
              </p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white">
          <div
            className="flex justify-between items-center border-b-4 py-3 text-xl font-bold"
            // style={{
            //   borderColor: activeColorData.outlineColor,
            //   color: activeColorData.labelColor,
            // }}
          >
            <p className="flex-1 text-left">DESCRIPTION</p>
            <div className="flex gap-10">
              <p className="w-[150px] text-center">UNIT COST</p>
              <p className="w-[150px] text-center">QTY/HR RATE</p>
              <p className="w-[150px] text-center">AMOUNT</p>
            </div>
          </div>

          {/* {invoiceData.items.map((item, index) => ( */}
          <div
            //   key={index}
            className="flex justify-between items-center border-b-2 text-gray-800 relative"
            //   style={{ borderColor: activeColorData.outlineColor }}
            //   onMouseEnter={() => handleMouseEnter(item.description)}
            //   onMouseLeave={() => setImagePreview("")}
          >
            <p
              // style={{ color: activeColorData.descriptionsColor,
              //   borderColor: activeColorData.outlineColor
              //  }}
              className="flex-1 py-3 text-left border-r-2 relative"
            >
              {/* {hoveredWord === item.description && imagePreview && ( */}
              {/* <div className="absolute -top-[200px] left-0 bg-white p-2 border rounded shadow-lg z-50 w-[250px]">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[180px] object-cover rounded"
                />
              </div>
            )} */}
              {/* {item.description} */}
              description
              {/* {hoveredWord === item.description && loading && ( */}
              {/* <div className="absolute -top-[40px] left-0 bg-white text-xs px-2 py-1 border rounded shadow-md z-50">
                Loading...
              </div>
            )} */}
            </p>
            <div className="flex gap-10">
              <p
                //   style={{ color: activeColorData.valuesColor,
                //     borderColor: activeColorData.outlineColor
                //    }}
                className="w-[150px] py-3 text-center"
              >
                {/* ${item.unitCost.toFixed(2)} */}
                40
              </p>
              <p
                //   style={{ color: activeColorData.valuesColor,
                //     borderColor: activeColorData.outlineColor
                //    }}
                className="w-[150px] py-3 text-center"
              >
                {/* {item.quantity} */}
                40
              </p>
              <p
                //   style={{ color: activeColorData.valuesColor,
                //     borderColor: activeColorData.outlineColor
                //    }}
                className="w-[150px] py-3 text-center"
              >
                {/* ${(item.unitCost * item.quantity).toFixed(2)} */}
                300
              </p>
            </div>
          </div>
          {/* ))} */}
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-white">
          <div className="flex justify-between">
            <div>
              <p
                // style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                INVOICE TOTAL
              </p>
              <p
                // style={{ color: activeColorData.valuesColor }}
                className="text-[52px] font-normal"
              >
                {/* ${calculateTotal().toFixed(2)} */}
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex justify-between gap-6 mb-5">
                <p className="font-bold text-xl text-black">SUBTOTAL</p>
                <p
                  //   style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  {/* ${calculateSubtotal().toFixed(2)} */}
                  300
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">
                  (TAX RATE) 30%
                  {/* {invoiceData.taxRate}% */}
                </p>
                <p
                  //   style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  {/* ${calculateTax().toFixed(2)} */}
                  40
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">TAX</p>
                <p
                  //   style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  {/* ${calculateTax().toFixed(2)} */}
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">TOTAL</p>
                <p
                  //   style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  {/* ${calculateTotal().toFixed(2)} */}
                  40
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xl text-gray-500">
            <span
              //   style={{ color: activeColorData.labelColor }}
              className="font-bold"
            >
              Service Agreement
            </span>
            <br />
            <span className="font-normal text-black">
              {/* {invoiceData.terms} */}
              terms
            </span>
          </p>

          <div className="mt-8 flex flex-col justify-center items-center w-fit">
            <div className="flex justify-center items-center p-1 w-[201px] h-[150px] object-contain">
              <img
                src={
                  // contractorSignUrl ||
                  "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                }
                alt="img"
                className="w-fit h-fit"
              />
            </div>
            <div className="w-[215px] my-2 border-b border-[#000000]"></div>
            <span className="flex text-[#000000] text-[20px] font-medium">
              Contractor Signature
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillLayout11;
