import React from "react";

function CommonButton({ linktext, icon, action }) {
  return (
    <button
      onClick={() => action()}
      className="flex gap-3 items-center w-64 bg-slate-50 text-black border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-[1rem]">{linktext}</span>
    </button>
  );
}

export default CommonButton;
