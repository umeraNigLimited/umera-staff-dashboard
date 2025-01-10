import React from "react";
import SettingSection from "./SettingSection";
import { File } from "lucide-react";
import DocumentList from "./DocumentList";

function Documents() {
  const documents = [
    { type: "Gaurantors Form", document: "" },
    { type: "Offer Letter", document: "" },
    { type: "Leave", document: "" },
    { type: "Query", document: "" },
  ];
  return (
    <div>
      <SettingSection icon={File} title={"Documents"}>
        {documents.map((item, idex) => (
          <DocumentList key={idex} type={item.type} documents={item.document} />
        ))}
      </SettingSection>
    </div>
  );
}

export default Documents;
