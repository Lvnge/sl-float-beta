import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Transaction {
  id: string;
  transactionType: "Income" | "Expense";
  expenseType?: "Fixed" | "Variable"; // Only for expenses
  category: string;
  amount: number;
  date: string;
  note?: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  useEffect(() => {
    if (!user) return;

    const transactionsRef = collection(db, "users", user.uid, "transactions");
    const q = query(transactionsRef, orderBy("date", "desc")); // Sort by date (newest first)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionArray = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id, // Add the id first
            ...doc.data(), // Spread the remaining data
          } as Transaction)
      ); // Type the resulting object as `Transaction`

      setTransactions(transactionArray);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user, db]);

  // 🗑 Delete transaction
  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      const transactionRef = doc(db, "users", user.uid, "transactions", id);
      await deleteDoc(transactionRef);
      console.log("Transaction deleted:", id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // ✏️ Edit transaction (for simplicity, updates amount)
  const handleEdit = async (id: string) => {
    if (!user) return;
    const newAmount = prompt("Enter new amount:");
    if (!newAmount) return;

    try {
      await updateDoc(doc(db, "users", user.uid, "transactions", id), {
        amount: parseFloat(newAmount),
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  return (
    <div className="max-w-sm p-4 bg-zinc-800 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">
        Transaction History
      </h2>
      {transactions.length === 0 ? (
        <p className="text-zinc-200">No transactions yet.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((txn) => (
            <li
              key={txn.id} // Ensure the key is the transaction id
              className="p-4 bg-zinc-700 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-zinc-200">
                  {txn.category}
                </span>
                <span className="text-sm text-zinc-300">
                  {new Date(txn.date).toLocaleDateString("en-US", {
                    timeZone: "America/Mexico_City", // Adjust for your time zone
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={
                    txn.transactionType === "Income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  $
                  {typeof txn.amount === "number"
                    ? txn.amount.toFixed(2)
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(txn.id)}
                    className="text-zinc-200 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(txn.id)}
                    className="text-zinc-200 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
