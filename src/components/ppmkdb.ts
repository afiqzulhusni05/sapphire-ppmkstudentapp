// src/data/studentsDB.ts
import { Student } from "../components/types"

export let students: Student[] = [
  {
    name: "Sarah",
    password: "1234",
    batch: 22,
    events: [
      {
        id: "sarah-1",
        title: "Badminton Training",
        club: "MKBA",
        description: "Weekly practice",
        category: "club",
        attendees: 5,
        image: "https://via.placeholder.com/400",
        isJoined: true,
        location: "Court A",
        date: "2025-08-20",
        time: "17:00",
      }
    ],
    chats: ["Hey guys, practice tomorrow at 5pm!"],
    clubs: [
      { name: "MKBA", nextMeeting: "2025-08-20", attending: false }
    ]
  },
  {
    name: "Alyaa",
    password: "1234",
    batch: 22,
    events: [
      {
        id: "alyaa-1",
        title: "Study Group",
        club: "PPMK",
        description: "Group study session",
        category: "ppmk",
        attendees: 3,
        image: "https://via.placeholder.com/400",
        isJoined: true,
        location: "Library",
        date: "2025-08-22",
        time: "10:00",
      }
    ],
    chats: ["Reminder: bring your notes"],
    clubs: [
      { name: "Recreation Club", nextMeeting: "2025-08-22", attending: false }
    ]
  },
  {
    name: "Husni",
    password: "1234",
    batch: 22,
    events: [],
    chats: [],
    clubs: []
  },
  {
    name: "Irdina",
    password: "1234",
    batch: 22,
    events: [],
    chats: [],
    clubs: []
  }
]

export function updateStudent(updated:Student){
    students = students.map(s=>
        s.name === updated.name ? updated : s
    )
}