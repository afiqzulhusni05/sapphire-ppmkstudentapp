import React, { useState } from 'react'
import { Calendar, Users, MessageCircle, ShoppingBag, Home, Bell } from 'lucide-react'
import EventCalendar from './components/EventCalendar'
import ClubDirectory from './components/ClubDirectory'
import CommunicationHub from './components/CommunicationHub'
import Marketplace from './components/Marketplace'
import PPMKCentral from './components/PPMKCentral'
import JoinedClubs from './components/JoinedClubs.tsx'
import {Club,JoinedClub, Event,Student} from './components/types.ts'
import Login from './components/login.tsx'
import { students, updateStudent} from './components/ppmkdb.ts'

function App() {
  const[currentUser, setCurrentUser]=useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState('calendar')
  const [notifications, setNotifications] = useState(3)
  const tabs = [
    { id: 'calendar', label: 'Events', icon: Calendar, component: EventCalendar },
    { id: 'clubs', label: 'Clubs', icon: Users, component: ClubDirectory },
    { id: 'chat', label: 'Chat', icon: MessageCircle, component: CommunicationHub },
    { id: 'marketplace', label: 'Shop', icon: ShoppingBag, component: Marketplace },
    { id: 'central', label: 'PPMK', icon: Home, component: PPMKCentral },
  ]
  const[joinedClubs, setJoinedClubs] = useState<JoinedClub[]>([
    {name:'MKBA', nextMeeting:'2025-08-20', attending:false},
    {name:'Kasuma Spring', nextMeeting: '2023-08-22', attending:false},
  ])
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'MKBA',
      club: 'MKBA',
      description: 'MKBA is a student-led organization focused on badminton.',
      category: 'club',
      attendees: 120,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'MKBA'),
      location: 'Business Block, Room 101',
      date: '2025-08-20',
      time: '17:00',
    },
    {
      id: '2',
      title: 'Kasuma Spring',
      club: 'PPMK',
      description: 'A fun and inclusive club for sports, games, and outdoor activities.',
      category: 'ppmk',
      attendees: 80,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'Kasuma Spring'),
      location: 'Sports Complex',
      date: '2025-08-22',
      time: '10:00',
    },
    {
      id: '3',
      title: 'MSRC',
      club: 'MSRC',
      description: 'MSRC is a student-led club focused on recreational activities.',
      category: 'club',
      attendees: 20,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'MSRC'),
      location: 'Recreation Center',
      date: '2025-09-15',
      time: '15:00',
    },
    {
      id: '4',
      title: 'MSDC',
      club: 'MSDC',
      description: 'MSDC is a club for dancing enthusiasts, promoting both modern and traditional Malaysian dance styles.',
      category: 'club',
      attendees: 50,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'MSDC'),
      location: 'Cultural Hall',
      date: '2025-10-05',
      time: '18:00',
    }
  ])

  const handleLogin = (name: string, password: string) => {
    const found = students.find(
      s => s.name.toLowerCase() === name.toLowerCase() && s.password === password
    )
  
    if (found) {
      setCurrentUser({...found})
    } else {
      alert("Invalid credentials!")
    }
  }
  if (!currentUser){
    return <Login onLogin={handleLogin}/>
  }
  
  console.log("✅ Logged in user:", currentUser)
  
/*
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'calendar':
        return <EventCalendar events={calendarEvents} />
      case 'clubs':
        return <ClubDirectory clubs={clubs} />
      case 'chat':
        return <CommunicationHub />
      case 'marketplace':
        return <Marketplace />
      case 'central':
        return <PPMKCentral />
      default:
        return <EventCalendar events={calendarEvents} />
    }
  }
*/
  
//const [calendarEvents, setCalendarEvents] = useState<Event[]>([])
const handleJoinEvent = (eventId:string)=>{
  setCurrentUser(prev=>
    prev ? {
      ...prev,
      events:prev.events.map(e=>
        e.id===eventId ? {...e,isJoined: !e.isJoined} : e
      )
    }:null
  )
}
const handleVoteYes = (clubName: string) => {
  if (!currentUser) return

  const updatedClubs = currentUser.clubs.map(club =>
    club.name === clubName ? { ...club, attending: true } : club
  )

  const newEvent:Event = {
    id: `club-meeting-${clubName}`,
    title: `${clubName} Meeting`,
    description: `${clubName} scheduled meeting`,
    category: 'club',
    attendees: 1,
    image: 'https://via.placeholder.com/400',
    isJoined: true,
    location: 'TBA',
    date: currentUser.clubs.find(c => c.name === clubName)?.nextMeeting || '',
    time: '10:00',
    club: clubName,
  }

  const updatedUser = {
    ...currentUser,
    clubs: updatedClubs,
    events: [...currentUser.events, newEvent],
  }

  setCurrentUser(updatedUser)   // ✅ update local state
  updateStudent(updatedUser)    // ✅ update "database"
}

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, {currentUser.name} (Batch{currentUser?.batch}) </h1>
                <p className="text-sm text-gray-500">PPMK active members</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors" />
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calendar' && (
          <>
          <EventCalendar events={events} onJoinEvent={handleJoinEvent}/>
          <JoinedClubs clubs={joinedClubs} onVote={handleVoteYes} />
          </>
        )}
        {activeTab === 'clubs' && (
          <ClubDirectory 
            allclubs={events.map(event => ({
              id: event.id,
              name: event.title,
              description: event.description,
              category: event.category,
              members: event.attendees,
              image: event.image,
              location: event.location,
              meetingTime: `${event.date} ${event.time}`,
              isJoined: joinedClubs.some(jc => jc.name === event.club),
              rating: 0, // Default rating value
              president: 'TBA', // Placeholder
              contact: 'TBA', // Placeholder
              activities: ['Activity 1', 'Activity 2'], // Placeholder
            }))}
            joinedClubs={joinedClubs}
          />
        )}
        {activeTab === 'chat' && <CommunicationHub />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'central' && <PPMKCentral />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}

export default App
