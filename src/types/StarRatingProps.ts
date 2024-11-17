export default interface StarRatingProps {
  title?:string;
  initialRating?: number
  ratable?: boolean
  small?: boolean
  onChange?: (rating: number) => void
}