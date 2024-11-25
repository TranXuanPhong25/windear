import {useEffect} from "react";
import BorrowingRequestTable from "@/components/admin/management/borrowing/BorrowingRequestTable.tsx";
function BorrowingManagement() {
    useEffect(() => {
        document.title = "Borrowing Management | Admin";
    }, []);
  return (
      <div className="flex gap-6 flex-wrap min-[1480px]:flex-nowrap">
          <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md  ">
              <h1 className="text-3xl font-bold">
                  Borrowing request
              </h1>
              <BorrowingRequestTable/>
          </div>
      </div>
  );
}

export default BorrowingManagement;