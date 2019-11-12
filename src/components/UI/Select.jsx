import React from "react";

const Select = React.memo(({ id, name, value, options, onChange }) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    >
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
});

export default Select;
