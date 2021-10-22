import React from "react";
import { defaultValues, fileContext } from "../file-context";
import FileChangeProvider from "./file-change-provider";

export default function Home() {
  return (
    <fileContext.Provider value={defaultValues}>
      <div>
        <h1>Hello Botpress reviewer!</h1>

        <FileChangeProvider />
      </div>
    </fileContext.Provider>
  );
}
