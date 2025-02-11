// TransactionDetailsForm.tsx
import React from "react";
import { TransactionFormData } from "./TransactionFormWizard";

interface Props {
  formData: TransactionFormData;
  updateFormData: (fields: Partial<TransactionFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const TransactionDetailsForm: React.FC<Props> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  // For simplicity, we won’t do deep validation here
  const isValid =
    formData.category.trim() !== "" &&
    formData.amount !== null &&
    formData.date.trim() !== "";

  return (
    <div className="">
      <div className="mb-4">
        <label className="block font-semibold text-zinc-200">Category:</label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
          className="mt-2 w-full p-1 px-3 py-1.5 border rounded-md
          text-zinc-200
          not-focus:border-zinc-600
          placeholder-zinc-500"
          placeholder="Category"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-zinc-200">Amount:</label>
        <input
          type="number"
          value={formData.amount === null ? "" : formData.amount}
          onChange={(e) => updateFormData({ amount: Number(e.target.value) })}
          className=" mt-2 w-full p-1 px-3 py-1.5 border-1 rounded-md placeholder-zinc-500
          text-zinc-200
          not-focus:border-zinc-600"
          placeholder="Amount"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-zinc-200">Date:</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => updateFormData({ date: e.target.value })}
          className="mt-2 w-full p-1 px-3 py-1.5 border rounded-md placeholder-zinc-500
          text-zinc-200
          not-focus:border-zinc-600"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-zinc-200">
          Note (optional):
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => updateFormData({ note: e.target.value })}
          className="mt-2 w-full p-1 px-3 py-1.5 border rounded-md
          text-zinc-200
          not-focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-2 w-fit">
        <button
          className="px-4 py-2 bg-zinc-50 text-zinc-800 rounded-md text-sm font-semibold hover:bg-zinc-50/90 cursor-pointer
          
          disabled:opacity-50 disabled:cursor-auto
          disabled:hover:bg-zinc-50"
          disabled={!isValid}
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

export default TransactionDetailsForm;
