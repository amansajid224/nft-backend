import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export default function SelectTheme({
  options,
  onChange,
  defaultValue,
  margin,
  isInvalid,
  type,
  maxWidth,
  placeholder,
  ...rest
}) {

  const colourStyles = {
    control: (base, state) => ({
      ...base,
      background: "#1E103C",
      borderColor: "#3B2864",
      borderRadius: "6px",
      width: "130px",
      minWidth:'190px',
      color: "#fff",
      width: "100%",
      maxWidth:maxWidth,
      // Overwrittes the different states of border
      //borderColor: state.isFocused ? "yellow" : "green",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        //borderColor: state.isFocused ? "red" : "blue"
      },
    }),
    menu: (styles) => ({
      ...styles,
      background: "transparent",
    }),
    menuList: (styles) => ({
      ...styles,
      background: "#1E103C",
      border: "solid 1px #3B2864",
      borderRadius: "6px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#6C5E89",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#6C5E89", // Custom colour
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused ? "#9FC131" : isSelected ? "transparent" : undefined,
      zIndex: 1,
    }),
  };

  if (type === "creatAble") {
    return (
      <CreatableSelect
        {...rest}
        m={margin}
        defaultValue={defaultValue}
        styles={colourStyles}
        menuPosition={"fixed"}
        options={options}
        onChange={onChange}
      />
    );
  }
  return (
    <div className={isInvalid ? "danger" : null}>
      <Select
         color={'red'}
          placeholder={placeholder}
        {...rest}
        m={margin}
        defaultValue={defaultValue}
        styles={colourStyles}
        menuPosition={"fixed"}
        options={options}
        onChange={onChange}
      />
    </div>
  );
}
