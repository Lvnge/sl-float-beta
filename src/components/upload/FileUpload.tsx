import React, { useState } from "react";
import * as XLSX from "xlsx";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface RowData {
  Category: string;
  "Transaction Type": string;
  "Expense Type": string;
  Amount: number;
  Date: string;
  Note: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    if (!auth.currentUser) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (e) => {
        if (!e.target?.result) return;
        const workbook = XLSX.read(e.target.result, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: RowData[] = XLSX.utils.sheet_to_json(sheet);

        const userId = auth.currentUser?.uid ?? "";
        if (!userId) {
          console.error("User is not authenticated");
          return;
        }

        for (const row of data) {
          const {
            Category,
            "Transaction Type": transactionType,
            "Expense Type": expenseType,
            Amount,
            Date: dateString,
            Note,
          } = row;

          // Skip invalid rows
          if (!Amount || !dateString || !transactionType) {
            continue;
          }

          if (transactionType !== "Expense" && transactionType !== "Income") {
            continue;
          }

          if (
            transactionType === "Expense" &&
            expenseType &&
            expenseType !== "Fixed" &&
            expenseType !== "Variable"
          ) {
            continue;
          }

          // Ensure Amount is a valid number
          const parsedAmount = parseFloat(Amount.toString());
          if (isNaN(parsedAmount)) {
            console.error("Invalid Amount:", Amount);
            continue;
          }

          let parsedDate: number | Date;

          // Manually parse the mm/dd/yyyy format
          if (typeof dateString === "string" && dateString.includes("/")) {
            const [month, day, year] = dateString
              .split("/")
              .map((part) => parseInt(part, 10));

            // Check if the month, day, and year are valid
            if (
              !isNaN(month) &&
              month > 0 &&
              month <= 12 &&
              !isNaN(day) &&
              day > 0 &&
              day <= 31 &&
              !isNaN(year) &&
              year > 1900
            ) {
              parsedDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed
            } else {
              console.error("Invalid date components:", { month, day, year });
              continue; // Skip this row if the date is invalid
            }
          } else if (!isNaN(Number(dateString))) {
            // If the date is an Excel serial number
            parsedDate = new Date((Number(dateString) - 25569) * 86400 * 1000); // Convert Excel serial to JavaScript date
          } else {
            // Try using the original string
            parsedDate = new Date(dateString);
          }

          // Check if the date is valid
          if (isNaN(parsedDate.getTime())) {
            console.error(
              "Invalid Date:",
              dateString,
              "Parsed Date:",
              parsedDate
            );
            continue; // Skip this row if the date is invalid
          }

          console.log("Parsed Date:", parsedDate); // Check parsed date in the console

          const transactionData = {
            category: Category || "",
            transactionType,
            expenseType: transactionType === "Expense" ? expenseType || "" : "",
            amount: Amount,
            date: parsedDate.toISOString(), // Store as ISO string (UTC)
            note: Note || "",
            createdAt: new Date().toISOString(),
          };

          // Adding the transaction to Firestore using addDoc
          const transactionsRef = collection(
            db,
            "users",
            userId,
            "transactions"
          );
          await addDoc(transactionsRef, transactionData);
        }

        setSuccess("File uploaded successfully!");
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error uploading file: ${err.message}`);
      } else {
        setError(`Unknown error: ${err}`);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-sm p-4 bg-zinc-800 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">
        Upload Excel File
      </h2>
      <div className="flex flex-col space-y-4 p-4">
        <div>
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-zinc-200 mb-2"
          >
            Select File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="w-fit block text-sm text-zinc-200 file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-600 file:text-zinc-200 file:cursor-pointer"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-fit px-4 py-2 bg-zinc-50 text-zinc-800 rounded-md text-sm font-semibold hover:bg-zinc-50/90 cursor-pointer disabled:opacity-50 disabled:cursor-auto disabled:hover:bg-zinc-50 ${
            !file || uploading
              ? "opacity-50 cursor-not-allowed"
              : "bg-zinc-50 hover:bg-zinc-50"
          }`}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-green-500 text-center">{success}</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
