import React from "react";
import { CiStickyNote } from "react-icons/ci";

function Notecard({ setaddNote, setdeleteNote, note, setdeleteid}) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center">
      <div className="flex gap-2 items-center">
        <CiStickyNote className="text-xl" />
        <p className="font-bold truncate">
          {note.note}
        </p>
      </div>
      <p className="font-bold truncate">{note.title}</p>
      <button
        className="bg-black text-white p-2 w-[100px] rounded"
        onClick={() => {
          setaddNote(true);
        }}
      >
        Edit
      </button>
      <button
        className="bg-black text-white p-2 w-[100px] rounded"
        onClick={() => {
          setdeleteNote(true);
          setdeleteid(note.id)
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Notecard;
