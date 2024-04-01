export interface CardInfo {
  src: string,
  id: number | string,
  matched: boolean
}
export interface contextTypes {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
}