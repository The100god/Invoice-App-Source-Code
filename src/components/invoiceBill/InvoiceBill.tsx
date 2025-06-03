/* eslint-disable @typescript-eslint/no-explicit-any */

import { invoiceSelectAtom } from "../../variables/Home";
import {
  billLogoImageDataAtom,
  clientContractorAtom,
  clientFormDataAtom,
  formDataAtom,
  itemSelectionDataAtom,
  taxRateAtom,
  termConditionAtom,
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
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
// import BillLayout1 from "../billLayout/BillLayout1";
// import BillLayout2 from "../billLayout/BillLayout2";
// import BillLayout3 from "../billLayout/BillLayout3";
import {
  extractKeyword,
  fetchImage,
  findMatchingElectricalWord,
  isElectricalImage,
} from "../form/FetchImageOnHover";
import BillLayout4 from "../billLayout/BillLayout4";
// import BillLayout5 from "../billLayout/BillLayout5";
// import { useLocation, useNavigate } from "react-router-dom";

export interface invoiceDataPropsType {
  title: string;
  invoiceNumber: string;
  dateOfIssue: string;
  clientMailID: string;
  clientNumber: string;
  billedTo: {
    name: string;
    address: string;
    city: string;
  };
  items: {
    description: string;
    unitCost: number;
    quantity: number;
  }[];
  taxRate: number;
  terms: string;
  clientDate: string;
  contractorDate: string;
}

const InvoiceBill: React.FC = () => {
  const [printBill, setPrintBill] = useAtom(printBillAtom);
  const [colorChange] = useAtom(colorChangeAtom);
  const [projects] = useAtom(projectsAtom);
  const [activeTabIndex] = useAtom(activeTabIndexAtom);
  const [invoiceSelect] = useAtom(invoiceSelectAtom);
  const [formData] = useAtom(formDataAtom);
  const [clientFormData] = useAtom(clientFormDataAtom);
  const [itemSelectionData] = useAtom(itemSelectionDataAtom);
  const [clientContractorData] = useAtom(clientContractorAtom);
  const [taxRate] = useAtom(taxRateAtom);
  const [termCondition] = useAtom(termConditionAtom);
  const [, setActiveDropdown] = useAtom(activeDropdownAtom);
  const [, setShowLabalColorPicker] = useAtom(showLabelColorPickerAtom);
  const [, setShowValueColorPicker] = useAtom(showValueColorPickerAtom);
  const [, setShowOutlineColorPicker] = useAtom(showOutlineColorPickerAtom);
  const [, setShowDescriptionsColorPicker] = useAtom(
    showDescriptionsColorPickerAtom
  );
  const [, setBillLogoImageData] = useAtom(billLogoImageDataAtom);

  const [hoveredWord, setHoveredWord] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [clientSignUrl, setClientSignUrl] = useState<string | null>(null);
  const [contractorSignUrl, setContractorSignUrl] = useState<string | null>(
    null
  );
  const [loading] = useState(false);
  const activeItemData = itemSelectionData[activeTabIndex];

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
  const taxRateData = taxRate[activeTabIndex].tax;
  const activeTermAndCondition = termCondition[activeTabIndex].termAndCondition;
  useEffect(() => {
    let contractorUrl: string | null = null;
    let clientUrl: string | null = null;

    if (activeClientContractorData.contractorSignFile) {
      contractorUrl = URL.createObjectURL(
        activeClientContractorData.contractorSignFile
      );
      setContractorSignUrl(contractorUrl);
    }
    if (activeClientContractorData.clientSignFile) {
      clientUrl = URL.createObjectURL(
        activeClientContractorData.clientSignFile
      );
      setClientSignUrl(clientUrl);
    }

    return () => {
      contractorUrl && URL.revokeObjectURL(contractorUrl);
      clientUrl && URL.revokeObjectURL(clientUrl);
    };
  }, [activeClientContractorData]);

  const activeBill = printBill[activeTabIndex];

  const clientfilledFormData = formData[activeTabIndex];
  // const imageData: File | null = clientfilledFormData.companyLogo;
  useEffect(() => {
    setBillLogoImageData((prev) => {
      const updated = [...prev];
      updated[activeTabIndex] = {
        ...updated[activeTabIndex],
        billLogoImage: clientfilledFormData.companyLogo, // <-- provide the new image here
      };
      return updated;
    });
  }, [clientfilledFormData.companyLogo, activeTabIndex]);

  const discriptionData = `${
    activeItemData?.brand ? activeItemData?.brand + "," : ""
  }${activeItemData?.style ? activeItemData?.style + "," : ""}${
    activeItemData?.use ? activeItemData?.use + "," : ""
  }${activeItemData?.version ? activeItemData?.version + "," : ""}${
    activeItemData?.neutral ? activeItemData?.neutral + "," : ""
  }${activeItemData?.pole ? activeItemData?.pole + "," : ""}${
    activeItemData?.amp ? activeItemData?.amp + " amp" : ""
  }`;

  const invoiceData: invoiceDataPropsType = {
    title: invoiceSelect[activeTabIndex].selectedInvoice,
    invoiceNumber: activeClientData.zipCode || "00000",
    dateOfIssue: formattedDate,
    clientMailID: clientfilledFormData.email || "example@gmail.com",
    clientNumber: clientfilledFormData.phoneNumber || "000-000-0000",
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
      {
        description: discriptionData.trim().length
          ? discriptionData.trim()
          : "Simens, Standard, 2-Pole, 15 amp",
        unitCost: 50,
        quantity: activeItemData?.quantity,
      },
      { description: "6in. Can Light Trim", unitCost: 30, quantity: 5 },
      {
        description: "Cover Plates Installation",
        unitCost: 20,
        quantity: 15,
      },
    ],
    taxRate: Number(taxRateData) || 0,
    terms:
      activeTermAndCondition.length > 0
        ? activeTermAndCondition
        : "Change orders will result in a 'time & material' cost basis.",
    clientDate: activeClientContractorData.clientDateValue
      ? activeClientContractorData.clientDateValue
      : "",
    contractorDate: activeClientContractorData.contractDateValue
      ? activeClientContractorData.contractDateValue
      : "",
  };

  const calculateSubtotal = () =>
    invoiceData.items.reduce(
      (total, item) => total + item.unitCost * item.quantity,
      0
    );

  const calculateTax = () => (calculateSubtotal() * invoiceData.taxRate) / 100;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const activeColorData = colorChange[activeTabIndex];

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

  const handleMouseEnter = async (desc: string) => {
    setHoveredWord(desc);

    const matchedWord = findMatchingElectricalWord(desc);
    const query = matchedWord
      ? "electrical" + " " + matchedWord
      : `electrical ${desc}`;

    try {
      let results = await fetchImage(query);
      let validImage = results.find(isElectricalImage) || results[0];

      // 🔁 If not found, try again with extracted keyword
      if (!validImage) {
        const keyword = extractKeyword(desc);
        const fallbackQuery = `electrical ${keyword} `;
        results = await fetchImage(fallbackQuery);
        validImage = results.find(isElectricalImage);
      }

      if (validImage) {
        setImagePreview(validImage.urls.small);
      } else {
        setImagePreview(""); // or set a placeholder
      }
    } catch (err) {
      console.error("Error fetching image:", err);
      setImagePreview("");
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (hoveredWord) handleMouseEnter(hoveredWord);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [hoveredWord]);

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

  const subtotal = useMemo(() => calculateSubtotal(), [invoiceData.items]);
  const tax = useMemo(() => calculateTax(), [subtotal, invoiceData.taxRate]);
  const total = useMemo(() => calculateTotal(), [subtotal, tax]);

  // const billprops = {
  //   handleClickEvent={handleClickEvent},
  //       activeTabIndex={activeTabIndex},
  //       imagePreview={imagePreview},
  //       hoveredWord={hoveredWord},
  //       invoiceData={invoiceData},
  //       activeColorData={activeColorData},
  //       loading={loading},
  //       subtotal={subtotal},
  //       tax={tax},
  //       total={total},
  //       setHoveredWord={setHoveredWord},
  //       setImagePreview={setImagePreview},
  //       contractorSign={activeClientContractorData.contractorSign}
  // clientSign={activeClientContractorData.clientSign}
  // contractorSignUrl={contractorSignUrl}
  // clientSignUrl={clientSignUrl}
  // }
  return (
    <>
      {/* <BillLayout1
        handleClickEvent={handleClickEvent}
        activeTabIndex={activeTabIndex}
        imagePreview={imagePreview}
        hoveredWord={hoveredWord}
        invoiceData={invoiceData}
        activeColorData={activeColorData}
        loading={loading}
        subtotal={subtotal}
        tax={tax}
        total={total}
        setHoveredWord={setHoveredWord}
        setImagePreview={setImagePreview}
        contractorSign={activeClientContractorData.contractorSign}
        clientSign={activeClientContractorData.clientSign}
        contractorSignUrl={contractorSignUrl}
        clientSignUrl={clientSignUrl}
      /> */}
      {/* <BillLayout2
    handleClickEvent={handleClickEvent}
    activeTabIndex={activeTabIndex}
    imagePreview={imagePreview}
    hoveredWord={hoveredWord}
    invoiceData={invoiceData}
    activeColorData={activeColorData}
    loading={loading}
    subtotal={subtotal}
        tax={tax}
        total={total}
    setHoveredWord={setHoveredWord}
    setImagePreview={setImagePreview}
    contractorSign={activeClientContractorData.contractorSign}
        clientSign={activeClientContractorData.clientSign}
        contractorSignUrl={contractorSignUrl}
        clientSignUrl={clientSignUrl}
    /> */}
      {/* <BillLayout3
        handleClickEvent={handleClickEvent}
        activeTabIndex={activeTabIndex}
        imagePreview={imagePreview}
        hoveredWord={hoveredWord}
        invoiceData={invoiceData}
        activeColorData={activeColorData}
        loading={loading}
        subtotal={subtotal}
        tax={tax}
        total={total}
        setHoveredWord={setHoveredWord}
        setImagePreview={setImagePreview}
        contractorSign={activeClientContractorData.contractorSign}
        clientSign={activeClientContractorData.clientSign}
        contractorSignUrl={contractorSignUrl}
        clientSignUrl={clientSignUrl}
      /> */}
      <BillLayout4
        handleClickEvent={handleClickEvent}
        activeTabIndex={activeTabIndex}
        imagePreview={imagePreview}
        hoveredWord={hoveredWord}
        invoiceData={invoiceData}
        activeColorData={activeColorData}
        loading={loading}
        subtotal={subtotal}
        tax={tax}
        total={total}
        setHoveredWord={setHoveredWord}
        setImagePreview={setImagePreview}
        contractorSign={activeClientContractorData.contractorSign}
        clientSign={activeClientContractorData.clientSign}
        contractorSignUrl={contractorSignUrl}
        clientSignUrl={clientSignUrl}
      />
      {/* <BillLayout5
        handleClickEvent={handleClickEvent}
        activeTabIndex={activeTabIndex}
        imagePreview={imagePreview}
        hoveredWord={hoveredWord}
        invoiceData={invoiceData}
        activeColorData={activeColorData}
        loading={loading}
        subtotal={subtotal}
        tax={tax}
        total={total}
        setHoveredWord={setHoveredWord}
        setImagePreview={setImagePreview}
        contractorSign={activeClientContractorData.contractorSign}
        clientSign={activeClientContractorData.clientSign}
        contractorSignUrl={contractorSignUrl}
        clientSignUrl={clientSignUrl}
      /> */}
    </>
  );
};

export default InvoiceBill;
