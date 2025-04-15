import React from "react";

function CustomInput({ label, type, value, onChange, error, name }) {
  console.log(name, value, type, label);
  return (
    <div className="flex flex-col gap-1.5 pb-4">
      <label htmlFor={name} className="font-bold">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-slate-700 w-full py-1.5 px-4 rounded-lg"
      />
    </div>
  );
}

export default CustomInput;
