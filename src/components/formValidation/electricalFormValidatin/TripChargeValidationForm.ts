interface TripChargeValidationProps {
    tripChargeVal: string;
    setTripChargeError: (type:string)=> void;
    
  }

  // trip charge validation
export const TripChargeValidation = ({tripChargeVal, setTripChargeError}:TripChargeValidationProps) => {
    let isValid = true;
    if (!tripChargeVal) {
      isValid = false;
      setTripChargeError("Trip charge is required.");
    }
    return isValid;
  };