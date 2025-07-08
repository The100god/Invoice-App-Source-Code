import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout8Props {
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

  const BillLayout8: React.FC<billLayout8Props> = ({
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
      className=" w-full h-full bg-white px-4 py-6 overflow-auto print:px-0 print:py-0 print:mx-auto print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-[900px] bg-white">
        {/* Header Section */}
        <div className="flex invoice-page print-page break-after-avoid flex-row justify-between items-start w-full py-4 bg-white">
          <div className="flex flex-row w-full mt-3">
            {/* left */}
            <div className="flex flex-col justify-center items-end flex-1">
              <div className="flex flex-col justify-start items-start gap-3 w-full h-fit p-2 mb-8">
                <div className="w-[110px] h-[110px] bg-white border-4 border-black rounded-full">
                  <img
                    className="flex justify-center items-center object-contain rounded-full p-1 w-full h-full "
                    src={
                      imageData
                        ? URL.createObjectURL(imageData)
                        :
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
                    }
                    alt="Company Logo"
                  />
                </div>
                <div className="flex flex-col text-black leading-8 mt-4">
                  {/* {invoiceData.title} */}
                  <span className="text-[3.2rem]">ELECTRIC</span>
                  <span className="text-7xl font-medium">FINISH</span>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start w-full">
                {/* Billed To Section */}

                <div className="flex flex-col justify-start items-start w-full pt-3">
                  <div className="flex flex-col justify-start items-start w-full">
                    <div className=" flex flex-col justify-start items-start bg-black/25 px-2 py-1 border-y-2 border-black w-[80%]">
                      <p className="text-[1.3rem] uppercase font-medium text-black">
                        Billed to:
                      </p>
                    </div>
                    <div className=" flex flex-col justify-start items-start p-2">
                      <p className="text-[1.2rem] text-black">
                        {invoiceData.billedTo.name}
                        {/* Thomas Residence */}
                      </p>
                      <p className="text-[1.2rem] text-black">
                        {invoiceData.billedTo.address}
                        {/* 1123 Example Ave. */}
                      </p>
                      <p className="text-[1.2rem] text-black">
                        {invoiceData.billedTo.city}
                        {/* Beverly Hills, CA */}
                      </p>
                      <p className="text-[1.1rem] text-black">
                        {invoiceData.invoiceNumber}
                        {/* 1234 */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right  */}

            <div className="flex flex-col justify-start items-end flex-1">
              <div className="flex flex-col items-start justify-start w-fit h-fit">
                <h1 className="text-[4.7rem] font-medium text-black">
                  {" "}
                  INVOICE
                </h1>
              </div>

              <div className="flex flex-col justify-center items-center w-[70%] h-fit border-x-2 border-black">
                <p className="text-[1.2rem] py-1 border border-black text-center text-black bg-black/25 w-full">
                  <span>DATE:</span>
                  <span>
                    {invoiceData.dateOfIssue}
                    {/* 23/03/2000 */}
                  </span>
                </p>
                <p className="text-[1.2rem] py-1 border border-black text-center uppercase text-black font-medium w-full">
                  Sample Electric
                </p>
                <p className="text-[1.2rem] py-1 border border-black text-center text-black bg-black/25 w-full">
                  {invoiceData.clientNumber}
                  {/* 123-123-1234 */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="py-4 flex flex-col gap-0 justify-start items-start invoice-page print-page break-after-avoid bg-white break-inside-avoid print:break-inside-avoid w-full">
          <div className="flex justify-between items-center px-1 text-lg font-medium bg-black/25 border-y-2 border-black w-full">
            <p className="w-[35%] py-2 pl-2 text-start bg-transparent">
              DESCRIPTION
            </p>
            <p className="w-[15%] py-2 text-center bg-transparent">
              UNIT COST
            </p>
            <p className="w-[30%] py-2 text-center border-l border-black/35 bg-transparent">
              QTY/HR RATE
            </p>
            <p className="w-[20%] py-2 text-center bg-transparent">AMOUNT</p>
          </div>
<div className="flex relative flex-col justify-normal items-start w-full m-0"> 
  <div className="absolute h-full mx-auto left-[50%] border-l border-black/35"></div>
          {invoiceData.items.map((item, index) => (
          <div
            key={index}
            className="flex w-full justify-between items-start text-[1.1rem] invoice-page print-page break-after-avoid text-gray-800 relative m-0 "
            // style={{ borderColor: activeColorData.outlineColor }}
            onMouseEnter={() => setHoveredWord(item.description)}
            onMouseLeave={() => setImagePreview("")}
          >
            <p
              style={{
                color: activeColorData.descriptionsColor,
                // borderColor: activeColorData.outlineColor,
              }}
              className=" py-3 pl-2 w-[35%] text-start relative"
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
                // borderColor: activeColorData.outlineColor,
              }}
              className="w-[15%] py-3 text-center"
            >
              ${item.unitCost.toFixed(2)}
              {/* 40$ */}
            </p>
            <p
              style={{
                color: activeColorData.valuesColor,
                borderColor: activeColorData.outlineColor,
              }}
              className="w-[30%] py-3 text-center"
            >
              {item.quantity}
              {/* 20 */}
            </p>
            <p
              style={{
                color: activeColorData.valuesColor,
                // borderColor: activeColorData.outlineColor,
              }}
              className="w-[20%] py-3 text-center"
            >
              ${(item.unitCost * item.quantity).toFixed(2)}
              {/* 20$ */}
            </p>
          </div>
           ))} 
           </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col justify-between items-end bg-white invoice-page print-page break-after-avoid">
          <div className="flex flex-row items-end justify-end w-full border-y-2 border-black">
            <div className="flex justify-between gap-10 w-[50%] flex-1 "></div>

            <div className="flex justify-end gap-10 w-full border-x border-black pt-2 flex-1 ">
              <p className="font-normal text-xl text-black text-right w-[150px] ">
                SUBTOTAL:
              </p>
              <p
                style={{ color: activeColorData.valuesColor }}
                className="font-normal text-center text-xl w-[100px] "
              >
                ${subtotal.toFixed(2)}
                {/* $40 */}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-end justify-end w-full">
            <div className="flex w-full flex-1 ">
              <div className="flex flex-col justify-center items-center w-full ">
                <p className="text-[2.7rem]">INVOICE TOTAL </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="text-[3rem] -mt-3 font-medium"
                >
                  ${total.toFixed(2)}
                  {/* $140 */}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-end w-full flex-1 border-r-2 border-b-2 border-black">
              <div className="flex justify-end gap-10 w-full pt-2 flex-1 ">
                <p className="font-normal text-right text-xl text-black w-[150px] ">
                  TAX RATE:
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-normal text-center text-xl w-[100px] "
                >
                  {invoiceData.taxRate}%
                  {/* 10% */}
                </p>
              </div>
              <div className="flex justify-end gap-10 w-full border-y-2 border-black pt-2 flex-1 ">
                <p className="font-normal text-xl text-black text-right w-[150px] ">
                  TAX:
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-normal text-center text-xl w-[100px] "
                >
                  ${tax.toFixed(2)}
                  {/* $30 */}
                </p>
              </div>
              <div className="flex flex-col justify-end w-full flex-1 ">
                <div className="flex justify-end gap-10 w-full pt-2 ">
                  <p className="font-normal text-xl text-black text-right w-[150px] ">
                    TOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-normal text-center text-xl w-[100px] "
                  >
                    ${total.toFixed(2)}
                    {/* 30 */}
                  </p>
                </div>
                <div className="flex flex-col justify-end items-start w-full text-black">
                  <span className="font-bold text-lg">Service Agreement:</span>
                  <span className="font-normal text-sm text-black/80">
                    {invoiceData.terms}
                    {/* Change orders will result in a "time and material" cost
                    basis. */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end w-full h-[250px] invoice-page print-page">
          <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit">
            <div className="flex flex-col justify-center items-center w-fit">
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
              <div className="w-[215px] my-2 border-b border-[#000000]"></div>
              <span className="flex text-[#000000] text-center text-[20px] font-medium">
                {clientSign ? clientSign : "Client Signature"}
                {/* Client Signature */}
              </span>
            </div>

            <div className="flex flex-row justify-center gap-2 items-end w-fit ">
              <span className="flex text-[#000000] text-center text-[1rem] font-medium">
                Date:
              </span>
              <div className="flex flex-col justify-end items-center w-[110px] h-[30px]">
                {invoiceData.clientDate && <span className="flex w-full justify-center items-center">
                  {invoiceData.clientDate}
                </span>}
                <div className="w-full border-b-2 border-[#000000]"></div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-y-5 justify-center items-center w-fit">
            <div className="flex flex-col justify-center items-center w-fit">
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
              <div className="w-[215px] my-2 border-b border-[#000000]"></div>
              <span className="flex text-[#000000] text-center text-[20px] font-medium">
                {contractorSign ? contractorSign : "Contractor Signature"}
                {/* Contractor Signature */}
              </span>
            </div>
            <div className="flex flex-row justify-center gap-2 items-end w-fit ">
              <span className="flex text-[#000000] text-center text-[1rem] font-medium">
                Date:
              </span>
              <div className="flex flex-col justify-end items-center w-[110px] h-[30px]">
                {invoiceData.contractorDate && <span className="flex w-full justify-center items-center">
                  {invoiceData.contractorDate}
                </span>}
                <div className="w-full border-b-2 border-[#000000]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillLayout8;
