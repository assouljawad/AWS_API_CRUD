"use client";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

function Editnote({ seteditnote, user, note_id}) {
  const [Title, setTitle] = useState("");
  const [Note, setNote] = useState("");
  const [Category, setCategory] = useState("");
  const body = {
    id:  note_id,
    title: Title,
    note: Note,
    category: Category,
    user: user,
  };
  const handeledit = () => {
    console.log(body); 
    axios.put(process.env.NEXT_PUBLIC_URL,body)
    .then(function (response) {
      toast.success("The Note Edited Successfully");
      seteditnote(false)
    })
    .catch(function (error) {
      toast.error(error.message);
    });
  };

  return (
    <div className="fixed z-50 bg-slate-400/80 w-full h-screen flex flex-col items-center justify-center">
      <div className="w-3/6 mx-auto bg-white p-10 rounded">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-4">
            <FaRegTrashAlt className="cursor-pointer text-2xl" />
            <MdEditDocument className="cursor-pointer text-2xl" />
          </div>
          <div>
            <IoMdClose
              className="cursor-pointer text-2xl"
              onClick={() => {
                seteditnote(false);
              }}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-4 mt-5">
          <h1 className="text-xl font-bold">Edit Note</h1>
          <input
            className="bg-zinc-100 p-2 rounded w-full"
            type="text"
            placeholder="Note Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="today"
                    type="checkbox"
                    value="today"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="today"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Todays Notes
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="tomorrow"
                    type="checkbox"
                    value="tomorrow"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="tomorrow"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Tomorrows Notes
                  </label>
                </div>
              </li>
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="Week"
                    type="checkbox"
                    value="week"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="Week"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    This Weeks Notes
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <textarea
            id="note"
            rows="8"
            class="block p-2.5 w-full  text-gray-900 bg-zinc-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your Notes here..."
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <div className="flex justify-end">
            <button
              className="bg-black text-white p-2 w-[100px] rounded"
              onClick={handeledit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editnote;
