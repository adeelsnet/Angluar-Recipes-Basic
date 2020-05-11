export interface Recipe {
  _id?: string,
  title: string,
  cuisine: string,
  chefName: string,
  description: string,
  specialty?: string,
  date?:  Date,
  image?: any
}
