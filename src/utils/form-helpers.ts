
import { CheckedState } from "@radix-ui/react-checkbox";

export const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (checked: CheckedState) => {
    if (typeof checked === 'boolean') {
      setter(checked);
    }
  };
};
