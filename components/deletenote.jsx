import React from "react";
import axios from "axios";
import toast from "react-hot-toast";


function Deletenote({ setdeleteNote , note_id}) {
  const handeldelete = () => {
    const id = {
      id:note_id,
    }
    axios
      .delete(process.env.NEXT_PUBLIC_URL, { data: id })
      .then((response) => {
        toast.success("The Note Deleted Successfully");
        setdeleteNote(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="fixed z-50 bg-slate-400/80 w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/6 mx-auto bg-white p-10 rounded flex flex-col items-center gap-4">
        <h1>Delete Note</h1>
        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white p-2 w-[100px] rounded"
            onClick={() => {
              handeldelete();
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
