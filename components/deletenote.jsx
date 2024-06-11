import React from "react";
import axios from "axios";

function Deletenote({setdeleteNote}) {
  return (
    <div className="fixed z-50 bg-slate-400/80 w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/6 mx-auto bg-white p-10 rounded flex flex-col items-center gap-4">
        <h1>Delete Note</h1>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white p-2 w-[100px] rounded"
            onClick={() => {
              setdeleteNote(false);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-500 text-white p-2 w-[100px] rounded"
            onClick={() => {
              setdeleteNote(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deletenote;
