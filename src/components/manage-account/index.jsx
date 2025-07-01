"use client";

import { GlobalContext } from "@/app/context";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState, useTransition } from "react";
import { ToastContainer, toast } from "react-toastify";
import AccountForm from "./AccountForm";
import { FaTrashCan } from "react-icons/fa6";
import PinContainer from "./PinContainer";
import { usePathname, useRouter } from "next/navigation";

const ManageAccount = () => {
  const [isPending, startTransition] = useTransition();
  const { accounts, setAccounts, setLoggedInAccount } =
    useContext(GlobalContext);
  const { data: session, status } = useSession();

  const [userAvatar, setUserAvatar] = useState(null);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   create user
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
  });

  // pin State
  const [showPinContainer, setShowPinContainer] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  console.log("pathname",pathname);
  

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      getAllAccounts(session.user.id);
      setUserAvatar(session.user.image);
    }
  }, [status, session]);

  const getAllAccounts = async (uid) => {
    try {
      startTransition(async () => {
        const res = await fetch(`/api/account/get-all-account?uid=${uid}`);
        const data = await res.json();

        if (data?.success) {
          setAccounts(data?.results || []);
        } else {
          console.error("Failed to fetch accounts:", data.message);
        }
      });
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  // handleAccountCreate
  const handleAccountCreate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.pin) {
      toast.warn("Name and PIN are required!");
      return;
    }

    const payload = {
      uid: session?.user?.id,
      name: formData.name,
      pin: formData.pin,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/account/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Account created successfully!");
        setFormData({ name: "", pin: "" });
        setShowAccountForm(false);
        getAllAccounts(session?.user?.id);
      } else {
        toast.error(result.message || "Account creation failed.");
      }
    } catch (error) {
      console.error("Account creation error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // handleDeleteAccount
  const handleDeleteAccount = async (accountId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/account/delete-account/${accountId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: accountId }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Account deleted successfully!");
        getAllAccounts(session?.user?.id);
      } else {
        toast.error(result.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong.");
    }
  };

  // hendlePinSubmit
  const hendlePinSubmit = async () => {
    try {
      const res = await fetch("/api/account/login-to-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: session?.user?.id,
          id: selectedAccount?.id,
          pin,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setLoggedInAccount(selectedAccount);
        sessionStorage.setItem(
          "loggedInAccount",
          JSON.stringify(selectedAccount)
        );
        toast.success("PIN matched! Redirecting...");
        setPin("");
        setShowPinContainer(false);
        setPinError(false);
        router.push(pathname);
      } else {
        setPinError(true);
      }
    } catch (error) {
      toast.error("PIN verification failed.");
      setPinError(true);
    }
  };

    return (
    <>
      <div className="flex h-screen items-center justify-center flex-col bg-black text-white px-4">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-center">Who's Watching? 🎥</h1>

          <ul className={`${accounts?.length == 0 ?"grid-rows-1":"grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}grid  gap-6 mt-4`}>
            {isPending ? (
              <li className="col-span-full flex items-center justify-center w-full h-40">
                <div className="text-white text-xl font-semibold text-center animate-pulse">
                  Loading...
                </div>
              </li>
            ) : accounts?.length > 0 ? (
              accounts.map((acc) => (
                <li
                  key={acc.id}
                  className="group flex flex-col items-center transition hover:scale-105"
                >
                  <button
                    onClick={() => {
                      if (!showDeleteIcon) {
                        setSelectedAccount(acc);
                        setShowPinContainer(true);
                      }
                    }}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-600 shadow relative"
                  >
                    <Image
                      src={userAvatar || "/default-avatar.png"}
                      alt={acc.name || "Profile"}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                    {showDeleteIcon && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeleteAccount(acc.id);
                        }}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow z-10 cursor-pointer"
                        title="Delete Account"
                      >
                        <FaTrashCan size={16} />
                      </button>
                    )}
                  </button>
                  <span className="mt-2 text-lg">{acc.name || "Unnamed"}</span>
                </li>
              ))
            ) : (
              <li className="col-span-full flex justify-center items-center">
                <p className="text-white text-2xl pb-3">No accounts found</p>
              </li>
            )}

            {!isPending && accounts?.length < 4 && (
              <li className="col-span-full flex justify-center items-center">
                <button
                  onClick={() => setShowAccountForm(true)}
                  type="button"
                  className="group flex flex-col items-center transition hover:scale-105 cursor-pointer"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-800 flex items-center justify-center text-4xl border-2 border-dashed border-gray-400 group-hover:border-red-600">
                    +
                  </div>
                  <span className="mt-2 text-lg">Add Profile</span>
                </button>
              </li>
            )}
          </ul>
          {/* <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
            {isPending ? (
              <li className="col-span-full flex items-center justify-center w-full h-40">
                <div className="text-white text-xl font-semibold text-center animate-pulse">
                  Loading...
                </div>
              </li>
            ) : accounts?.length > 0 ? (
              accounts.map((acc) => (
                <li
                  key={acc.id}
                  className="group flex flex-col items-center transition hover:scale-105"
                >
                  <button
                    onClick={() => {
                      if (!showDeleteIcon) {
                        setSelectedAccount(acc);
                        setShowPinContainer(true);
                      }
                    }}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-600 shadow relative"
                  >
                    <Image
                      src={userAvatar || "/default-avatar.png"}
                      alt={acc.name || "Profile"}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                    {showDeleteIcon && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeleteAccount(acc.id);
                        }}
                        className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow z-10 cursor-pointer"
                        title="Delete Account"
                      >
                        <FaTrashCan size={16} />
                      </button>
                    )}
                  </button>
                  <span className="mt-2 text-lg">{acc.name || "Unnamed"}</span>
                </li>
              ))
            ) : (
              <li className="col-span-full flex justify-center items-center h-40">
                <p className="text-white text-xl font-semibold">No accounts found</p>
              </li>
            )}

            {!isPending && accounts?.length < 4 && (
              <li className="flex justify-center items-center ">
                <button
                  onClick={() => setShowAccountForm(true)}
                  type="button"
                  className="group flex flex-col items-center transition hover:scale-105 cursor-pointer"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-800 flex items-center justify-center text-4xl border-2 border-dashed border-gray-400 group-hover:border-red-600">
                    +
                  </div>
                  <span className="mt-2 text-lg">Add Profile</span>
                </button>
              </li>
            )}
          </ul> */}


          <div className="text-center mt-4">
            <span
              onClick={() => setShowDeleteIcon(!showDeleteIcon)}
              className="px-8 py-2 border rounded border-white cursor-pointer"
            >
              Manage Profile
            </span>
          </div>
        </div>
      </div>

      {showAccountForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setShowAccountForm(false)}
              className="absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
            >
              &times;
            </button>
            <AccountForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleAccountCreate}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      {showPinContainer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full relative">
            <button
              className="absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
              onClick={() => {
                setShowPinContainer(false);
                setPin("");
                setPinError(false);
              }}
            >
              &times;
            </button>
            <PinContainer
              pinError={pinError}
              hendlePinSubmit={hendlePinSubmit}
              pin={pin}
              setPin={setPin}
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default ManageAccount;