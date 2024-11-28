import AddBookForm from "@/components/admin/management/book/AddBookForm";
import BooksTable from "@/components/admin/management/book/BooksTable";
import InfoCard from "@/components/layout/admin/InfoCard";
import {useCountBookIn30Days} from "@/hooks/admin/useCountBookIn30Days";
import {BookPlusIcon} from "lucide-react";
import {useEffect} from "react";

function BooksManagement() {
    const {data: numOfBookIn30Days} = useCountBookIn30Days();
    useEffect(() => {
        document.title = "Books Management | Admin";
    }, []);

    return (
        <div>
            <div className="flex gap-6 flex-wrap min-[1770px]:flex-nowrap">
                <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md  h-fit min-[1770px]:basis-4/5">
                    <AddBookForm/>
                </div>
                <div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md  ">
                    <InfoCard title="New books added in the last 30 days."
                              className="!bg-blue-500  text-white w-fit mb-6" value={numOfBookIn30Days}
                              icon={BookPlusIcon}/>
                    <h1 className="text-3xl font-bold">
                        Recently Added Books
                    </h1>
                    <BooksTable/>
                </div>
            </div>
        </div>
    );
}

export default BooksManagement;