import { invoiceSelectAtom } from "../../variables/Home";
import {
  clientContractorAtom,
  clientFormDataAtom,
  formDataAtom,
} from "../../variables/electricalInvoiceVariable";
import {
  activeDropdownAtom,
  activeTabIndexAtom,
  colorChangeAtom,
  printBillAtom,
  projectsAtom,
  showDescriptionsColorPickerAtom,
  showLabelColorPickerAtom,
  showOutlineColorPickerAtom,
  showValueColorPickerAtom,
} from "../../variables/NavbarVariables";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
const InvoiceBill: React.FC = () => {
  const [printBill, setPrintBill] = useAtom(printBillAtom);
  const [colorChange] = useAtom(colorChangeAtom);
  const [projects] = useAtom(projectsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [invoiceSelect] = useAtom(invoiceSelectAtom);
  const [formData] = useAtom(formDataAtom);
  const [clientFormData] = useAtom(clientFormDataAtom);
  const [clientContractorData] = useAtom(clientContractorAtom)
  const [, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [, setShowLabalColorPicker] = useAtom(showLabelColorPickerAtom);
  const [, setShowValueColorPicker] = useAtom(showValueColorPickerAtom);
  const [, setShowOutlineColorPicker] = useAtom(showOutlineColorPickerAtom);
  const [, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );
  const handleClickEvent = () => {
    setActiveDropdown(null);
    setShowDescriptionsColorPicker(false);
    setShowValueColorPicker(false);
    setShowLabalColorPicker(false);
    setShowOutlineColorPicker(false);
  };

  const today = new Date();

  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const activeClientData = clientFormData[activeTabIndex];
  const activeClientContractorData = clientContractorData[activeTabIndex];
  let contractorSignUrl: string | null = null;

if (activeClientContractorData.contractorSign) {
  contractorSignUrl = URL.createObjectURL(activeClientContractorData.contractorSign);
}

  const activeBill = printBill[activeTabIndex];

  const imageData: File | null = formData[activeTabIndex].companyLogo;
  const invoiceData = {
    title: invoiceSelect[activeTabIndex].selectedInvoice,
    invoiceNumber: "#00000",
    dateOfIssue: formattedDate,
    billedTo: {
      name: activeClientData.clientName
        ? activeClientData.clientName
        : "Thomas Residence",
      address: activeClientData.address
        ? activeClientData.address
        : "123 Example Ave.",
      city: activeClientData.city ? activeClientData.city : "Beverly Hills, CA",
    },
    items: [
      { description: "Switches & Installations", unitCost: 50, quantity: 10 },
      { description: "6in. Can Light Trim", unitCost: 30, quantity: 5 },
      {
        description: "Receptacles & Cover Plates Installation",
        unitCost: 20,
        quantity: 15,
      },
    ],
    taxRate: 0,
    terms: "Change orders will result in a 'time & material' cost basis.",
  };

  const calculateSubtotal = () =>
    invoiceData.items.reduce(
      (total, item) => total + item.unitCost * item.quantity,
      0
    );

  const calculateTax = () => (calculateSubtotal() * invoiceData.taxRate) / 100;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const activeColorData = colorChange[activeTabIndex];

  // const location = useLocation();
  // const isPrint = new URLSearchParams(location.search).get('print');
  // console.log("isPrint", isPrint)
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Only auto-print when it's opened in a new window
  //   if (window.opener === null) {
  //     setTimeout(() => {
  //       window.print();
  //     }, 500);
  //   }
  // },[]);
  const handleGeneratePDF = async () => {
    const projectName =
      projects[activeTabIndex]?.name?.trim().replace(/\s+/g, "_") ||
      `Project_${Date.now()}`;
    const result = await window.electron?.printInvoice(projectName);
    if (result.success) {
      toast.success(`✅ PDF saved at: ${result.filePath}`);
    } else {
      console.log(`❌ Failed: ${result.message}`);
    }
  };

  // const handlePrintByProjectName = async () => {
  //   const element = document.getElementById("invoice-container");
  //   if (!element) return toast.error("Print area not found!");

  //   const htmlContent = element.innerHTML;
  //   const projectName =
  //     projects[activeTabIndex]?.name?.trim().replace(/\s+/g, "_") ||
  //     `Project_${Date.now()}`;

  //   const result = await window.electron?.printInvoiceByName(
  //     htmlContent,
  //     projectName
  //   );
  //   if (result?.success) {
  //     toast.success(`✅ PDF saved at: ${result.filePath}`);
  //   } else {
  //     toast.error(`❌ Failed to save PDF: ${result?.message}`);
  //   }
  // };

  useEffect(() => {
    if (activeBill?.selectedPrintBill) {
      // window.print();
      handleGeneratePDF();
      // handlePrintByProjectName();
      const printStop = setTimeout(() => {
        setPrintBill((prev) => {
          const updated = [...prev];
          updated[activeTabIndex] = {
            ...updated[activeTabIndex],
            selectedPrintBill: false,
          };
          return updated;
        });
      }, 500);
      return () => clearTimeout(printStop);
    }
  }, [printBill]);
  // useEffect(() => {
  //   const state = location.state as { shouldPrint?: boolean };

  //   if (state?.shouldPrint) {
  //     setTimeout(() => {
  //       window.print();

  //       // Go back or clear state after printing
  //       // setTimeout(() => {
  //       //   navigate(-1); // or navigate('/dashboard') if preferred
  //       // }, 500);
  //     }, 300);
  //   }
  // }, [location.state]);
  return (
    <div
      id="invoice-container"
      onClick={handleClickEvent}
      className="print-page w-full h-full bg-white px-4 py-8 overflow-auto print:overflow-visible"
    >
      <div className="mx-auto flex flex-col gap-5 max-w-[800px] bg-white">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-start w-full p-6 bg-white">
          <div className="flex flex-col gap-9 w-full">
            <div>
              <h1 className="text-5xl font-medium text-black">
                {invoiceData.title}
              </h1>
              <p className="text-lg text-black/80">
                {invoiceData.invoiceNumber}
              </p>
            </div>
            <div>
              <p
                style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                DATE OF ISSUE
              </p>
              <p className="text-sm text-black/60">{invoiceData.dateOfIssue}</p>
            </div>
          </div>
          <div className="w-[179px] h-[150px] bg-gray-900 border-black rounded-full">
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

        {/* Billed To Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p
                style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                BILLED TO
              </p>
              <p className="text-black/60">{invoiceData.billedTo.name}</p>
              <p className="text-black/60">{invoiceData.billedTo.address}</p>
              <p className="text-black/60">{invoiceData.billedTo.city}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white">
          <div
            className="flex justify-between items-center border-b-4 py-3 text-xl font-bold"
            style={{
              borderColor: activeColorData.outlineColor,
              color: activeColorData.labelColor,
            }}
          >
            <p className="flex-1 text-left">DESCRIPTION</p>
            <div className="flex gap-10">
              <p className="w-[150px] text-center">UNIT COST</p>
              <p className="w-[150px] text-center">QTY/HR RATE</p>
              <p className="w-[150px] text-center">AMOUNT</p>
            </div>
          </div>

          {invoiceData.items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-2 text-gray-800"
              style={{ borderColor: activeColorData.outlineColor }}
            >
              <p
                style={{ color: activeColorData.descriptionsColor,
                  borderColor: activeColorData.outlineColor
                 }}
                className="flex-1 py-3 text-left border-r-2"
              >
                {item.description}
              </p>
              <div className="flex gap-10">
                <p
                  style={{ color: activeColorData.valuesColor,
                    borderColor: activeColorData.outlineColor
                   }}
                  className="w-[150px] py-3 text-center"
                >
                  ${item.unitCost.toFixed(2)}
                </p>
                <p
                  style={{ color: activeColorData.valuesColor,
                    borderColor: activeColorData.outlineColor
                   }}
                  className="w-[150px] py-3 text-center"
                >
                  {item.quantity}
                </p>
                <p
                  style={{ color: activeColorData.valuesColor,
                    borderColor: activeColorData.outlineColor
                   }}
                  className="w-[150px] py-3 text-center"
                >
                  ${(item.unitCost * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-white">
          <div className="flex justify-between">
            <div>
              <p
                style={{ color: activeColorData.labelColor }}
                className="text-xl font-bold"
              >
                INVOICE TOTAL
              </p>
              <p
                style={{ color: activeColorData.valuesColor }}
                className="text-[52px] font-normal"
              >
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex justify-between gap-6 mb-5">
                <p className="font-bold text-xl text-black">SUBTOTAL</p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  ${calculateSubtotal().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">
                  (TAX RATE) {invoiceData.taxRate}%
                </p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  ${calculateTax().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">TAX</p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  ${calculateTax().toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-6 mb-2">
                <p className="font-bold text-xl text-black">TOTAL</p>
                <p
                  style={{ color: activeColorData.valuesColor }}
                  className="font-bold text-xl"
                >
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xl text-gray-500">
            <span
              style={{ color: activeColorData.labelColor }}
              className="font-bold"
            >
              Service Agreement
            </span>
            <br />
            <span className="font-normal text-black">{invoiceData.terms}</span>
          </p>

          <div className="mt-8 flex flex-col justify-center items-center w-fit">
            <div className="flex justify-center items-center p-1 w-[201px] h-[150px] object-contain">

            <img src={contractorSignUrl || "https://upload.wikimedia.org/wikipedia/en/d/d4/Samantha_Signature.jpg"} alt="img" className="w-fit h-fit"/>
            </div>
            <div className="w-[215px] my-2 border-b border-[#000000]"></div>
            <span className="flex text-[#000000] text-[20px] font-medium">Contractor Signature</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBill;
