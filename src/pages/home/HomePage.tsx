import BookList from "@/components/home/BookList";
import NewsBanner from "@/components/home/NewsBanner";

export default function HomePage() {
   return (
      <main className=" max-w-[1200px] mx-auto">
         <NewsBanner />
         <BookList title="Recommendations"/>
         <BookList title="Popular" />
         <BookList title="New books"/>

      </main>
   )
}