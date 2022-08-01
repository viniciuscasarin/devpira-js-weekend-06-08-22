import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  amount: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
};

function AmountInput({ amount, handleIncrease, handleDecrease }: Props) {
  return (
    <>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <IconButton sx={{ p: 1 }} onClick={handleDecrease}>
          <RemoveIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          type="number"
          value={amount}
          readOnly
          inputProps={{ style: { textAlign: "center" } }}
        />
        <IconButton sx={{ p: 1 }} onClick={handleIncrease}>
          <AddIcon />
        </IconButton>
      </Paper>
    </>
  );
}

export default AmountInput;
