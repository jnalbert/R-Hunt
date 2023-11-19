
export interface ObjectiveDBType{
    image: string
    latitude: number
    longitude: number
}


export interface GameDBType {
  currCount: number
  id: string
  maxPlayers: number
  name: string
  numObjectives: number
  ready: boolean
  winner: string
  gameCode: string
}
