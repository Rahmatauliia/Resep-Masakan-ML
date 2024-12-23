"use client";

import { FaBold, FaList, FaListOl } from "react-icons/fa";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";

export default function Toolbar({ editor }) {
  return (
    <div className="w-full border border-b-0 rounded-t-lg bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded-tl-lg"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-tl-lg"
        }
        type="button"
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading3 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading4 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading5 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <LuHeading6 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <FaList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "bg-yellow-200 text-gray-800 font-bold py-2 px-4"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4"
        }
        type="button"
      >
        <FaListOl />
      </button>
    </div>
  );
}
