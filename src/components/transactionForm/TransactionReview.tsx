// TransactionReview.tsx
import React from "react";
import { TransactionFormData } from "./TransactionFormWizard";

interface Props {
  formData: TransactionFormData;
  prevStep: () => void;
  handleConfirm: () => void;
}

const TransactionReview: React.FC<Props> = ({
  formData,
  prevStep,
  handleConfirm,
}) => {
  return (
    <div className="text-zinc-200 border-1 border-zinc-600 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 text-zinc-200">
        Review Your Transaction
      </h3>
      <div className="mb-2">
        <strong>Type:</strong> {formData.transactionType}
      </div>
      {formData.transactionType === "Expense" && (
        <div className="mb-2">
          <strong>Expense Type:</strong> {formData.expenseType}
        </div>
      )}
      <div className="mb-2">
        <strong>Category:</strong> {formData.category}
      </div>
      <div className="mb-2">
        <strong>Amount:</strong> {formData.amount}
      </div>
      <div className="mb-2">
        <strong>Date:</strong> {formData.date}
      </div>
      {formData.note && (
        <div className="mb-2">
          <strong>Note:</strong> {formData.note}
        </div>
      )}

      <div className="flex flex-col gap-2 w-fit mt-8">
        <button
          className="px-4 py-2 bg-zinc-50 text-zinc-800 rounded-md text-sm font-semibold hover:bg-zinc-50/90 cursor-pointer
          
          disabled:opacity-50 disabled:cursor-auto
          disabled:hover:bg-zinc-50"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="px-4 py-2 bg-zinc-700/70 text-zinc-200 rounded-md text-sm font-semibold hover:bg-zinc-700/55 
            cursor-pointer"
          onClick={prevStep}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionReview;
