import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout10Props {
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


  const BillLayout10: React.FC<billLayout10Props> = ({
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
  const [billLogoImageData] = useAtom(
    billLogoImageDataAtom
  );
  const imageData = billLogoImageData[activeTabIndex].billLogoImage
  return (
    <div
      id="invoice-container"
      onClick={handleClickEvent}
      className="print-page relative w-full h-full bg-white px-4 py-6 overflow-auto print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-1 max-w-[900px] bg-white">
        {/* Header Section */}
        <div className="flex flex-col w-full h-fit border-b-2 border-black">
          {/* header top */}

          <div className="flex flex-row justify-between items-center p-6">
            <div className="flex flex-row justify-center items-start w-fit">
              <div className="flex flex-col justify-center items-start text-black leading-[3.8rem]">
                {/* {invoiceData.title} */}
                <span className="text-[4rem] font-mono">ELECTRICAL</span>
                <span className="text-[4.7rem] font-bold border-b-4 border-black">
                  FINISH
                </span>
              </div>
            </div>

            <div className="flex justify-end items-start w-fit">
              <h1
                className="text-8xl font-extrabold uppercase text-white"
                style={{ WebkitTextStroke: "2px black" }}
              >
                INVOICE
              </h1>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center w-full pb-8">
            {/* logo */}
            <div className="flex flex-row h-full flex-1 justify-center items-center gap-3">
              <div className="w-[11rem] h-[11rem] bg-transparent border-black border-4 rounded-full p-1">
                <img
                  className="flex justify-center items-center object-contain rounded-full w-full h-full "
                  src={
                    imageData
                      ? URL.createObjectURL(imageData)
                      :
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
                  }
                  alt="Company Logo"
                />
              </div>
            </div>
            {/* Billed To Section */}

            <div className="flex flex-col flex-1 justify-center items-center w-full h-full border-x-2 border-black">
              <div className="flex flex-col justify-center items-center gap-3">
                <div className=" flex flex-col justify-start items-start">
                  <p className="text-[1.5rem] uppercase text-black font-bold">
                    Billed to:
                  </p>
                  <p className="text-[1.1rem] text-black font-medium ">
                    {invoiceData.billedTo.name}
                    {/* Thomas Residence */}
                  </p>
                  <p className="text-[1.1rem] text-black font-medium">
                    {invoiceData.billedTo.address}
                    {/* 1123 Example Ave. */}
                  </p>
                  <p className="text-[1.1rem] text-black font-medium">
                    {invoiceData.billedTo.city}
                    {/* Berverly Hills, CA */}
                  </p>
                  <p className="text-[1.1rem] text-black font-medium">
                    {invoiceData.invoiceNumber}
                    {/* 12345 */}
                  </p>
                </div>
              </div>
            </div>

            {/* by to */}

            <div className="flex flex-col flex-1 justify-start items-center gap-5 h-full w-full -mt-8">
              <div className=" flex flex-col justify-start items-start h-full">
                <div className="flex flex-col justify-start items-start w-full bg-white">
                  <div className="flex flex-row justify-start items-center gap-3 w-fit">
                    <p
                      className="text-[1.1rem] font-medium"
                    >
                      Due Date:
                    </p>
                    <p className="text-[1.1rem] font-medium text-black">
                      {invoiceData.dateOfIssue}
                      {/* 08/05/2025 */}
                    </p>
                  </div>
                  <p className="text-[1.1rem] text-black font-medium">
                    Sample Electric
                  </p>
                  <p className="text-[1.1rem] font-medium text-black">
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

        {/* Table Section */}
        <div className="flex flex-col w-full gap-2 py-4 px-2 bg-transparent border-t-4 border-black ">
          <div className="flex flex-col w-full gap-2 p-2 bg-transparent border-2 border-black ">
            <div className="flex flex-col w-full bg-transparent border-4 border-black ">
            <div className="flex flex-col w-full bg-transparent p-4 pb-8 ">
              <div
                className="flex justify-between items-center text-lg font-bold"
                style={{
                  // borderColor: activeColorData.outlineColor,
                  color: activeColorData.labelColor,
                }}
              >
                <p className="w-[350px] py-2 text-start uppercase px-2">
                  Description
                </p>
                <p className="w-[130px] py-2 text-center uppercase">
                  Unit Cost
                </p>
                <p className="w-[150px] py-2 text-center uppercase">
                  Qty/Hr. Rate
                </p>
                <p className="w-[130px] py-2 text-center uppercase">
                  Amount
                </p>
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
                  className="w-[350px] py-2 text-wrap text-start px-2 relative"
                >
                  {hoveredWord === item.description && imagePreview && (
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
                  className="w-[130px] py-2 text-center"
                >
                  ${item.unitCost.toFixed(2)}
                  {/* 40 */}
                </p>
                <p
                  style={{
                    color: activeColorData.valuesColor,
                  }}
                  className="w-[150px] py-2 text-center"
                >
                  {item.quantity}
                  {/* 40 */}
                </p>
                <p
                  style={{
                    color: activeColorData.valuesColor,
                  }}
                  className="w-[130px] py-2 text-center"
                >
                  ${(item.unitCost * item.quantity).toFixed(2)}
                  {/* 300 */}
                </p>
              </div>
               ))}
            </div>
            <div>
<div className="flex flex-row justify-end items-center gap-10 bg-transparent w-full border-t-2 border-black p-3">
                  <p className="text-[2.3rem]">INVOICE TOTAL</p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="text-4xl font-medium"
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
        <div className=" flex flex-row justify-between items-end bg-transparent w-full h-fit gap-8">
          <div className="flex flex-col justify-start items-start gap-2 bg-transparent pl-12 w-full">
            <p className=" text-lg bg-transparent">
              <span
                style={{ color: activeColorData.labelColor }}
                className="font-bold text-black bg-transparent"
              >
                Service Agreement:
              </span>
              <br />
              <span className="flex text-[1.01rem] font-normal w-full text-black bg-transparent">
                {invoiceData.terms}
                {/* Change orders will result in a "time and material" cost basis. */}
              </span>
            </p>
          </div>

          <div className=" flex  flex-row justify-between items-center  bg-transparent">
            <div className="flex flex-row justify-between items-center w-full bg-transparent">
              <div className="flex flex-col justify-start items-end text-right bg-transparent">
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    SUBTOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] text-center w-[100px] "
                  >
                    ${subtotal.toFixed(2)}
                    {/* $0 */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    TAX RATE:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] text-center w-[100px] "
                  >
                    {invoiceData.taxRate}%
                    {/* 0% */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    TAX:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] text-center w-[100px] "
                  >
                    ${tax.toFixed(2)}
                    {/* 0% */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black text-right w-[200px]">
                    TOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] text-center w-[100px] "
                  >
                    ${total.toFixed(2)}
                    {/* $140 */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end h-[250px] w-full invoice-page print-page bg-transparent">
          <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit bg-transparent">
            <div className="flex flex-col justify-center items-center w-fit bg-transparent">
              {clientSignUrl && <div className="flex justify-center items-center p-1 w-[201px] h-[100px] object-contain">
              <img
                src={
                  clientSignUrl ||
                  "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                }
                alt="img"
                className="w-fit h-fit"
              />
            </div>}
              <div className="w-[215px] my-2 border-b border-[#000000] bg-transparent"></div>
              <span className="flex text-[#000000] text-center text-[20px] font-medium bg-transparent">
                {clientSign ? clientSign : "Client Signature"}
                {/* Client Signature */}
              </span>
            </div>

            <div className="flex flex-row justify-center gap-2 items-end w-fit bg-transparent">
              <span className="flex text-[#000000] text-center text-[1rem] font-medium bg-transparent">
                Date:
              </span>
              <div className="flex flex-col justify-end items-center w-[110px] h-[30px] bg-transparent">
                {invoiceData.clientDate && <span className="flex w-full justify-center items-center bg-transparent">
                  {invoiceData.clientDate}
                </span>}
                <div className="w-full border-b-2 border-[#000000] bg-transparent"></div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit bg-transparent">
            <div className="flex flex-col justify-center items-center w-fit bg-transparent">
              {contractorSignUrl&& <div className="flex justify-center items-center p-1 w-[201px] h-[100px] object-contain">
              <img
                src={
                  contractorSignUrl ||
                  "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                }
                alt="img"
                className="w-fit h-fit"
              />
            </div> }
              <div className="w-[215px] my-2 border-b border-[#000000] bg-transparent"></div>
              <span className="flex text-[#000000] text-center text-[20px] font-medium bg-transparent">
                {contractorSign ? contractorSign : "Contractor Signature"}
                {/* Contractor Signature */}
              </span>
            </div>
            <div className="flex flex-row justify-center gap-2 items-end w-fit bg-transparent">
              <span className="flex text-[#000000] text-center text-[1rem] font-medium bg-transparent">
                Date:
              </span>
              <div className="flex flex-col justify-end items-center w-[110px] h-[30px] bg-transparent">
                {invoiceData.contractorDate && <span className="flex w-full justify-center items-center bg-transparent">
                  {invoiceData.contractorDate}
                </span>}
                <div className="w-full border-b-2 border-[#000000] bg-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillLayout10;
