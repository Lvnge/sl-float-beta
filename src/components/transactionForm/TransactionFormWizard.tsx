// TransactionFormWizard.tsx
import React, { useState } from "react";
import TransactionTypeSelector from "./TransactionTypeSelector";
import ExpenseTypeSelector from "./ExpenseTypeSelector";
import TransactionDetailsForm from "./TransactionDetailsForm";
import TransactionReview from "./TransactionReview";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Define the structure of our form data
export interface TransactionFormData {
  transactionType: "Income" | "Expense" | ""; // initially empty
  expenseType: "Fixed" | "Variable" | ""; // only used when expense is selected
  category: string;
  amount: number | null;
  date: string; // You could also use Date, but for simplicity we'll use string (e.g., "2025-02-01")
  note: string;
}

// Define the possible steps (for clarity)
enum Step {
  TransactionType = 0,
  ExpenseType, // Only if expense is chosen
  Details,
  Review,
}

const TransactionFormWizard: React.FC = () => {
  // Manage the current step
  const [currentStep, setCurrentStep] = useState<Step>(Step.TransactionType);

  const auth = getAuth();
  const [userUid, setUserUid] = useState<string | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUid(user.uid);
    } else {
      setUserUid(null);
    }
  });

  // Manage the form data. Initialize fields to default values.
  const [formData, setFormData] = useState<TransactionFormData>({
    transactionType: "",
    expenseType: "",
    category: "",
    amount: null,
    date: "",
    note: "",
  });

  // Function to update form data
  const updateFormData = (fields: Partial<TransactionFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  // Navigation functions
  const nextStep = () => {
    // If the transaction type is income, skip the expense type step
    if (
      currentStep === Step.TransactionType &&
      formData.transactionType === "Income"
    ) {
      setCurrentStep(Step.Details);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    // If coming back from Details and transactionType is income, go back to TransactionType
    if (currentStep === Step.Details && formData.transactionType === "Income") {
      setCurrentStep(Step.TransactionType);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Function to handle final confirmation
  const handleConfirm = async () => {
    if (!userUid) {
      console.error("No user is authenticated.");
      return;
    }
    if (
      !formData.transactionType ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      // Add transaction data to the user's specific collection
      const docRef = await addDoc(
        collection(db, "users", userUid, "transactions"),
        {
          ...formData,
          createdAt: new Date().toISOString(),
        }
      );

      console.log("Transaction saved with ID:", docRef.id);

      // Reset form after successful submission
      setFormData({
        transactionType: "",
        expenseType: "",
        category: "",
        amount: null,
        date: "",
        note: "",
      });

      setCurrentStep(Step.TransactionType); // Navigate to initial step
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // Render the appropriate step component based on currentStep
  const renderStep = () => {
    switch (currentStep) {
      case Step.TransactionType:
        return (
          <TransactionTypeSelector
            transactionType={formData.transactionType}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case Step.ExpenseType:
        return (
          <ExpenseTypeSelector
            expenseType={formData.expenseType}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case Step.Details:
        return (
          <TransactionDetailsForm
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case Step.Review:
        return (
          <TransactionReview
            formData={formData}
            prevStep={prevStep}
            handleConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm  p-4 border rounded-lg bg-zinc-800">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">New Transaction</h2>
      {renderStep()}
    </div>
  );
};

export default TransactionFormWizard;
