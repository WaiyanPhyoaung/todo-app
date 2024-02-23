import { useState } from "react";
import styles from "./select.module.css";
import chevDown from "../../assets/chev-down.svg";
import { useTodoContext } from "../../context/TodoContext";
import useClickOutside from "../../hooks/useClickOutside";
import { FilterOptions } from "../../hooks/useTodo";

const options: Option[] = [
  { value: FilterOptions.all, label: "All" },
  { value: FilterOptions.done, label: "Done" },
  { value: FilterOptions.undone, label: "Undone" },
];
type Option = {
  label: string;
  value: FilterOptions;
};

function Select() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { setCurrentFilter } = useTodoContext();

  const { isOpen, setIsOpen, ref } = useClickOutside();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (option: Option) => () => {
    setSelectedOption(option);
    setIsOpen(false);
    setCurrentFilter(option.value);
  };

  return (
    <div ref={ref} className={styles.dropdown}>
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
