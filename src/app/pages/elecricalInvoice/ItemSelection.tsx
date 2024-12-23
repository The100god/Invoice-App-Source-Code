// import RadioGroup from "../../../components/form/RadioGroup"; // Adjust the path as needed
import Dropdown from "../../../components/form/Dropdown"; // New Dropdown Component
import { useAtom } from "jotai";
import {
  brandAtom,
  colorAtom,
  commissionTypeAtom,
  commissionValueAtom,
  isCommissionAtom,
  itemErrorsAtom,
  productLinkAmountAtom,
  quantityAtom,
  selectedItemAtom,
  styleAtom,
} from "../../../variables/electricalInvoiceVariable";
import ProductDetailsFetcher from "../../../components/form/FatchDetailsByLink";

const ItemSelectionScreen = () => {
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const [brand, setBrand] = useAtom(brandAtom);
  const [style, setStyle] = useAtom(styleAtom);
  const [quantity, setQuantity] = useAtom(quantityAtom);
  const [color, setColor] = useAtom(colorAtom);
  const [commissionType, setCommissionType] = useAtom(commissionTypeAtom);
  const [commissionValue, setCommissionValue] = useAtom(commissionValueAtom);
  const [itemErrors, setItemErrors] = useAtom(itemErrorsAtom);
  const [productLinkAmount] = useAtom(productLinkAmountAtom);
  const [isCommission, setIsCommission] = useAtom(isCommissionAtom);
  // console.log("isCommission:", isCommission)
  // Function to compute the total amount
  let grandTot: number;

const computeTotal = (): string => {
  const unitPrice = productLinkAmount === "0" ? 10 : parseInt(productLinkAmount, 10); // Example unit price per item
  const total = quantity * unitPrice;
  grandTot = total; // Store total as a number
  return total.toFixed(2); // Return total as a string with 2 decimal places
};

const computeGrandTotal = (): number => {
  if (!isCommission) {
    return 0; // If commission is not applicable, return 0
  }

  // Ensure grandTot and commissionValue are numbers
  const grandTotal = Number(grandTot) || 0;
  const commission = Number(commissionValue) || 0;

  let grandPrice: number;

  if (commissionType === "$") {
    // Flat commission
    grandPrice = grandTotal + commission;
  } else {
    // Percentage commission
    grandPrice = grandTotal + (grandTotal * commission) / 100;
  }

  return parseFloat(grandPrice.toFixed(2)); // Return grand total rounded to 2 decimal places
};

  return (
    <div className="w-full h-full px-4 pb-4 flex flex-col gap-y-4 items-center justify-center bg-transparent">
      <div className="flex flex-row-reverse justify-between w-full gap-x-8 bg-transparent">
        {/* Other form fields such as quantity, color, etc. remain the same */}
        <div className="flex flex-col justify-between items-center w-full  gap-y-8 bg-transparent">
          {/* Bar 1: Dropdown for item selection */}
          <Dropdown
            label="Select Item Type*"
            options={[
              { value: "outlet", label: "Outlet" },
              { value: "Breakers", label: "Breakers" },
              { value: "Cover Plates", label: "Cover Plates" },
              { value: "Exterior Boxes", label: "Exterior Boxes" },
              { value: "Boxes", label: "Boxes" },
              { value: "Panels", label: "Panels" },
              { value: "Conduit", label: "Conduit" },
              { value: "Wire", label: "Wire" },
              { value: "Romex", label: "romex" },
              { value: "Miscellaneous Material", label: "Miscellaneous Material" },
              { value: "Wirenuts", label: "Wirenuts" },
              { value: "switches", label: "Switches" },
              { value: "three-way-switches", label: "Three-Way Switches" },
              { value: "four-way-switches", label: "Four-Way Switches" },
              { value: "15amp Breaker", label: "15amp Breaker" },
              { value: "20amp Breaker", label: "20amp Breaker" },
              { value: "30amp Breaker", label: "30amp Breaker" },
              { value: "40amp Breaker", label: "40amp Breaker" },
              { value: "50amp Breaker", label: "50amp Breaker" },
            ]}
            selectedValue={selectedItem}
            onChange={setSelectedItem}
            error={itemErrors.selectedItem}
            width={577}
            height={55}
          />

          <div className="flex flex-row justify-center items-center w-full gap-y-4 bg-transparent">
            {selectedItem === "outlet" && (
              <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                {/* Bar 2: Brand selection using RadioGroup */}
                <Dropdown
                  
                  label="Select Brand*"
                  options={[
                    { value: "Leviton", label: "Leviton" },
                    { value: "LeGrand", label: "LeGrand" },
                    { value: "Lutron", label: "Lutron" },
                  ]}
                  selectedValue={brand}
                  onChange={setBrand}
                  error={itemErrors.brand}
                  width={259}
                  height={55}
                />

                {/* Bar 3: Style selection using RadioGroup */}
                <Dropdown
                 
                  label="Select Style*"
                  options={[
                    { value: "Decora", label: "Decora" },
                    { value: "Duplex", label: "Duplex" },
                  ]}
                  selectedValue={style}
                  onChange={setStyle}
                  error={itemErrors.style}
                  width={158}
                  height={55}
                />
              </div>
            )}

            {[
              "15amp Breaker",
              "20amp Breaker",
              "30amp Breaker",
              "40amp Breaker",
              "50amp Breaker",
            ].includes(selectedItem) && (
              <div className=" flex flex-col justify-between items-start gap-4 w-[577px] bg-transparent">
                {/* Bar 2: Brand selection for switches using RadioGroup */}
                <Dropdown
                  
                  label="Select Brand*"
                  options={[
                    { value: "Siemens", label: "Siemens" },
                    { value: "Eaton", label: "Eaton" },
                    { value: "Murray", label: "Murray" },
                    { value: "Square", label: "Square" },
                  ]}
                  selectedValue={brand}
                  onChange={setBrand}
                  error={itemErrors.brand}
                  width={336}
                  height={55}
                />
                <div className=" flex flex-row justify-between items-center w-full bg-transparent">
                  <Dropdown
                    label="Select Pole*"
                    options={[
                      { value: "Single Pole", label: "Single Pole" },
                      { value: "2-Pole", label: "2-Pole" },
                      { value: "3-Pole", label: "3-Pole" },
                    ]}
                    selectedValue={style}
                    onChange={setStyle}
                    error={itemErrors.style}
                    width={255}
                    height={55}
                  />
                  <Dropdown
                    label="D/General Electric*"
                    options={[
                      { value: " Standard", label: " Standard" },
                      { value: "GFCI", label: "GFCI" },
                      { value: "AFCI", label: "AFCI" },
                    ]}
                    selectedValue={style}
                    onChange={setStyle}
                    error={itemErrors.style}
                    width={255}
                    height={55}
                  />
                </div>
              </div>
            )}

            {["switches", "three-way-switches", "four-way-switches"].includes(
              selectedItem
            ) && (
              <div className=" flex flex-row justify-between items-center w-[577px] bg-transparent">
                {/* Bar 2: Brand selection for switches using RadioGroup */}
                <Dropdown
                  label="Select Brand*"
                  options={[
                    { value: "Leviton", label: "Leviton" },
                    { value: "LeGrand", label: "LeGrand" },
                    { value: "Lutron", label: "Lutron" },
                  ]}
                  selectedValue={brand}
                  onChange={setBrand}
                  error={itemErrors.brand}
                  width={259}
                  height={55}
                />

                {/* Bar 3: Style selection for switches using RadioGroup */}
                <Dropdown
                  label="Select Style*"
                  options={[
                    { value: "Toggle", label: "Toggle" },
                    { value: "Rocker", label: "Rocker" },
                  ]}
                  selectedValue={style}
                  onChange={setStyle}
                  error={itemErrors.style}
                  width={158}
                  height={55}
                />
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
            {/* Bar 4: Quantity input */}
            <div className="flex flex-col items-start w-[145px] bg-transparent">
              <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                Quantity*
              </label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                  setItemErrors((prev) => ({
                    ...prev,
                    quantity: "",
                  }));
                }}
                className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] rounded-[10px] focus:border-[#00C5FF] w-full bg-transparent"
              />
              {itemErrors.quantity && (
                <p className="text-red-500 bg-transparent">{itemErrors.quantity}</p>
              )}
            </div>

            {/* Bar 5: Preferred color */}
            <Dropdown
              label="Preferred Color*"
              options={[
                { value: "White", label: "White" },
                { value: "Black", label: "Black" },
              ]}
              selectedValue={color}
              onChange={setColor}
              error={itemErrors.color}
              width={205}
              height={55}
            />

            <div className="flex flex-col items-start w-[156px] bg-transparent">
              <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                Total Amount*
              </label>
              <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                ${computeTotal()}
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
            <ProductDetailsFetcher />
          </div>

          {/* Commission Type */}

          <div className="flex flex-row justify-between items-start bg-transparent gap-2 w-[577px]">
            <label htmlFor="commission" className="flex gap-2">
              <input
                type="checkbox"
                name="commission"
                className="text-[18px]"
                onChange={() => setIsCommission(!isCommission)}
              />
              Comission*
            </label>
          </div>

          <div className="flex flex-row justify-between items-start gap-2 w-[577px] bg-transparent">
            {/* Bar 7: Commission Selection */}
            <Dropdown
              label="Commission Type*"
              options={[
                { value: "%", label: "%" },
                { value: "$", label: "$" },
              ]}
              selectedValue={commissionType}
              onChange={setCommissionType}
              error={itemErrors.commissionType}
              // width={commissionType ? 150 : 205}
              width={180}
              height={55}
            />

            {/* Bar 4: commission value input */}
            <div className="flex flex-col items-start w-[145px] bg-transparent mt-[37px]">
              {/* <label className="text-primary mb-1 bg-transparent">Quantity*</label> */}
              <input
                type="number"
                value={commissionValue}
                min="1"
                onChange={(e) => {
                  setCommissionValue(e.target.value);
                  setItemErrors((prev) => ({
                    ...prev,
                    commissionValue: "",
                  }));
                }}
                disabled={!isCommission}
                className="p-2 outline-none border-2 border-[#A9A5A5] h-[55px] bg-transparent rounded-[10px] focus:border-[#00C5FF] w-full"
              />
              {itemErrors.commissionValue && (
                <p className="text-red-500 bg-transparent">{itemErrors.commissionValue}</p>
              )}
            </div>

            <div className="flex flex-col items-start w-[164px] bg-transparent">
              <label className="text-lg font-medium text-[#000000B2] dark:text-white bg-transparent mb-2">
                Grand Total*
              </label>
              <div className="p-2 border-2 border-[#A9A5A5] rounded-[10px] w-full h-[55px] focus:border-[#00C5FF] bg-[#D9D9D980] text-lg ">
                ${computeGrandTotal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSelectionScreen;
