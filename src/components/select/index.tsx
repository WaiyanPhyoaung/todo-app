import { useState } from "react";
import styles from "./select.module.css";
import chevDown from "../../assets/chev-down.svg";

const options: Option[] = [
  { value: "all", label: "All" },
  { value: "done", label: "Done" },
  { value: "undone", label: "Undone" },
];
type Option = {
  label: string;
  value: string;
};
function Select() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option: Option) => () => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader} onClick={toggling}>
        <span>{selectedOption.label}</span>
        <img
          style={{ rotate: isOpen ? "none" : "-90deg" }}
          className={styles.chev}
          src={chevDown}
          alt="chevron"
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <div
              className={styles.dropdownListItem}
              onClick={onOptionClicked(option)}
              key={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Select;
