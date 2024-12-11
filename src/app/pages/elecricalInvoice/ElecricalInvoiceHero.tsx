import React from 'react'
import InvoiceInfo from './InvoiceInfo'
import ClientDetails from './ClientDetails'
import ItemSelectionScreen from './ItemSelection'
import TripCharge from './TripCharge'
import LabourSection from "./labourSection";
import { useAtom } from 'jotai'
import {  stepsAtom } from "../../../variables/Home"
import Finished from '../../../components/finished/Finished'
import FinalizeSection from './FinalizeSection'
import TaxRate from './TaxRate'
import TermsConditions from './TermsConditions'
import ClientContractorSign from './ClientContractorSign'


const ElecricalInvoiceHero = () => {
    const [electricalSteps,] = useAtom(stepsAtom);
  
  return (
    <div>
      {electricalSteps == 1 && <InvoiceInfo />}
            {electricalSteps == 2 && <ClientDetails />}
            {electricalSteps == 3 && <ItemSelectionScreen />}
            {electricalSteps == 4 && <LabourSection />}
            {electricalSteps == 5 && <TripCharge />}
            {electricalSteps == 6 && <TaxRate />}
            {electricalSteps == 7 && <TermsConditions />}
            {electricalSteps == 8 && <ClientContractorSign />}
            {electricalSteps == 9 && <FinalizeSection/>}
            {electricalSteps == 10 && <Finished />}
    </div>
  )
}

export default ElecricalInvoiceHero
