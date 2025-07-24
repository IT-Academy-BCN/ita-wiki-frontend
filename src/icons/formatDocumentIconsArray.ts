import type { FormatDocumentCategory } from "../types";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { RxTextAlignLeft, RxTextAlignCenter } from "react-icons/rx";
import { FiUnderline, FiBold, FiItalic } from "react-icons/fi";
import { SvgIcon } from "../types";

export const formatDocumentIcons: {
  icon: SvgIcon;
  label: FormatDocumentCategory;
}[] = [
  { label: "bold", icon: FiBold },
  { label: "italic", icon: FiItalic },
  { label: "underline", icon: FiUnderline },
  { label: "align-left", icon: RxTextAlignLeft },
  { label: "align-center", icon: RxTextAlignCenter },
  { label: "ordered-list", icon: AiOutlineOrderedList },
  { label: "unordered-list", icon: AiOutlineUnorderedList },
];
