import React from "react";
import { invoiceDataPropsType } from "../invoiceBill/InvoiceBill";
import { colorStates } from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import { billLogoImageDataAtom } from "../../variables/electricalInvoiceVariable";

interface billLayout2Props {
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

const BillLayout2: React.FC<billLayout2Props> = ({
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
      <div
        className="absolute inset-0 bg-no-repeat m-auto max-w-[800px] h-full top-[50%] bg-center bg-contain opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${
            imageData
              ? URL.createObjectURL(imageData)
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa0aZdiJvKAvFa2G_NJtqCDi6StL27ApU4A&s"
          })`,
          transition: "background 0.3s ease-in-out"
        }}
      ></div>

      <div className="mx-auto flex flex-col gap-5 max-w-[800px] bg-transparent">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-start w-full bg-transparent">
          <div className="flex flex-col justify-center items-start gap-9 w-full">
            <div className="flex justify-center items-center w-full">
              <h1 className="text-4xl font-medium text-black">
                {invoiceData.title}
              </h1>
            </div>

            <div className="flex flex-row justify-between items-start w-full">
              <div className="flex flex-col justify-start items-start w-fit">
                <div className="flex flex-col justify-start items-start">
                  <div className=" flex flex-col justify-start items-start">
                    <p className="text-[1.2rem] text-black">Billed to:</p>
                    <p className="text-2xl text-black font-medium">
                      {invoiceData.billedTo.name}
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start items-start">
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

              <div className="flex flex-col justify-end items-end w-fit">
                <div className="flex flex-col justify-start items-end gap-3">
                  <div className=" flex flex-col justify-start items-end">
                    <p className="text-[1.2rem] text-black">DATE</p>
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.dateOfIssue}
                    </p>
                  </div>
                  <div className=" flex flex-col justify-start items-end">
                    <p className="text-[1.2rem] text-black font-medium">
                      Sample Electric
                    </p>
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.clientNumber}
                    </p>
                    <p className="text-[1.1rem] text-black">
                      {invoiceData.clientMailID}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center w-full">
              <h1 className="text-6xl font-medium text-black">INVOICE</h1>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="py-4 bg-transparent">
          <div
            className="flex justify-between items-center border-y-4 border-black px-1 text-lg font-bold"
            style={{
              borderColor: activeColorData.outlineColor,
            }}
          >
            <p className="w-[80px] py-2 items-center justify-center text-center">
              No.
            </p>
            <p className="w-[300px] py-2 text-start">DESCRIPTION</p>
            <p className="w-[150px] py-2 text-center">UNIT COST</p>
            <p className="w-[180px] py-2 text-center">QTY/HR RATE</p>
            <p className="w-[150px] py-2 text-center">AMOUNT</p>
          </div>

          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-[1.1rem] text-gray-800 relative"
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
                className=" py-3 w-[300px] text-start relative"
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
        <div className=" flex flex-col justify-start items-start py-4 bg-transparent w-full gap-8">
          <div className=" flex flex-row justify-between items-center w-full bg-transparent">
            <div className="flex flex-row justify-between items-center w-full gap-20 bg-transparent">
              <div className="flex flex-col justify-start items-end gap-1 bg-transparent">
                <p className="text-3xl font-bold">INVOICE TOTAL</p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="text-4xl font-medium"
                >
                  ${total.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col justify-start items-end text-right gap-1 bg-transparent">
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    SUBTOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] w-[100px] "
                  >
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    TAX RATE:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] w-[100px] "
                  >
                    {invoiceData.taxRate}%
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black w-[200px] ">
                    TAX:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] w-[100px] "
                  >
                    ${tax.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-10 bg-transparent">
                  <p className="font-bold text-[1.2rem] text-black text-right w-[200px] ">
                    TOTAL:
                  </p>
                  <p
                    style={{ color: activeColorData.valuesColor }}
                    className="font-bold text-[1.2rem] w-[100px] "
                  >
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-2 bg-transparent">
            <p className=" text-xl bg-transparent">
              <span
                style={{ color: activeColorData.labelColor }}
                className="font-bold text-black bg-transparent"
              >
                Service Agreement
              </span>
              <br />
              <span className="font-normal text-black bg-transparent">
                {invoiceData.terms}
              </span>
            </p>
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

export default BillLayout2;
