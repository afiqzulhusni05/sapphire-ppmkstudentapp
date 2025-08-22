import { Student, Club, Message } from "../components/types";

export const ppmkAnnouncements = [
  {
    id: "ppmk1",
    title: "Kasuma Spring Event",
    message: "Dont miss Kasuma Spring this weekend!",
    date: "2023-08-15",
  },
  {
    id: "ppmk2",
    title: "Kasuma Spring Event",
    message: "Dont miss Kasuma Spring this weekend!",
    date: "2023-08-15",
  },
];

export const ppmkClubs: Club[] = [
  {
    id: "3",
    name: "MKBA",
    description: "A student-led organization focused on badminton and teamwork.",
    category: "Sports",
    rating: 4.7,
    members: 120,
    location: "Business Block, Room 101",
    meetingTime: "Every Wednesday, 5:00 PM",
    image: "public/images/mkba.jpeg",
    president: "Amir",
    contact: "amir@example.com",
    activities: ["Weekly matches", "Training sessions", "Inter-varsity tournaments"],
    isJoined: false,
    messages:[],
  },
  {
    id: "2",
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
    isJoined: false,
    messages:[]
  },
  {
    id: "5",
    name: "Recreation Club",
    description: "A club for recreational activities and socializing.",
    category: "Recreation",
    rating: 4.2,
    members: 50,
    location: "Recreation Hall, Room 303",
    meetingTime: "Every Saturday, 4:00 PM",
    image: "public/images/msrc.jpeg",
    president: "Husni",
    contact: "husni@example.com",
    activities: ["Game nights", "Outdoor trips", "Movie screenings"],
    isJoined: false,
    messages:[]
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
        image: "https://imgur.com/a/3wbwDN7",
        isJoined: true,
        location: "Court A",
        date: "2025-08-20",
        time: "17:00",
      },
    ],
    chats: {},
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
    chats: {},
    clubs: [{ name: "Recreation Club", nextMeeting: "2025-08-22", attending: false }],
  },
  {
    name: "Husni",
    password: "1234",
    batch: 22,
    events: [],
    chats: {},
    clubs: [],
  },
  {
    name: "Irdina",
    password: "1234",
    batch: 22,
    events: [],
    chats: {},
    clubs: [],
  },
];

export function updateStudent(updated: Student) {
  students = students.map((s) => (s.name === updated.name ? updated : s));
}

export function getUserNotifications(currentUser: Student | null) {
  return [
    ...ppmkAnnouncements,
    ...(currentUser?.clubs.map((club) => ({
      id: `notif-${club.name}`,
      title: `${club.name} Meeting`,
      message: `Upcoming meeting on ${club.nextMeeting}`,
      date: club.nextMeeting,
    })) || []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* ====== CHATBOT STATIC DATA ====== */
export const ppmkFaq: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["announcement", "announcements", "news"],
    answer: "You can find the latest announcements in the Announcements section.",
  },
  {
    keywords: ["document", "documents", "file"],
    answer: "Official documents are available in the Documents tab.",
  },
  {
    keywords: ["poll", "polls", "survey"],
    answer: "Active polls and surveys are listed under the Polls & Surveys section.",
  },
  {
    keywords: ["hackppmk25", "hackathon", "competition"],
    answer: "HackPPMK25 is ongoing! Submission closes on August 23, 2025.",
  },
  {
    keywords: ["team mad", "recruitment", "mad"],
    answer: "Team MAD recruitment is closed as of August 16, 2025.",
  },
  {
    keywords: ["semester", "fall semester", "class"],
    answer:
      "Fall semester 2025 begins on September 2nd. Make sure prerequisites are met and fees are paid.",
  },
  {
    keywords: ["maintenance", "library", "closed"],
    answer:
      "The main library will be closed July 20-22 for maintenance. Student center is the alternative space.",
  },
  {
    keywords: ["scholarship", "financial aid", "bursary"],
    answer: "Merit-based scholarships are open now. Deadline: September 1, 2025.",
  },
  {
    keywords: ["health", "counseling", "mental"],
    answer:
      "New mental health counseling services are available. Book via the student portal or visit the health center.",
  },
];

export const ppmkSuggestions = [
  "When does the semester start?",
  "Tell me about HackPPMK25",
  "Any scholarships available?",
  "Where to find announcements?",
  "What about student health services?",
];

export interface ChatRoom{
  id:string
  name:string
  type:"batch"|"university"|"club"
  members:number
  lastMessage:string
  lastMessageTime:string
  unreadCount:number
}

export const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Kodae Manse',
    type: 'university',
    members: 238,
    lastMessage: 'AUTUMN 2025 TUITION FEE PAYMENT',
    lastMessageTime: '2 min ago',
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'PPMK Announcements',
    type: 'university',
    members: 1250,
    lastMessage: 'New semester registration opens tomorrow',
    lastMessageTime: '1 hour ago',
    unreadCount: 1,
  },
  {
    id: '3',
    name: 'MKBA',
    type: 'club',
    members: 78,
    lastMessage: 'Great shots from yesterday\'s event!',
    lastMessageTime: '3 hours ago',
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Batch 22',
    type: 'batch',
    members: 140,
    lastMessage: 'Study group meeting at 3 PM',
    lastMessageTime: '5 hours ago',
    unreadCount: 2,
  },
  {
    id: '5',
    name: 'MSDC',
    type: 'club',
    members: 203,
    lastMessage: 'Rehearsal schedule updated',
    lastMessageTime: '1 day ago',
    unreadCount: 0,
  }
]

export let chatRoomsMessages: Record<string, Message[]> = {
  "1": [
    { id: "m1", sender: "Admin", content: "Welcome to Kodae Manse!", timestamp: "09:00"}
  ],
  "2": [],
  "3": [],
  "4": [],
  "5": []
}

export function addMessage(roomId: string, message: Message) {
  chatRoomsMessages[roomId] = [...(chatRoomsMessages[roomId] || []), message]
}