// types.ts
export interface Club {
    id: string
    name: string
    description: string
    category: string
    members: number
    image: string
    isJoined: boolean
    rating: number
    location: string
    meetingTime: string
    activities: string[]
    president: string
    contact: string
  }
  
export interface JoinedClub {
    name: string
    nextMeeting: string
    attending: boolean
  }

  export interface Event {
    id: string
    title: string
    club:string
    description: string
    date:string
    category: 'club' | 'ppmk' | 'academic'
    attendees: number
    image: string
    isJoined: boolean
    location: string
    time: string
  }

  