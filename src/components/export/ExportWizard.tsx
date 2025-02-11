import ExportYearSelection from "./ExportYearSelection";

const ExportWizard = () => {
  return (
    <div className="max-w-sm  p-4 border rounded-lg bg-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Export</h2>
      <ExportYearSelection />
    </div>
  );
};

export default ExportWizard;
