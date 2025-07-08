import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout11Props {
  handleClickEvent: () => void;
  subtotal: number;
  tax: number;
  total: number;
  setHoveredWord: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  activeTabIndex: number;
  imagePreview: string;
  hoveredWord: string;
  contractorSignUrl: string | null;
  clientSignUrl: string | null;
  contractorSign: string | null;
  clientSign: string | null;
  loading: boolean;
  invoiceData: invoiceDataPropsType;
  activeColorData: colorStates;
}

const BillLayout11: React.FC<billLayout11Props> = ({
  handleClickEvent,
  activeTabIndex,
  imagePreview,
  hoveredWord,
  invoiceData,
  activeColorData,
  loading,
  contractorSignUrl,
  clientSignUrl,
  contractorSign,
  clientSign,
  subtotal,
  tax,
  total,
  setHoveredWord,
  setImagePreview,
}) => {
  const [billLogoImageData] = useAtom(billLogoImageDataAtom);
  const imageData = billLogoImageData[activeTabIndex].billLogoImage;
  return (
    <div
      id="invoice-container"
      onClick={handleClickEvent}
      className="print-page break-after-page relative w-full h-full mx-auto bg-white px-12 py-6 overflow-auto"
    >
      <div className="mx-auto flex flex-col gap-1 max-w-[800px] bg-white border-y-4 border-black py-1">
        <div className="flex flex-col w-full h-fit border-y-2 border-black">
          {/* Header Section */}
          <div className="flex flex-col print-page w-full h-fit">
            {/* header top */}

            <div className="flex flex-row justify-between items-center w-full px-3 pt-4">
              <div className="flex flex-1 flex-row justify-center items-center border-[3px] border-black p-4 w-fit">
                {/* logo */}
                {/* <div className="flex flex-row h-full justify-center items-center gap-3"> */}
                  <div className="relative w-[8rem] h-[8rem] rounded-full border-4 border-black overflow-hidden bg-white">
                    <img
                      src={
                        imageData
                          ? URL.createObjectURL(imageData)
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
                      }
                      // style={{ position: "absolute", inset: 0, objectFit: "cover", width: "100%", height: "100%" }}

                      alt="Company Logo"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                {/* </div> */}
                <div className="flex flex-col justify-center items-start text-black leading-[2.8rem]">
                  {/* {invoiceData.title} */}
                  <span className="text-[3rem] font-mono">ELECTRICAL</span>
                  <span className="text-[3.7rem] font-bold">FINISH</span>
                </div>
              </div>

              <div className="flex flex-1 justify-end items-start w-fit">
                <h1
                  className="text-7xl font-extrabold uppercase text-black"
                  style={{ WebkitTextStroke: "2px black" }}
                >
                  INVOICE
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-1 print-page w-full h-fit">
            <div className="flex flex-col border-r-2 border-black w-[25%] pt-6 pl-6 pr-4">
              <div className="flex flex-col justify-start items-start w-full gap-16">
                {/* Billed To Section */}

                <div className="flex flex-col flex-1 justify-start items-start w-full h-full">
                  <div className="flex flex-col justify-start items-start gap-3">
                    <div className=" flex flex-col justify-start items-start">
                      <p className="text-[1rem] text-black font-bold">
                        Billed to:
                      </p>
                      <p className="text-[1rem] text-black font-medium ">
                        {invoiceData.billedTo.name}
                        {/* Thomas Residence */}
                      </p>
                      <p className="text-[1rem] text-black font-medium">
                        {invoiceData.billedTo.address}
                        {/* 1123 Example Ave. */}
                      </p>
                      <p className="text-[1rem] text-black font-medium">
                        {invoiceData.billedTo.city}
                        {/* Berverly Hills, CA */}
                      </p>
                      <p className="text-[1rem] text-black font-medium">
                        {/* {invoiceData.invoiceNumber} */}
                        12345
                      </p>
                    </div>
                  </div>
                </div>

                {/* by to */}

                <div className="flex flex-col flex-1 justify-start items-start gap-5 h-full w-full print-page">
                  <div className=" flex flex-col justify-start items-start h-full">
                    <div className="flex flex-col justify-start items-start w-full bg-white">
                      <p className="text-[1rem] font-medium">Due Date:</p>
                      <p className="text-[1rem] font-medium text-black">
                        {invoiceData.dateOfIssue}
                        {/* 08/05/2025 */}
                      </p>
                      <p className="text-[1rem] text-black font-medium">
                        Sample Electric
                      </p>
                      <p className="text-[1rem] font-medium text-black">
                        {invoiceData.clientNumber}
                        {/* 123-123-1234 */}
                      </p>
                      {/* <p className="text-[1.1rem] font-medium text-black">
                  {/* {invoiceData.clientMailID} */}
                      {/* example@gmail.com
                </p>  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col print-page border-l-4 border-black w-[75%] pt-6">
              {/* Table Section */}
              <div className="flex flex-col w-full gap-2 py-2 px-2 bg-transparent  ">
                <div className="flex flex-col w-full gap-2 bg-transparent ">
                  <div className="flex flex-col w-full bg-transparent ">
                    <div className="flex flex-col w-full bg-transparent pb-8 pt-1 border-t-2 border-black">
                      <div
                        className="flex justify-between items-center text-[1.1rem] font-bold bg-black/10"
                        // style={{
                        //   // borderColor: activeColorData.outlineColor,
                        //   color: activeColorData.labelColor,
                        // }}
                      >
                        <p className="w-[200px] py-2 text-start px-2">
                          Description
                        </p>
                        <p className="w-[100px] py-2 text-center">Unit Cost</p>
                        <p className="w-[130px] py-2 text-center">
                          Qty/Hr Rate
                        </p>
                        <p className="w-[100px] py-2 text-center">Amount</p>
                      </div>

                      {invoiceData.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-black relative"
                          onMouseEnter={() => setHoveredWord(item.description)}
                          onMouseLeave={() => setImagePreview("")}
                        >
                          <p
                            style={{
                              color: activeColorData.descriptionsColor,
                            }}
                            className="w-[200px] py-2 text-wrap text-start px-2 relative"
                          >
                            {hoveredWord === item.description &&
                              imagePreview && (
                                <div className="absolute -top-[200px] left-0 bg-white p-2 border rounded shadow-lg z-50 w-[250px]">
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-[180px] object-cover rounded"
                                  />
                                </div>
                              )}
                            {item.description}
                            {/* description */}
                            {hoveredWord === item.description && loading && (
                              <div className="absolute -top-[40px] left-0 bg-white text-xs px-2 py-1 border rounded shadow-md z-50">
                                Loading...
                              </div>
                            )}
                          </p>

                          <p
                            style={{
                              color: activeColorData.valuesColor,
                            }}
                            className="w-[100px] py-2 text-center"
                          >
                            ${item.unitCost.toFixed(2)}
                            {/* 40 */}
                          </p>
                          <p
                            style={{
                              color: activeColorData.valuesColor,
                            }}
                            className="w-[130px] py-2 text-center"
                          >
                            {item.quantity}
                            {/* 40 */}
                          </p>
                          <p
                            style={{
                              color: activeColorData.valuesColor,
                            }}
                            className="w-[100px] py-2 text-center"
                          >
                            ${(item.unitCost * item.quantity).toFixed(2)}
                            {/* 300 */}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-row border-t-2 border-black w-full pt-2">
                      <div className="flex flex-row justify-end items-center gap-20 w-full pr-2 bg-black/10">
                        <p className="text-[2rem] font-medium">
                          Invoice Total:
                        </p>
                        <p
                          style={{ color: activeColorData.valuesColor }}
                          className="text-3xl font-medium"
                        >
                          ${total.toFixed(2)}
                          {/* $140 */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Section */}
              <div className=" flex print-page flex-row justify-end items-start bg-transparent w-full h-fit pt-5">
                <div className=" flex flex-row justify-start items-end  bg-transparent">
                  <div className="flex flex-row justify-start items-end w-full bg-transparent">
                    <div className="flex flex-col justify-start items-end text-right bg-transparent">
                      <div className="flex justify-between gap-20 bg-transparent">
                        <p className="font-bold text-[1.1rem] text-black w-[200px] ">
                          Subtotal:
                        </p>
                        <p
                          style={{ color: activeColorData.valuesColor }}
                          className="font-bold text-[1.1rem] text-start w-[90px] "
                        >
                          ${subtotal.toFixed(2)}
                          {/* $0 */}
                        </p>
                      </div>
                      <div className="flex justify-between gap-20 bg-transparent">
                        <p className="font-bold text-[1.1rem] text-black w-[200px] ">
                          Tax Rate:
                        </p>
                        <p
                          style={{ color: activeColorData.valuesColor }}
                          className="font-bold text-[1.1rem] text-start w-[90px] "
                        >
                          {invoiceData.taxRate}%{/* 0% */}
                        </p>
                      </div>
                      <div className="flex justify-between gap-20 bg-transparent">
                        <p className="font-bold text-[1.1rem] text-black w-[200px] ">
                          Tax:
                        </p>
                        <p
                          style={{ color: activeColorData.valuesColor }}
                          className="font-bold text-[1.1rem] text-start w-[90px] "
                        >
                          ${tax.toFixed(2)}
                          {/* 0% */}
                        </p>
                      </div>
                      <div className="flex justify-between gap-20 bg-transparent mt-4">
                        <p className="font-bold text-[1.1rem] text-black text-right w-[200px]">
                          Total:
                        </p>
                        <p
                          style={{ color: activeColorData.valuesColor }}
                          className="font-bold text-[1.1rem] text-start w-[90px] "
                        >
                          ${total.toFixed(2)}
                          {/* $140 */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-2 pl-2 bg-transparent w-full">
                <p className=" text-lg bg-transparent">
                  <span className="font-bold text-black bg-transparent">
                    Service Agreement:
                  </span>
                  <br />
                  <span className="flex text-[1.01rem] font-normal w-full text-black bg-transparent">
                    {/* {invoiceData.terms} */}
                    Change orders will result in a "time and material" cost
                    basis.
                  </span>
                </p>
              </div>

              <div className="flex flex-row justify-between items-end h-[250px] w-full invoice-page print-page bg-transparent pb-8 pl-2">
                <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit bg-transparent">
                  <div className="flex flex-col justify-center items-center w-fit bg-transparent">
                    {clientSignUrl && (
                      <div className="flex justify-center items-center p-1 w-[201px] h-[100px] object-contain">
                        <img
                          src={
                            clientSignUrl ||
                            "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                          }
                          alt="img"
                          className="w-fit h-fit"
                        />
                      </div>
                    )}
                    <div className="w-[215px] my-2 border-b border-[#000000] bg-transparent"></div>
                    <span className="flex text-[#000000] text-center text-[20px] font-medium bg-transparent">
                      {clientSign ? clientSign : "Client Signature"}
                      {/* Client Signature */}
                    </span>
                  </div>

                  <div className="flex flex-row justify-start gap-2 items-end w-fit bg-transparent">
                    <span className="flex text-[#000000] text-center text-[1rem] font-medium bg-transparent">
                      Date:
                    </span>
                    <div className="flex flex-col justify-end items-center w-[150px] h-[30px] bg-transparent">
                      {invoiceData.clientDate && (
                        <span className="flex w-full justify-center items-center bg-transparent">
                          {invoiceData.clientDate}
                        </span>
                      )}
                      <div className="w-full border-b-2 border-[#000000] bg-transparent"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit bg-transparent">
                  <div className="flex flex-col justify-center items-center w-fit bg-transparent">
                    {contractorSignUrl && (
                      <div className="flex justify-center items-center p-1 w-[201px] h-[100px] object-contain">
                        <img
                          src={
                            contractorSignUrl ||
                            "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                          }
                          alt="img"
                          className="w-fit h-fit"
                        />
                      </div>
                    )}
                    <div className="w-[215px] my-2 border-b border-[#000000] bg-transparent"></div>
                    <span className="flex text-[#000000] text-center text-[20px] font-medium bg-transparent">
                      {contractorSign ? contractorSign : "Contractor Signature"}
                      {/* Contractor Signature */}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start gap-2 items-end w-full bg-transparent">
                    <span className="flex text-[#000000] text-center text-[1rem] font-medium bg-transparent">
                      Date:
                    </span>
                    <div className="flex flex-col justify-end items-center w-[150px] h-[30px] bg-transparent">
                      {invoiceData.contractorDate && (
                        <span className="flex w-full justify-center items-center bg-transparent">
                          {invoiceData.contractorDate}
                        </span>
                      )}
                      <div className="w-full border-b-2 border-[#000000] bg-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillLayout11;
