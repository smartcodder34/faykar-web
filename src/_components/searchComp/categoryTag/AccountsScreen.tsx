"use client";


import { useDiscoverAccount, useRecentlySearched } from "@/lib/api/discoversApi/discoverQuery";
import { getInitials } from "@/utils/getInitials";
import { X } from "lucide-react";
import React from "react";

interface AccountsScreenProps {
  searchQuery: string;
}

const AccountsScreen = ({ searchQuery }: AccountsScreenProps) => {
  const getRecentlySearched = useRecentlySearched();
  const getSearchAccount = useDiscoverAccount(searchQuery);

  React.useEffect(() => {
    getSearchAccount.refetch();
  }, [searchQuery]);

  console.log("getAccount30000000", getSearchAccount?.data?.data?.users);

  const resentlySearchUser = getSearchAccount?.data?.data?.users;

  const handleRemove = (id: any) => {
    // setRecentAccounts(recentAccounts.filter((account) => account.id !== id));
  };

  const handleClearAll = () => {};

  return (
    <div className="bg-white flex-1 min-h-screen">
      {/* Recent Header */}
      <div className="flex justify-between items-center px-5 py-4">
        <h2 className="text-xl font-bold text-gray-900">Recent</h2>
        <button
          onClick={handleClearAll}
          className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Recent Accounts List */}
      <div className="px-5">
        {resentlySearchUser?.length > 0 ? (
          resentlySearchUser.map((account: any, index: number) => (
            <div
              key={account.id}
              className={`flex items-center justify-between py-3 ${
                index !== resentlySearchUser?.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {getInitials(account.full_name)}
                  </span>
                </div>

                {/* Name and Time */}
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {account.full_name}
                  </p>
                  <p className="text-sm text-gray-500">{account.updated_at}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(account.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Remove account"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-base">No recent accounts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsScreen;
