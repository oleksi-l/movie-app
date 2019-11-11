import React from "react";

const Select = props => {
  const { id, name, value, options, onChange } = props;
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    >
      {props.options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
