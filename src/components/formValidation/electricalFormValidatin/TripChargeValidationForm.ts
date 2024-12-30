interface tripChargeError {
  tripChargeVal: string;
  amountPerMiles: string;
  traveledMiles: string;
}
interface tripChargeStates {
  tripChargeVal: string;
  isStandardCost: boolean;
  isCalculateCost: boolean;
  amountPerMiles: string;
  traveledMiles: string;
  totalMilesAmount: string;
}
interface TripChargeValidationProps {
  tripCharge: tripChargeStates[];
  activeTabIndex: number;
  tripChargeError: tripChargeError[];
  setTripChargeError: React.Dispatch<React.SetStateAction<tripChargeError[]>>;
}

// trip charge validation
export const TripChargeValidation = ({
  tripCharge,
  activeTabIndex,
  tripChargeError,
  setTripChargeError,
}: TripChargeValidationProps) => {
  let isValid = true;

  // Initialize errors for the active tab
  const newErrors: tripChargeError = {
    tripChargeVal: "",
    amountPerMiles: "",
    traveledMiles: "",
  };

  const activeTripChargeData = tripCharge[activeTabIndex];
  if (activeTripChargeData.isStandardCost) {
    if (
      !activeTripChargeData.tripChargeVal ||
      parseFloat(activeTripChargeData.tripChargeVal) <= 0
    ) {
      newErrors.tripChargeVal = "Trip Value is required";
      isValid = false;
    }
  }
  if (activeTripChargeData.isCalculateCost) {
    if (
      !activeTripChargeData.traveledMiles ||
      parseFloat(activeTripChargeData.traveledMiles) <= 0
    ) {
      newErrors.traveledMiles = "Traveled Miles Value is required";
      isValid = false;
    }

    if (
      !activeTripChargeData.amountPerMiles ||
      parseFloat(activeTripChargeData.amountPerMiles) <= 0
    ) {
      newErrors.amountPerMiles = "Amount Per Miles Value is required";
      isValid = false;
    }
  }
  const updatedLabourErrors = [...tripChargeError];
  updatedLabourErrors[activeTabIndex] = newErrors;
  setTripChargeError(updatedLabourErrors);
  return isValid;
};
