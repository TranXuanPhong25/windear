export default interface StarRatingProps {
   initialRating?: number
   ratable?: boolean
   small?: boolean
   onChange?: (rating: number) => void
   
 }