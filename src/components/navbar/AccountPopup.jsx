"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useTransition } from "react";

const AccountPopup = ({
  onClose,
  accounts,
  setAccounts,
  setLoggedInAccount,
  loggedInAccount,
  signOut,
}) => {
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      getAllAccounts(session.user.id);
    //   setUserAvatar(session.user.image);
    }
  }, [status, session]);

  const getAllAccounts = async (uid) => {
  try {
    const res = await fetch(`/api/account/get-all-account?uid=${uid}`);
    const data = await res.json();

    if (data?.success) {
      startTransition(() => {
        setAccounts(data.results || []);
      });
    } else {
      console.error("Failed to fetch accounts:", data.message);
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
  }
};

  const handleSwitchAccount = (account) => {
    startTransition(() => {
        setLoggedInAccount(null);
        sessionStorage.removeItem("loggedInAccount");
        onClose(); 
    });
  };



  return (
    <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 z-50 w-64">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-700 font-medium">Account Options</p>
        <button
          onClick={onClose}
          className="mt-2 text-sm text-red-500 hover:text-red-700"
        >
            X
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {accounts && accounts.length > 1 ? (
          accounts
            .filter((item) => item.id !== loggedInAccount?.id)
            .map((account) => (
              <div
                key={account.id}
                className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 text-gray-800 text-sm"
                onClick={() => handleSwitchAccount(account)}
              >
                <p>{account.name}</p>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">No other accounts</p>
        )}
      </div>

      <div className="mt-4 px-3">
            <button
                onClick={() => {
                    signOut();
                    setLoggedInAccount(null);
                    sessionStorage.removeItem("loggedInAccount");
                }}
                className="text-sm hover:text-white cursor-pointer border border-gray-300 rounded-2xl px-3 py-2 w-full text-center bg-red-600 text-white hover:bg-red-700 transition duration-200"
            >
                Logout
            </button>
        </div>
    </div>
  );
};

export default AccountPopup;
