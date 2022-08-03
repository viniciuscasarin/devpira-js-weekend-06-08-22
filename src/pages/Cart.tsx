import { useState, useEffect, lazy } from "react";

import Grid from "@mui/material/Grid";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useCart } from "../hooks/cart";

enum StepsEnum {
  EMPTY = "empty",
  CONFIRMATION = "confirmation",
  PAYMENT = "payment",
}

function Cart() {
  const { products } = useCart();
  const [step, setStep] = useState(StepsEnum.EMPTY);
  const [stepComponent, setStepComponent] = useState(<></>);

  useEffect(() => {
    const currentStep = !!products.length
      ? StepsEnum.CONFIRMATION
      : StepsEnum.EMPTY;
    setStep(currentStep);
  }, [products]);

  useEffect(() => {
    const viewsByStep = {
      [StepsEnum.EMPTY]: "CartEmpty",
      [StepsEnum.CONFIRMATION]: "CartList",
      [StepsEnum.PAYMENT]: "Payment",
    };
    const propsByStep = {
      [StepsEnum.EMPTY]: {},
      [StepsEnum.CONFIRMATION]: {
        handleConfirm: () => setStep(StepsEnum.PAYMENT),
      },
      [StepsEnum.PAYMENT]: {},
    };

    const View = lazy(() => import(`../components/${viewsByStep[step]}`));
    setStepComponent(<View {...propsByStep[step]} />);
  }, [step]);

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
      {stepComponent}
    </Grid>
  );
}

export default Cart;
