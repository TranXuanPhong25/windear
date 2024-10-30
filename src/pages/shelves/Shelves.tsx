export default function Shelves() {
   const userShelves = ['My Shelf 1', 'My Shelf 2']; // Example user-defined shelves
   const readingLists = ['Want to Read', 'Read', 'Currently Reading'];

   return (
      <div>
         <h1>Shelves</h1>
         <h2>User-defined Shelves</h2>
         <ul>
            {userShelves.map((shelf, index) => (
               <li key={index}>{shelf}</li>
            ))}
         </ul>
         <h2>Reading Lists</h2>
         <ul>
            {readingLists.map((list, index) => (
               <li key={index}>{list}</li>
            ))}
         </ul>
      </div>
   );
}