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
      className="w-full h-full bg-white px-4 py-6 print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-[900px] bg-white">

        {/* Header */}
        <div className="print-page break-after-page">
          <div className="flex flex-col justify-center items-center gap-7 w-full h-fit p-2">
            <div className="w-[150px] h-[150px] bg-white border-4 border-black rounded-full">
              <img
                className="object-contain rounded-full p-1 w-full h-full"
                src={
                  imageData
                    ? URL.createObjectURL(imageData)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
                }
                alt="Company Logo"
              />
            </div>
            <h1 className="text-4xl font-medium text-black">{invoiceData.title}</h1>
          </div>

          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col items-start gap-1">
              <p className="text-lg text-black/80">{invoiceData.dateOfIssue}</p>
              <h1 className="text-6xl font-medium text-black">INVOICE</h1>
            </div>

            <div className="flex flex-col items-end gap-3">
              <p className="text-[1.2rem] text-black">Billed to:</p>
              <p className="text-2xl font-medium text-black">
                {invoiceData.billedTo.name}
              </p>
              <p className="text-[1.1rem] text-black">{invoiceData.billedTo.address}</p>
              <p className="text-[1.1rem] text-black">{invoiceData.billedTo.city}</p>
              <p className="text-[1.1rem] text-black">{invoiceData.invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Table Header + Items */}
        <div className="print-page break-after-page">
          <div
            className="flex justify-between items-center border-2 border-black px-1 text-lg font-medium"
            style={{ borderColor: activeColorData.outlineColor }}
          >
            <p className="w-[80px] py-2 text-center border-r-2 border-black">No.</p>
            <p className="w-[300px] py-2 text-center border-r-2 border-black">DESCRIPTION</p>
            <p className="w-[150px] py-2 text-center border-r-2 border-black">UNIT COST</p>
            <p className="w-[180px] py-2 text-center border-r-2 border-black">QTY/HR RATE</p>
            <p className="w-[150px] py-2 text-center">AMOUNT</p>
          </div>

          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-[1.1rem] border-b-2 text-gray-800 relative break-inside-avoid"
              style={{ borderColor: activeColorData.outlineColor }}
              onMouseEnter={() => setHoveredWord(item.description)}
              onMouseLeave={() => setImagePreview("")}
            >
              <p className="w-[80px] py-2 text-center">{index + 1}.</p>
              <p
                className="py-3 pl-1 w-[300px] text-start relative"
                style={{ color: activeColorData.descriptionsColor }}
              >
                {hoveredWord === item.description && imagePreview && (
                  <div className="absolute -top-[200px] left-0 bg-white p-2 border rounded shadow-lg z-50 w-[250px]">
                    <img src={imagePreview} alt="Preview" className="w-full h-[180px] object-cover rounded" />
                  </div>
                )}
                {item.description}
                {hoveredWord === item.description && loading && (
                  <div className="absolute -top-[40px] left-0 bg-white text-xs px-2 py-1 border rounded shadow-md z-50">
                    Loading...
                  </div>
                )}
              </p>
              <p className="w-[150px] py-2 text-center" style={{ color: activeColorData.valuesColor }}>
                ${item.unitCost.toFixed(2)}
              </p>
              <p className="w-[180px] py-2 text-center" style={{ color: activeColorData.valuesColor }}>
                {item.quantity}
              </p>
              <p className="w-[150px] py-2 text-center" style={{ color: activeColorData.valuesColor }}>
                ${(item.unitCost * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="print-page break-after-page">
          <div className="flex flex-col items-end gap-8 p-4">
            <div className="text-right space-y-2">
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px]">SUBTOTAL:</p>
                <p className="font-medium text-xl w-[100px]" style={{ color: activeColorData.valuesColor }}>
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px]">TAX RATE:</p>
                <p className="font-medium text-xl w-[100px]" style={{ color: activeColorData.valuesColor }}>
                  {invoiceData.taxRate}%
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px]">TAX:</p>
                <p className="font-medium text-xl w-[100px]" style={{ color: activeColorData.valuesColor }}>
                  ${tax.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-medium text-xl text-black w-[200px]">TOTAL:</p>
                <p className="font-medium text-xl w-[100px]" style={{ color: activeColorData.valuesColor }}>
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-3xl font-bold">INVOICE TOTAL</p>
              <p className="text-4xl font-medium" style={{ color: activeColorData.valuesColor }}>
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="mt-6 text-xl text-black">
            <span className="font-bold">Service Agreement:</span>
            <br />
            <span className="font-normal text-black/80">{invoiceData.terms}</span>
          </p>
        </div>

        {/* Signature Section */}
        <div className="print-page">
          <div className="flex justify-between items-end w-full h-[250px]">
            {/* Client Signature */}
            <div className="flex flex-col items-center gap-y-5">
              {clientSignUrl && (
                <img src={clientSignUrl} alt="Client Signature" className="w-[201px] h-[100px] object-contain" />
              )}
              <div className="w-[215px] border-b border-black" />
              <span className="text-[20px] font-medium text-black">{clientSign || "Client Signature"}</span>
              <div className="flex gap-2 items-end">
                <span className="text-[1rem] font-medium text-black">Date:</span>
                <div className="w-[110px] h-[30px] border-b-2 border-black text-center">
                  {invoiceData.clientDate}
                </div>
              </div>
            </div>

            {/* Contractor Signature */}
            <div className="flex flex-col items-center gap-y-5">
              {contractorSignUrl && (
                <img src={contractorSignUrl} alt="Contractor Signature" className="w-[201px] h-[100px] object-contain" />
              )}
              <div className="w-[215px] border-b border-black" />
              <span className="text-[20px] font-medium text-black">
                {contractorSign || "Contractor Signature"}
              </span>
              <div className="flex gap-2 items-end">
                <span className="text-[1rem] font-medium text-black">Date:</span>
                <div className="w-[110px] h-[30px] border-b-2 border-black text-center">
                  {invoiceData.contractorDate}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BillLayout1;
