"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold";
import Toolbar from "./Toolbar";

const Tiptap = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Bold,
      BulletList,
      ListItem,
      OrderedList,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "mx-auto p-3 border border-gray-300 rounded-b-md focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
