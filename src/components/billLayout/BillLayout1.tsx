import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout1Props {
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

const BillLayout1: React.FC<billLayout1Props> = ({
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
          <div className="flex flex-col gap-9 w-full">
            <div className="flex flex-col justify-center items-center gap-7 w-full h-fit p-2">
              <div className="w-[150px] h-[150px] bg-gray-900 border-black rounded-full">
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
              <h1 className="text-4xl font-medium text-black">
                {invoiceData.title}
              </h1>
            </div>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col items-start justify-start gap-1 w-fit h-fit">
                <p className="text-lg text-black/80">
                  {invoiceData.dateOfIssue}
                </p>
                <h1 className="text-6xl font-medium text-black"> INVOICE</h1>
              </div>
              {/* Billed To Section */}

              <div className="flex flex-col justify-end items-end w-fit">
                <div className="flex flex-col justify-start items-end gap-3">
                  <div className=" flex flex-col justify-start items-end">
                    <p className="text-[1.2rem] text-black">Billed to:</p>
                    <p className="text-2xl text-black font-medium">
                      {invoiceData.billedTo.name}
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start items-end">
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.billedTo.address}
                    </p>
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.billedTo.city}
                    </p>
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.invoiceNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="py-4 invoice-page print-page break-after-avoid bg-white break-inside-avoid print:break-inside-avoid">
          <div
            className="flex justify-between items-center border-2 border-black px-1 text-lg font-medium"
            style={{
              borderColor: activeColorData.outlineColor,
            }}
          >
            <p className="w-[80px] py-2 items-center justify-center text-center border-r-2 border-black">
              No.
            </p>
            <p className="w-[300px] py-2 text-center border-r-2 border-black">
              DESCRIPTION
            </p>
            <p className="w-[150px] py-2 text-center border-r-2 border-black">
              UNIT COST
            </p>
            <p className="w-[180px] py-2 text-center border-r-2 border-black">
              QTY/HR RATE
            </p>
            <p className="w-[150px] py-2 text-center">AMOUNT</p>
          </div>

          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-[1.1rem] border-b-2 invoice-page print-page break-after-avoid text-gray-800 relative"
              style={{ borderColor: activeColorData.outlineColor }}
              onMouseEnter={() => setHoveredWord(item.description)}
              onMouseLeave={() => setImagePreview("")}
            >
              <p className="w-[80px] py-2 text-center ">{index + 1}.</p>
              <p
                style={{
                  color: activeColorData.descriptionsColor,
                  borderColor: activeColorData.outlineColor,
                }}
                className=" py-3 pl-1 w-[300px] text-start relative"
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
              </p>
              <p
                style={{
                  color: activeColorData.valuesColor,
                  borderColor: activeColorData.outlineColor,
                }}
                className="w-[180px] py-2 text-center"
              >
                {item.quantity}
              </p>
              <p
                style={{
                  color: activeColorData.valuesColor,
                  borderColor: activeColorData.outlineColor,
                }}
                className="w-[150px] py-2 text-center"
              >
                ${(item.unitCost * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-white invoice-page print-page break-after-avoid">
          <div className="flex flex-col-reverse justify-start items-end w-full gap-8">
            <div className="flex flex-col justify-start items-end gap-1">
              <p className="text-3xl font-bold">INVOICE TOTAL</p>
              <p
                style={{ color: activeColorData.valuesColor }}
                className="text-4xl font-medium"
              >
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col justify-start items-end text-right space-y-2">
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px] ">
                  SUBTOTAL:
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-medium text-xl w-[100px] "
                >
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px] ">
                  TAX RATE
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-medium text-xl w-[100px] "
                >
                  {invoiceData.taxRate}%
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px] ">TAX</p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-medium text-xl w-[100px] "
                >
                  ${tax.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black text-right w-[200px] ">
                  TOTAL:
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-medium text-xl w-[100px] "
                >
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xl text-black">
            <span className="font-bold">Service Agreement:</span>
            <br />
            <span className="font-normal text-black/80">
              {invoiceData.terms}
            </span>
          </p>
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

export default BillLayout1;
