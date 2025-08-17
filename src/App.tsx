import React, { useState } from 'react'
import { Calendar, Users, MessageCircle, ShoppingBag, Home, Bell } from 'lucide-react'
import EventCalendar from './components/EventCalendar'
import ClubDirectory from './components/ClubDirectory'
import CommunicationHub from './components/CommunicationHub'
import Marketplace from './components/Marketplace'
import PPMKCentral from './components/PPMKCentral'
import JoinedClubs from './components/JoinedClubs.tsx'
import {Club,JoinedClub, Event} from './components/types.ts'
import Login from './components/login.tsx'

function App() {
  const [user, setUser] = useState<{ name: string } | null>(null)
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
    {name:'Recreation Club', nextMeeting: '2023-08-22', attending:false},
  ])
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'MKBA',
      club:'MKBA',
      description: 'MKBA is a student-led organization focused on badminton.',
      category: 'club',
      attendees: 120,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'MKBA'),
      location: 'Business Block, Room 101',
      date:'2025-08-20',
      time:'17:00',
    },
    {
      id: '2',
      title: 'Kasuma Spring',
      club:'PPMK',
      description: 'A fun and inclusive club for sports, games, and outdoor activities.',
      category: 'ppmk',
      attendees: 80,
      image: 'https://via.placeholder.com/400',
      isJoined: joinedClubs.some(jc => jc.name === 'Recreation Club'),
      location: 'Sports Complex',
      date:'2025-08-22',
      time: '10:00',
    }
  ])

  const handleLogin = (name: string, password: string) => {
    // ✅ Simple hardcoded check
    if (password === '1234') {
      setUser({ name })
    } else {
      alert('Wrong password!')
    }
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }
  
  console.log("✅ Logged in user:", user)
  
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
  setEvents(prev=>
    prev.map(e=>
      e.id===eventId ? {...e,isJoined: !e.isJoined} : e
    )
  )
}
const handleVoteYes = (clubName: string) => {
  setJoinedClubs(prev =>
    prev.map(club =>
      club.name === clubName ? { ...club, attending: true } : club
    )
  )

  const club = joinedClubs.find(c => c.name === clubName)
  if (club) {
    setEvents(prev => {
      const existing = prev.find(e => e.title === `${club.name} Meeting`)
      if (existing){
        return prev.map(e=>
          e.id === existing.id ? {...e, attendees: e.attendees +1} : e
        )
      }

      return[
        ...prev,
        {
          id: `club-meeting-${club.name}`,
          title: `${club.name} Meeting`,
          description: `${club.name} scheduled meeting`,
          category: 'club',
          attendees: 0,
          image: 'https://via.placeholder.com/400',
          isJoined: true,
          location: 'TBA',
          date: club.nextMeeting,
          time: '10.00', // we can reuse nextMeeting as "time/date" string
          club:club.name,
        }
      ]
    })
  }
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
                <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name} </h1>
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
          <EventCalendar events={events} onJoinEvent={handleJoinEvent}/>
        )}
        {activeTab === 'clubs' && (
          <ClubDirectory clubs={[]} />
        )}
        {activeTab === 'chat' && <CommunicationHub />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'central' && <PPMKCentral />}
        <JoinedClubs clubs={joinedClubs} onVote={handleVoteYes} />
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
