import { Student, Club, Message, ChatRoom } from "../components/types";

export const ppmkAnnouncements = [
  {
    id: "ppmk1",
    title: "Kasuma Spring Event",
    message: "Dont miss Kasuma Spring this weekend!",
    date: "2023-08-15",
  },
];
//All clubs in PPMK
export const ppmkClubs: Club[] = [
  {
    id: "3",
    name: "MKBA",
    description: "A student-led organization focused on badminton and teamwork.",
    category: "Sports",
    members: 120,
    location: "Badminton Court Suwon",
    meetingTime: "Every Wednesday, 5:00 PM",
    image: "/images/mkba.jpeg",
    president: "Amir",
    contact: "amir@example.com",
    activities: ["Weekly matches", "Training sessions", "Inter-varsity tournaments"],
    isJoined: false,
    messages:[],
  },
  {
    id: "2",
    name: "MSDC",
    description: "A student-led organization focused on cultural and academic activities.",
    category: "Cultural",
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
    name: "MSRC",
    description: "A club for recreational activities and socializing.",
    category: "Sports",
    members: 50,
    location: "Recreation Hall, Room 303",
    meetingTime: "Every Saturday, 4:00 PM",
    image: "/images/msrc.jpeg",
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
    clubs:["MKBA"],
    events: [],
    chats: {},
  },
  {
    name: "Alyaa",
    password: "1234",
    batch: 23,
    clubs:["MSDC"],
    events: [],
    chats: {},
  },
  {
    name: "Husni",
    password: "1234",
    batch: 24,
    clubs: ["MSRC"],
    events: [],
    chats: {},
  },
  {
    name: "Irdina",
    password: "1234",
    batch: 21,
    clubs: ["MKBA"],
    events: [],
    chats: {},
  },
];

export function updateStudent(updated: Student) {
  students = students.map((s) => (s.name === updated.name ? updated : s));
}

export function getUserNotifications(currentUser: Student | null) {
  if(!currentUser) return [];

  const clubNotifications = ppmkClubs
    .filter(club=>currentUser.clubs.includes(club.name))
    .map(club=>({
      id:`notif-${club.name}`,
      title: `${club.name} Meeting`,
      message: `Upcoming meeting: ${club.meetingTime} at ${club.location}`,
      date: new Date().toISOString(), // can refine with actual nextMeeting
    }));

  return clubNotifications.sort(
    (a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()
  );
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

export const chatRooms: ChatRoom[] = [
  {id: '1',name: 'PPMK',type: 'university',members: 1250,lastMessage: '',lastMessageTime: '',unreadCount: 3},
  {id: '2',name: 'Batch 21',type: 'batch',members: 150,lastMessage: '',lastMessageTime: '',unreadCount: 1},
  {id: '3',name: 'Batch 22',type: 'batch',members: 160,lastMessage: '',lastMessageTime: '',unreadCount: 0},
  {id: '4',name: 'Batch 23',type: 'batch',members: 140,lastMessage: '',lastMessageTime: '',unreadCount: 2},
  {id: '5',name: 'Batch 24',type: 'batch',members: 100,lastMessage: '',lastMessageTime: '',unreadCount: 0},
  {id: '6',name: 'MKBA' ,type: 'club', members: 50,lastMessage:'',lastMessageTime:'',unreadCount:0},
  {id: '7',name: 'MSDC' ,type: 'club', members: 50,lastMessage:'',lastMessageTime:'',unreadCount:0},
  {id: '8',name: 'MSRC' ,type: 'club', members: 50,lastMessage:'',lastMessageTime:'',unreadCount:0},
]

export let chatRoomsMessages: Record<string, Message[]> = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": []
}

export function addMessage(roomId: string, message: Message) {
  chatRoomsMessages[roomId] = [...(chatRoomsMessages[roomId] || []), message]
}