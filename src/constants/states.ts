import { Step } from "react-joyride";
export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const materialOptions: { value: string; label: string }[] = [
  { value: "Outlet", label: "Outlet" },
  // { value: "Cover Plates", label: "Cover Plates" },
  // { value: "Exterior Boxes", label: "Exterior Boxes" },
  // { value: "Boxes", label: "Boxes" },
  // { value: "Panels", label: "Panels" },
  // { value: "Conduit", label: "Conduit" },
  // { value: "Wire", label: "Wire" },
  // { value: "Romex", label: "Romex" },
  // { value: "Miscellaneous Material", label: "Miscellaneous Material" },
  // { value: "Wirenuts", label: "Wirenuts" },
  { value: "Switches", label: "Switches" },
  { value: "Three-Way Switches", label: "Three-Way Switches" },
  { value: "Four-Way Switches", label: "Four-Way Switches" },
  { value: "15amp Breaker", label: "15amp Breaker" },
  { value: "20amp Breaker", label: "20amp Breaker" },
  { value: "30amp Breaker", label: "30amp Breaker" },
  { value: "40amp Breaker", label: "40amp Breaker" },
  { value: "50amp Breaker", label: "50amp Breaker" },
];

export const joyrideStylesStates = {

  options: {
    zIndex: 10000,
    primaryColor: "#007bff", // Next button color
    textColor: "#333",
    backgroundColor: "#fff",
    overlayColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
  },
  buttonNext: {
    background: "linear-gradient(90.02deg, #00C5FF 0.01%, #0054F0 204.21%)",
    color: "#fff",
    borderRadius: "8px",
    padding: "8px 16px",
    border: "none",
    order: 2, // Place next button after skip
  },
  buttonBack: {
    border: "1px solid transparent", // Transparent border to apply border image
    borderImageSource: "linear-gradient(180deg, #00C5FF 0%, #0054F0 100%)",
    borderImageSlice: 1,
    borderRadius: "8px",
    padding: "8px 16px",
    color: "#00C5FF",
    backgroundColor: "transparent",
    order: -1, // Move back button to the far left
    marginRight: "auto", // Push it to the far left
  },
  tooltip: {
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "16px",
  },
  tooltipFooter: {
    display: "flex",
    justifyContent: "space-between", // Ensures back button is left, others right
    alignItems: "center",
  },
  spotlight: {
    borderRadius: "8px",
    border: "1px solid transparent",
    borderImageSource: "linear-gradient(180deg, #00C5FF 0%, #0054F0 100%)",
    borderImageSlice: 1,
  },
  buttonSkip: {
    color: "#00000080",
    fontFamily: "Ubuntu",
    fontWeight: 400,
    fontSize: "12px",
    textAlign: "center",
    backgroundColor: "transparent",
    order: 1, // Place skip button before next
    marginRight: "8px", // Small spacing between Skip and Next
    marginLeft: "55%",
  },
};

export const stepTour: Step[] = [
  {
    target: "#navTopLeftBtn",
    content:
      "This is the main menu. Use these options to create, edit, or customize invoices.",
    placement: "bottom",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true

  },
  {
    target: "#f-option-0",
    content: 'Click here to File > New Invoice. Or Press "Ctrl + N"',
    placement: "right",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true,
  },
  {
    target: "#selectInvoiceType",
    content:
      "Choose the type of invoice you want to create: Rough-in, Finished, or Electrical.",
    placement: "bottom",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#invoiceInfoTour",
    content: " Fill in Company Details.",
    placement: "bottom",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#clientDetailTour",
    content: "Enter the details of your client here.",
    placement: "top",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#itemSelectionTour",
    content:
      "Select materials, adjust quantities, or fetch prices from the web.",
    placement: "left",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#labourSelectionMathodTour",
    content: "Select the Labour Method.",
    placement: "top",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#labourSelectionDetailTour",
    content:
      "Provide a description of the work, either as an hourly rate or a project amount > Uniform or Variable.",
    placement: "right",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#tripChargeTour",
    content: "Add travel costs or leave it blank if not applicable.",
    placement: "top",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#taxRateTour",
    content: "Add tax information  or leave it blank if not applicable.",
    placement: "bottom",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#termsCondTour",
    content: "Create Terms & Conditions or leave it blank if not applicable.",
    placement: "bottom",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#clientContractorSignTour",
    content:
      "Add  Client’s/Contractor’s Signature or leave it blank if not applicable.",
    placement: "left",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
  {
    target: "#finalizeSectionTour",
    content:
      "Review your invoice before finalizing it. Make any necessary changes here.",
    placement: "top",
    spotlightPadding: 8, // Padding around the highlighted element
    disableBeacon:true
  },
];
