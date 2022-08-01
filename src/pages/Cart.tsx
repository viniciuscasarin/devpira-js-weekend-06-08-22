import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import CartEmpty from "../components/CartEmpty";
import CartList from "../components/CartList";
import Payment from "../components/Payment";
import { useCart } from "../hooks/cart";

enum StepsEnum {
  EMPTY = "empty",
  CONFIRMATION = "confirmation",
  PAYMENT = "payment",
}

function Cart() {
  const { products } = useCart();
  const [step, setStep] = useState(StepsEnum.EMPTY);

  useEffect(() => {
    const currentStep = !!products.length
      ? StepsEnum.CONFIRMATION
      : StepsEnum.EMPTY;
    setStep(currentStep);
  }, [products]);

  return (
    <Grid container spacing={1} flexDirection="column">
      <Grid item>
        <Stepper activeStep={step === StepsEnum.PAYMENT ? 1 : 0}>
          <Step>
            <StepLabel>Confirmação</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pagamento</StepLabel>
          </Step>
        </Stepper>
      </Grid>
      {step === StepsEnum.EMPTY && <CartEmpty />}
      {step === StepsEnum.CONFIRMATION && (
        <CartList handleConfirm={() => setStep(StepsEnum.PAYMENT)} />
      )}
      {step === StepsEnum.PAYMENT && <Payment />}
    </Grid>
  );
}

export default Cart;
