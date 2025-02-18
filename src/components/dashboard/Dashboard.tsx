// SomePage.tsx or Dashboard.tsx
import React from "react";
import TransactionFormWizard from "../transactionForm/TransactionFormWizard";
import TransactionList from "./TransactionList";
//import ExportWizard from "../export/ExportWizard";
import FileUpload from "../upload/FileUpload";
//import DownloadTemplateEnhanced from "../common/DownloadTemplate";

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-zinc-800 ">Dashboard</h1>
      <div className="flex flex-col gap-y-4">
        <TransactionFormWizard />
        <TransactionList />
        <FileUpload />
        {/* <ExportWizard />*/}
        {/*<DownloadTemplateEnhanced />*/}
      </div>
    </div>
  );
};

export default Dashboard;
