import React from "react";
import { getAuth } from "firebase/auth";

const Account: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <>
      <div className="p-4">
        <div className="text-2xl font-bold mb-4 text-zinc-800">Account</div>
        <div className="flex flex-col gap-y-4">
          <div
            className="
          flex flex-col
          gap-2
          max-w-sm  p-4 border text-zinc-200 rounded-lg bg-zinc-800"
          >
            <p className="font-semibold">User Email:</p>
            <p className="text-sm">{user?.email || "Not logged in"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
