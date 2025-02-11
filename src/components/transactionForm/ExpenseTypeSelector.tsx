import React from "react";
import { TransactionFormData } from "./TransactionFormWizard";

interface Props {
  expenseType: TransactionFormData["expenseType"];
  updateFormData: (fields: Partial<TransactionFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const ExpenseTypeSelector: React.FC<Props> = ({
  expenseType,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="p-4 bg-zinc-800 rounded-lg shadow-md">
      <p className="mb-2 text-zinc-200 text-sm font-medium">
        Select Expense Type:
      </p>
      <div className="flex flex-col mb-4 space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="expenseType"
            value="fixed"
            checked={expenseType === "Fixed"}
            onChange={() => updateFormData({ expenseType: "Fixed" })}
            className="hidden"
          />
          <div
            className={`w-4 h-4 flex items-center justify-center border-1 rounded-full ${
              expenseType === "Fixed" ? "border-zinc-200" : "border-zinc-500"
            }`}
          >
            {expenseType === "Fixed" && (
              <div className="w-3 h-3 bg-zinc-200 rounded-full" />
            )}
          </div>
          <span className="text-zinc-200 text-sm font-semibold">Fixed</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="expenseType"
            value="variable"
            checked={expenseType === "Variable"}
            onChange={() => updateFormData({ expenseType: "Variable" })}
            className="hidden"
          />
          <div
            className={`w-4 h-4 flex items-center justify-center border-1 rounded-full ${
              expenseType === "Variable" ? "border-zinc-200" : "border-zinc-500"
            }`}
          >
            {expenseType === "Variable" && (
              <div className="w-3 h-3 bg-zinc-200 rounded-full" />
            )}
          </div>
          <span className="text-zinc-200 text-sm font-semibold">Variable</span>
        </label>
      </div>
      <div className="flex flex-col gap-2 w-fit">
        <button
          className="px-4 py-2 bg-zinc-50 text-zinc-800 rounded-md text-sm font-semibold hover:bg-zinc-50/90 cursor-pointer
          
          disabled:opacity-50 disabled:cursor-auto
          disabled:hover:bg-zinc-50"
          disabled={!expenseType}
          onClick={nextStep}
        >
          Continue
        </button>
        <button
          className="px-4 py-2 bg-zinc-700/70 text-zinc-200 rounded-md text-sm font-semibold hover:bg-zinc-700/55 
            cursor-pointer"
          onClick={prevStep}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ExpenseTypeSelector;
