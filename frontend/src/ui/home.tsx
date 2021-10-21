import React, { useContext } from "react";
import { fileContext } from "../file-context";
import FileChangeProvider from "./file-change-provider";

export default function Home() {
  return (
    <fileContext.Provider value={[]}>
      <div>
        <h1>Hello Botpress reviewer!</h1>

        <FileChangeProvider />
      </div>
    </fileContext.Provider>
  );
}
