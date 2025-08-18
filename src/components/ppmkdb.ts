import { Student, Club } from "../components/types";

export const ppmkClubs: Club[] = [
  {
    id: "club1",
    name: "MKBA",
    description: "A student-led organization focused on badminton and teamwork.",
    category: "Sports",
    rating: 4.7,
    members: 120,
    location: "Business Block, Room 101",
    meetingTime: "Every Wednesday, 5:00 PM",
    image: "https://via.placeholder.com/400",
    president: "Amir",
    contact: "amir@example.com",
    activities: ["Weekly matches", "Training sessions", "Inter-varsity tournaments"],
    isJoined: false, // will be overridden by student data
  },
  {
    id: "club2",
    name: "PPMK",
    description: "A student-led organization focused on cultural and academic activities.",
    category: "Cultural",
    rating: 4.5,
    members: 80,
    location: "Cultural Center, Room 202",
    meetingTime: "Every Friday, 3:00 PM",
    image: "https://via.placeholder.com/400",
    president: "Alyaa",
    contact: "alyaa@example.com",
    activities: ["Workshops", "Cultural events", "Community service"],
    isJoined: false, // will be overridden by student data
  },
  {
    id: "club3",
    name: "Recreation Club",
    description: "A club for recreational activities and socializing.",
    category: "Recreation",
    rating: 4.2,
    members: 50,
    location: "Recreation Hall, Room 303",
    meetingTime: "Every Saturday, 4:00 PM",
    image: "https://via.placeholder.com/400",
    president: "Husni",
    contact: "husni@example.com",
    activities: ["Game nights", "Outdoor trips", "Movie screenings"],
    isJoined: false, // will be overridden by student data
  },
];

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
      },
    ],
    chats: ["Hey guys, practice tomorrow at 5pm!"],
    clubs: [{ name: "MKBA", nextMeeting: "2025-08-20", attending: false }],
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
      },
    ],
    chats: ["Reminder: bring your notes"],
    clubs: [{ name: "Recreation Club", nextMeeting: "2025-08-22", attending: false }],
  },
  {
    name: "Husni",
    password: "1234",
    batch: 22,
    events: [],
    chats: [],
    clubs: [],
  },
  {
    name: "Irdina",
    password: "1234",
    batch: 22,
    events: [],
    chats: [],
    clubs: [],
  },
];

export function updateStudent(updated: Student) {
  students = students.map((s) => (s.name === updated.name ? updated : s));
}