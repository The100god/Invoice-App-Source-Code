import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout9Props {
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

const BillLayout9: React.FC<billLayout9Props> = ({
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
      className="print-page relative w-full h-full bg-white px-4 py-6 overflow-auto print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-[900px] border-4 border-black bg-transparent">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-start w-full bg-transparent">
          <div className="flex flex-col justify-center items-start gap-9 w-full">
            <div className="flex justify-center items-center w-full">
              {/* top  */}
              <div className="flex flex-col justify-center items-center gap-8 w-full h-fit mt-3">
                <div className="flex flex-row justify-center items-center w-full gap-2 p-7">
                  <div className="flex justify-center items-center w-[90px] h-[90px] bg-white mt-4 border-4 border-black rounded-full">
                    <img
                      className="flex justify-center items-center object-contain rounded-full p-1 w-full h-full "
                      src={
                        imageData
                          ? URL.createObjectURL(imageData)
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
                      }
                      alt="Company Logo"
                    />
                  </div>

                  <div className="flex flex-row justify-center items-center w-fit">
                    <div className="flex flex-col justify-center items-center text-black w-fit h-fit leading-[3rem]">
                      <span className="text-[1.4rem] font-medium uppercase text-black">
                        {invoiceData.title}
                        {/* ELECTRICAL FINISH INVOICE */}
                      </span>

                      <span className="text-[4.9rem] font-medium text-black">
                        INVOICE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row border-y-4 border-black w-full p-5">
              <div className="flex flex-1 flex-row justify-center items-start w-full p-3 gap-6 border-r-4 border-black">
                <div className="flex flex-col justify-center items-center w-fit">
                  <div className="flex flex-col justify-center items-start">
                    <div className=" flex flex-row justify-center items-start">
                      <p className="text-[1rem] text-black">DATE:</p>
                      <p className="text-[1rem] text-black">
                        {invoiceData.dateOfIssue}
                        {/* 23/03/2000 */}
                      </p>
                    </div>
                    <div className=" flex flex-col justify-center items-start">
                      <p className="text-[1rem] text-black font-medium">
                        Sample Electric
                      </p>
                      <p className="text-[1rem] text-black">
                        {invoiceData.clientNumber}
                        {/* 1234-567-890 */}
                      </p>
                      <p className="text-[1rem] text-black">
                        {invoiceData.clientMailID}
                        {/* sample@gmail.com */}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-start w-fit">
                  <div className="flex flex-col justify-center items-start">
                    <div className=" flex flex-col justify-center items-start">
                      <p className="text-[1rem] text-black font-medium">
                        Billed to:
                      </p>
                      <p className="text-[1rem] text-black ">
                        {invoiceData.billedTo.name}
                        {/* THOMAS RESIDENCE */}
                      </p>
                    </div>
                    <div className=" flex flex-col justify-center items-start">
                      <p className="text-[1rem] text-black">
                        {invoiceData.billedTo.address}
                        {/* 1123 Example Ave. */}
                      </p>
                      <p className="text-[1rem] text-black">
                        {invoiceData.billedTo.city}
                        {/* Berverly Hills, CA */}
                      </p>
                      <p className="text-[1rem] text-black">
                        {invoiceData.invoiceNumber}
                        {/* 00000 */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center items-end p-3 pr-5 gap-1 bg-transparent">
                <p className="text-4xl tracking-widest font-extralight">
                  Invoice Total
                </p>
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

        {/* Table Section */}
        <div className="p-6 bg-transparent">
          {/* Table Header */}
          <div
            className="flex justify-between items-center px-1 text-xl font-normal border-b-4 border-black"
            style={{
              borderColor: activeColorData.outlineColor,
            }}
          >
            <div className="flex flex-1 py-2 justify-center items-center">
              ITEM DESCRIPTION
            </div>
            <p className="w-[135px] p-4 text-center">UNIT COST</p>
            <p className="w-[150px] p-4 text-center">QTY/HR RATE</p>
            <p className="w-[135px] p-4 text-center">AMOUNT</p>
          </div>

          {/* Table Body */}
          <div className="flex flex-col w-full">
            {invoiceData.items.map((item, index) => (
              <div
                key={index}
                className="flex items-stretch border-b-4 border-black w-full"
                style={{ borderColor: activeColorData.outlineColor }}
                onMouseEnter={() => setHoveredWord(item.description)}
                onMouseLeave={() => setImagePreview("")}
              >
                {/* Description */}
                <div
                  style={{
                    color: activeColorData.descriptionsColor,
                    borderColor: activeColorData.outlineColor,
                  }}
                  className="flex flex-1 justify-start items-start p-4 relative"
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
                  <span>{item.description}</span>
                  {hoveredWord === item.description && loading && (
                    <div className="absolute -top-[40px] left-0 bg-white text-xs px-2 py-1 border rounded shadow-md z-50">
                      Loading...
                    </div>
                  )}
                </div>

                {/* Unit Cost */}
                <div
                  className="w-[15%] p-4 text-center border-l-4 border-black h-full flex items-center justify-center"
                  style={{ color: activeColorData.valuesColor }}
                >
                  ${item.unitCost.toFixed(2)}
                </div>

                {/* Quantity */}
                <div
                  className="w-[20%] p-4 text-center border-l-4 border-black h-full flex items-center justify-center"
                  style={{ color: activeColorData.valuesColor }}
                >
                  {item.quantity}
                </div>

                {/* Amount */}
                <div
                  className="w-[15%] p-4 text-center border-l-4 border-black h-full flex items-center justify-center"
                  style={{ color: activeColorData.valuesColor }}
                >
                  ${(item.unitCost * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className=" flex flex-col justify-start items-start p-6 bg-transparent w-full  gap-8">
          <div className=" flex flex-row justify-between items-center w-full bg-transparent border-b-4 border-black pb-8">
            <div className="flex flex-row justify-between items-start w-full bg-transparent">
              <div className="flex flex-1 flex-col w-[50%] justify-between items-start gap-8 bg-transparent border-r-4 pr-2 border-black">
                <div className="flex flex-row justify-start items-center gap-4 bg-transparent">
                  <p className="flex flex-col text-3xl font-medium text-wrap">
                    <span>INVOICE</span>
                    <span>TOTAL</span>
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="text-6xl font-medium"
                  >
                    ${total.toFixed(0)}
                    {/* $140 */}
                  </p>
                </div>

                <div className="flex flex-col justify-start items-start gap-1 bg-transparent">
                  <p className=" bg-transparent">
                    <span
                      style={{ color: activeColorData.labelColor }}
                      className="font-bold text-lg text-black bg-transparent"
                    >
                      Service Agreement:
                    </span>
                    <br />
                    <span className="font-normal text-sm text-black bg-transparent">
                      {invoiceData.terms}
                      {/* Change orders will result in a "time and material" cost
                      basis. */}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-1 justify-start w-[50%] h-full items-start">
                <div className="flex flex-col justify-start items-end text-right gap-1 w-fit h-full bg-transparent">
                  <div className="flex justify-between gap-20 bg-transparent">
                    <p className=" text-[1.3rem] text-black w-[200px] ">
                      SUBTOTAL:
                    </p>
                    <p
                      style={{ color: activeColorData.valuesColor }}
                      className=" text-[1.3rem] text-center w-[100px] "
                    >
                      ${subtotal.toFixed(2)}
                      {/* $140 */}
                    </p>
                  </div>
                  <div className="flex justify-between gap-20 bg-transparent">
                    <p className=" text-[1.3rem] text-black w-[200px] ">
                      TAX RATE:
                    </p>
                    <p
                      style={{ color: activeColorData.valuesColor }}
                      className=" text-[1.3rem] text-center w-[100px] "
                    >
                      {invoiceData.taxRate}%{/* 20 */}
                    </p>
                  </div>
                  <div className="flex justify-between gap-20 bg-transparent">
                    <p className=" text-[1.3rem] text-black w-[200px] ">TAX:</p>
                    <p
                      style={{ color: activeColorData.valuesColor }}
                      className=" text-[1.3rem] text-center w-[100px] "
                    >
                      ${tax.toFixed(2)}
                      {/* $20 */}
                    </p>
                  </div>
                  <div className="flex justify-between gap-20 bg-transparent">
                    <p className=" text-[1.3rem] text-black text-right w-[200px] ">
                      TOTAL:
                    </p>
                    <p
                      style={{ color: activeColorData.valuesColor }}
                      className=" text-[1.3rem] text-center w-[100px] "
                    >
                      ${total.toFixed(2)}
                      {/* $140 */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end px-6 h-[250px] w-full invoice-page print-page bg-transparent ">
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

        <div className="flex flex-row w-full px-6">
          <div className="flex flex-row justify-between items-center w-full py-1 border-t-4 border-black">
            <p className="text-[1rem] text-black tracking-[0.1em] pl-2">
              {invoiceData.clientNumber}
              {/* 123-123-1234 */}
            </p>
            <p className="text-[1rem] uppercase tracking-[0.3em] text-black">
              {invoiceData.clientMailID}
              {/* example@gmail.com */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillLayout9;
