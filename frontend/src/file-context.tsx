import { createContext } from "react";
import Folder from "./domain/repositories/folder";

export const fileContext = createContext<Folder[]>([]);
