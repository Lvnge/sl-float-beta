import React from "react";
import { TransactionFormData } from "./TransactionFormWizard";

interface Props {
  transactionType: TransactionFormData["transactionType"];
  updateFormData: (fields: Partial<TransactionFormData>) => void;
  nextStep: () => void;
}

const TransactionTypeSelector: React.FC<Props> = ({
  transactionType,
  updateFormData,
  nextStep,
}) => {
  return (
    <div className="p-4 bg-zinc-800 rounded-lg shadow-md">
      <p className="mb-2 text-zinc-200 text-sm font-medium">
        Choose Transaction Type:
      </p>
      <div className="flex flex-col mb-4 space-y-2">
        <label className="flex items-center gap-2  ">
          <input
            type="radio"
            name="transactionType"
            value="income"
            checked={transactionType === "Income"}
            onChange={() => updateFormData({ transactionType: "Income" })}
            className="hidden"
          />
          <div
            className={`w-4 h-4 flex items-center justify-center border-1 rounded-full ${
              transactionType === "Income"
                ? "border-zinc-200"
                : "border-zinc-500"
            }`}
          >
            {transactionType === "Income" && (
              <div className="w-3 h-3 bg-zinc-200 rounded-full" />
            )}
          </div>
          <span className="text-zinc-200 text-sm font-semibold">Income</span>
        </label>
        <label className="flex items-center gap-2 ">
          <input
            type="radio"
            name="transactionType"
            value="expense"
            checked={transactionType === "Expense"}
            onChange={() => updateFormData({ transactionType: "Expense" })}
            className="hidden"
          />
          <div
            className={`w-4 h-4 flex items-center justify-center border-1 rounded-full ${
              transactionType === "Expense"
                ? "border-zinc-200"
                : "border-zinc-500"
            }`}
          >
            {transactionType === "Expense" && (
              <div className="w-3 h-3 bg-zinc-200 rounded-full" />
            )}
          </div>
          <span className="text-zinc-200 text-sm font-semibold">Expense</span>
        </label>
      </div>
      <button
        className=" px-4 py-2 bg-zinc-50 text-zinc-800 rounded-md text-sm font-semibold  hover:bg-zinc-200 
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-auto
        disabled:hover:bg-zinc-50"
        disabled={!transactionType}
        onClick={nextStep}
      >
        Continue
      </button>
    </div>
  );
};

export default TransactionTypeSelector;
