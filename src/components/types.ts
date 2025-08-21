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

  export type Event = {
    id: string
    title: string
    club: string        
    description: string
    category: string
    attendees: number
    image: string
    isJoined: boolean
    location: string
    date: string
    time: string
  }  

  export interface Message {
    id: string
    sender: string
    content: string
    timestamp: string
    avatar:string
  }

  export interface Student {
    name: string
    password: string
    batch: number
    events: Event[]
    chats: string[]
    clubs:JoinedClub[]
    messages:Record<string,Message[]>
  }
  

  