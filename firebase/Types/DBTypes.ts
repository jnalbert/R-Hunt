
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
  finished: boolean
}

export interface PlayerInGameDB {
  playerId: string
  username: string
  objectsCompleted: string[]
  latitude: number
  longitude: number
  profilePic: string
 }
 
