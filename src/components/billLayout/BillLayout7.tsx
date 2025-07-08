import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout7Props {
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

const BillLayout7: React.FC<billLayout7Props> = ({
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
      <div className="mx-auto flex flex-col gap-2 max-w-[900px] bg-white  p-4">
        {/* Header Section */}
        {/* top  */}
        <div className="flex flex-col justify-center items-center gap-8 w-full h-fit mt-3 relative">
          <div className="flex flex-row justify-between items-start w-fit absolute right-0 top-0">
            <div className="w-[150px] h-[150px] bg-white border-4 border-black rounded-full">
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
          </div>

          <div className="flex flex-row justify-center mt-14 mr-14 items-center w-fit">
            <div className="flex flex-col justify-center items-center text-4xl text-black">
              {/* {invoiceData.title} */}
              ELECTRICAL FINISH INVOICE
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full h-fit">
          {/* header left */}
          <div className="flex flex-col flex-1 justify-start w-fit items-start gap-5">
            {/* Billed To Section */}

            <div className="flex flex-col justify-start items-start w-full">
              <div className="flex flex-col justify-start items-start gap-3 w-full">
                <div className=" flex flex-col justify-start items-start w-[350px]">
                  <p className="text-[1.4rem] uppercase text-black font-normal">
                    Billed to:
                  </p>
                  <div className="flex justify-start items-start w-full border-[3px] border-black py-2 px-6 rounded-2xl">
                    <p className="text-[1.3rem] text-black">
                      {invoiceData.billedTo.name}
                      {/* THOMAS RESIDENCE */}
                    </p>
                  </div>
                </div>

                <div className=" flex flex-col justify-start items-start border-[3px] border-black rounded-2xl py-2 px-6 w-[350px]">
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
          <div className="flex flex-col flex-1 justify-end items-end">
            <div className="flex justify-start items-end w-fit">
              <h1 className="text-8xl font-medium text-black">INVOICE</h1>
            </div>
          </div>
        </div>

        {/* mid section  */}
        <div className="flex flex-col justify-center items-start gap-5 w-full bg-transparent">
          <div className="flex flex-col justify-center items-center w-full gap-2 py-1 bg-transparent ">
            {/* Table Section */}
            <div
              className="flex justify-between items-center border-[3px] border-black rounded-2xl text-lg font-bold w-full"
              style={{
                borderColor: activeColorData.outlineColor,
                color: activeColorData.labelColor,
              }}
            >
              <p className="w-[380px] py-2 text-black uppercase text-start pl-6">
                Description
              </p>
              <p className="w-[150px] py-2 text-black uppercase text-center ">
                Unit Cost
              </p>
              <p className="w-[180px] py-2 text-black uppercase text-center ">
                Qty/Hr. Rate
              </p>
              <p className="w-[150px] py-2 text-black uppercase text-center ">
                Amount
              </p>
            </div>
            <div className="flex flex-col w-full gap-2 pt-1 bg-transparent border-[3px] border-black rounded-2xl">
              <div className="flex flex-col justify-center items-center pb-6 pt-3 w-full">
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
                      className="w-[380px] py-2 text-wrap pl-6 relative"
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
                      className="w-[150px] py-2 text-center"
                    >
                      ${item.unitCost.toFixed(2)}
                      {/* 40 */}
                    </p>
                    <p
                      style={{
                        color: activeColorData.valuesColor,
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[180px] py-2 text-center"
                    >
                      {item.quantity}
                      {/* 40 */}
                    </p>
                    <p
                      style={{
                        color: activeColorData.valuesColor,
                        borderColor: activeColorData.outlineColor,
                      }}
                      className="w-[150px] py-2 text-center"
                    >
                      ${(item.unitCost * item.quantity).toFixed(2)}
                      {/* 300 */}
                    </p>
                  </div>
                ))}
              </div>
              {/* calculation */}

              <div className=" flex  flex-row justify-between items-center p-6 w-full bg-transparent ">
                {/* total invoice  */}

                <div className="flex flex-col justify-center items-center gap-1 w-[40%] py-3 bg-transparent border-[3px] border-black rounded-2xl">
                  <p className="text-2xl font-normal">INVOICE TOTAL</p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="text-5xl font-medium"
                  >
                    ${total.toFixed(2)}
                    {/* $140 */}
                  </p>
                </div>

                {/* break down */}
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
          </div>

          <div className="flex flex-row justify-between items-end w-full bg-transparent">
            {/* service condition */}
            <div className=" flex flex-row justify-center items-center bg-transparent w-full h-fit gap-8">
              <div className="flex flex-col justify-start items-start gap-2 bg-transparent w-full px-6">
                <p className=" text-lg bg-transparent">
                  <span
                    style={{ color: activeColorData.labelColor }}
                    className="font-bold text-black uppercase bg-transparent"
                  >
                    Service Agreement:
                  </span>
                  <br />
                  <span className=" text-[1rem] font-normal text-black bg-transparent">
                    {invoiceData.terms}
                    {/* Change orders will result in a "time and material" cost
                    basis. */}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end w-full h-[250px] invoice-page print-page bg-transparent">
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

        <div className="flex flex-row justify-between items-center w-full px-3 py-2 mt-4">
          <p className="text-[1rem] uppercase text-black">Sample Electric</p>
          <p className="text-[1rem] text-black">
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
  );
};

export default BillLayout7;
