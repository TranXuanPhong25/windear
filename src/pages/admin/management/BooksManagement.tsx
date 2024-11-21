import AddBookForm from "@/components/admin/management/book/AddBookForm";
import BooksTable from "@/components/admin/management/book/BooksTable";
import InfoCard from "@/components/layout/admin/InfoCard";
import { useCountBookIn30Days } from "@/hooks/admin/useCountBookIn30Days";
import { BookTableData } from "@/types/BookTableData";
import { BookPlusIcon } from "lucide-react";
import { useEffect } from "react";
const mockData: BookTableData[] = Array.from({ length: 20 }, (_, index) => ({
	id: `${index + 1}`,
	title: `Book Title asdfasdfz		 ${index + 1}`,
	author: `Author ${index + 1}`,
	releaseDate: new Date(2020, index % 12, index + 1).toISOString(),
	publisher: `Publisher ${index + 1}`,
	imageUrl: `https://via.placeholder.com/50?text=Book+${index + 1}`,
	addDate: new Date().toLocaleDateString(),
}));
function BooksManagement() {
	const { data: numOfBookIn30Days } = useCountBookIn30Days();
	useEffect(() => {
		document.title = "Books Management | Admin";
	}, []);
	return (
		<div>
			<InfoCard title="New	 books added in the last 30 days." className="!bg-blue-500  text-white w-fit mb-6" value={numOfBookIn30Days} icon={BookPlusIcon} />
			<div className="flex gap-6 flex-wrap min-[1480px]:flex-nowrap">
				<div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md  h-fit  2xl:basis-4/5">
					<h1 className="text-3xl font-bold mb-6">
						Add new Book
					</h1>
					<AddBookForm />
				</div>
				<div className="w-full p-6 dark:bg-slate-600 bg-white rounded-2xl shadow-md  ">
					<h1 className="text-3xl font-bold">
						Recently Added Books
					</h1>
					<BooksTable data={mockData} />
				</div>
			</div>
		</div>
	);
}

export default BooksManagement;