import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold";

const generateConfig = [
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
];

export default generateConfig;
