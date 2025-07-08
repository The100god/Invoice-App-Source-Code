import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout4Props {
  handleClickEvent: () => void;
  subtotal: number;
  tax: number;
  total: number;
  setHoveredWord: React.Dispatch<React.SetStateAction<string>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  activeTabIndex: number;
  imagePreview: string;
  hoveredWord: string;
  contractorSign: string | null;
  clientSign: string | null;
  contractorSignUrl: string | null;
  clientSignUrl: string | null;
  loading: boolean;
  invoiceData: invoiceDataPropsType;
  activeColorData: colorStates;
}

const BillLayout4: React.FC<billLayout4Props> = ({
  handleClickEvent,
  activeTabIndex,
  imagePreview,
  hoveredWord,
  invoiceData,
  activeColorData,
  loading,
  contractorSign,
  clientSign,
  contractorSignUrl,
  clientSignUrl,
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
      className="print-page relative w-full h-full bg-white px-4 py-6 overflow-auto print:overflow-visible"
    >
      <div
        className="absolute inset-0 bg-no-repeat m-auto max-w-[900px] h-full top-[10%] bg-center bg-contain opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${
            imageData
              ? URL.createObjectURL(imageData)
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
          })`,
          transition: "background 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex w-full h-4 bg-black absolute top-[228px]"></div>
      <div className="mx-auto flex flex-col gap-5 max-w-[900px] bg-white">
        {/* Header Section */}
        {/* top  */}
        <div className="flex flex-row justify-between items-center w-full h-40">
          <div className="flex flex-row justify-start items-center w-[50%]">
            <h1 className="text-4xl font-medium text-wrap text-start text-black">
              {invoiceData.title}
              {/* Electrical Finished invoice */}
            </h1>
          </div>

          <div className="flex justify-end items-start w-fit">
            <h1 className="text-7xl font-medium text-black">INVOICE</h1>
          </div>
        </div>

        <div className="flex flex-col justify-center items-start ">
          <div className="flex flex-row justify-start items-start w-full bg-white">
            <div className="flex flex-row justify-start items-center gap-3 w-fit">
              <p
                style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                Date:
              </p>
              <p className="text-[1rem] text-black">
                {invoiceData.dateOfIssue}
                {/* 08/05/2025 */}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full h-fit mt-5">
          {/* header left */}
          <div className="flex flex-col flex-1 justify-start items-start gap-5">
            {/* Billed To Section */}

            <div className="flex flex-col justify-start items-start w-fit">
              <div className="flex flex-col justify-start items-start gap-3">
                <div className=" flex flex-col justify-start items-start">
                  <p className="text-[1.2rem] text-black">Billed to:</p>
                  <p className="text-3xl text-black font-medium">
                    {invoiceData.billedTo.name}
                    {/* THOMAS RESIDENCE */}
                  </p>
                </div>

                <div className=" flex flex-col justify-start items-start">
                  <p className="text-[1.1rem] text-black">
                    {invoiceData.billedTo.address}
                    {/* 1123 Example Ave. */}
                  </p>
                  <p className="text-[1.1rem] text-black">
                    {invoiceData.billedTo.city}
                    {/* Berverly Hills, CA */}
                  </p>
                  <p className="text-[1.1rem] text-black">
                    {invoiceData.invoiceNumber}
                    {/* 12345 */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* header Right */}
          <div className="flex flex-col flex-1 justify-start items-end gap-12">
            <div className="flex flex-col justify-end items-end w-fit">
              <div className="flex flex-col justify-center items-end gap-5">
                <div className=" flex flex-col justify-start items-end mt-3">
                  <p className="text-[1.7rem] text-black font-medium">
                    Sample Electric
                  </p>
                  <p className="text-[1.1rem] text-black">
                    {invoiceData.clientNumber}
                    {/* 123-123-1234 */}
                  </p>
                  <p className="text-[1rem] text-black">
                    {invoiceData.clientMailID}
                    {/* example@gmail.com */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mid section  */}
        <div className="flex flex-col justify-center items-start w-full bg-transparent">
          <div className="flex flex-col justify-center items-center w-full gap-2 mt-5 p-6 bg-transparent border-4 border-black ">
            {/* Table Section */}
            <div className="flex flex-col w-full gap-2 py-4 bg-transparent ">
              <div
                className="flex justify-between items-center border-b-4 border-black text-lg font-bold"
                style={{
                  borderColor: activeColorData.outlineColor,
                  color: activeColorData.labelColor,
                }}
              >
                <p className="w-[40%] py-2 text-black text-start  px-2">Description</p>
                <p className="w-[20%] py-2 text-black text-center ">Unit Cost</p>
                <p className="w-[20%] py-2 text-black text-center ">Qty/Hr. Rate</p>
                <p className="w-[20%] py-2 text-black text-center ">Amount</p>
              </div>
              <div className="flex flex-col justify-center items-center border-b-4 border-black pb-6 pt-3 w-full">
                {invoiceData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-black relative w-full"
                    style={{ borderColor: activeColorData.outlineColor }}
                    onMouseEnter={() => setHoveredWord(item.description)}
                    onMouseLeave={() => setImagePreview("")}
                  >
                    <p
                      style={{
                        color: activeColorData.descriptionsColor,
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[40%] py-2 text-wrap px-2 pl-2 relative"
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
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[20%] py-2 text-center"
                    >
                      ${item.unitCost.toFixed(2)}
                      {/* 40 */}
                    </p>
                    <p
                      style={{
                        color: activeColorData.valuesColor,
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[20%] py-2 text-center"
                    >
                      {item.quantity}
                      {/* 40 */}
                    </p>
                    <p
                      style={{
                        color: activeColorData.valuesColor,
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[20%] py-2 text-center"
                    >
                      ${(item.unitCost * item.quantity).toFixed(2)}
                      {/* 300 */}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* calculation */}

            <div className=" flex  flex-row justify-end items-start w-full bg-transparent ">
              <div className="flex flex-col justify-start items-end text-right gap-2 bg-transparent w-fit">
                <div className="flex justify-between w-fit gap-10 bg-transparent">
                  <p className="font-bold text-[1rem] text-black w-[200px] ">
                    SUBTOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1rem] text-center w-[100px] "
                  >
                    ${subtotal.toFixed(2)}
                    {/* $0 */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1rem] text-black w-[200px] ">
                    TAX RATE:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1rem] text-center w-[100px] "
                  >
                    {invoiceData.taxRate}%{/* 0% */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1rem] text-black w-[200px] ">
                    TAX:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1rem] text-center w-[100px] "
                  >
                    ${tax.toFixed(2)}
                    {/* 0% */}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1rem] text-black text-right w-[200px]">
                    TOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1rem] text-center w-[100px] "
                  >
                    ${total.toFixed(2)}
                    {/* $140 */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-end w-full bg-transparent">
            {/* service condition */}
            <div className=" flex flex-row justify-between items-end bg-transparent w-fit h-fit gap-8">
              <div className="flex flex-col justify-start items-end gap-2 bg-transparent">
                <p className=" text-lg bg-transparent">
                  <span
                    style={{ color: activeColorData.labelColor }}
                    className="font-bold text-black bg-transparent"
                  >
                    Service Agreement:
                  </span>
                  <br />
                  <span className="flex text-[1rem] font-normal w-full text-black bg-transparent">
                    {invoiceData.terms}
                    {/* Change orders will result in a "time and material" cost
                    basis. */}
                  </span>
                </p>
              </div>
            </div>

            {/* total invoice  */}

            <div className="flex flex-col justify-center items-center gap-1 bg-transparent w-[40%] py-3 border-4 border-black border-t-0">
              <p className="text-3xl font-normal">INVOICE TOTAL</p>
              <p
                style={{ color: activeColorData.valuesColor }}
                className="text-5xl font-medium"
              >
                ${total.toFixed(2)}
                {/* $140 */}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end w-full h-[250px] invoice-page print-page bg-transparent">
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
            {contractorSignUrl && <div className="flex justify-center items-center p-1 w-[201px] h-[100px] object-contain">
              <img
                src={
                  contractorSignUrl ||
                  "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"
                }
                alt="img"
                className="w-fit h-fit"
              />
            </div>}
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
  );
};

export default BillLayout4;
