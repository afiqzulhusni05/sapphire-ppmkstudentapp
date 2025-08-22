import React, { useState } from 'react'
import { Calendar, Users, MessageCircle, ShoppingBag, Home, Bell, X } from 'lucide-react'
import EventCalendar from './components/EventCalendar'
import ClubDirectory from './components/ClubDirectory'
import CommunicationHub from './components/CommunicationHub'
import Marketplace from './components/Marketplace'
import PPMKCentral from './components/PPMKCentral'
import JoinedClubs from './components/JoinedClubs.tsx'
import { Club, JoinedClub, Event, Student } from './components/types.ts'
import Login from './components/login.tsx'
import { getUserNotifications, students, updateStudent } from './components/ppmkdb.ts'
import ThemeToggle from "./components/ThemeToggle"
import ChatBox from "./components/ChatBox"

function App() {
  const [currentUser, setCurrentUser] = useState<Student | null>(null)
  const [activeTab, setActiveTab] = useState('calendar')
  const [showNotifications, setShowNotifications] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)   // 🔹 state toggle ChatBox

  const tabs = [
    { id: 'calendar', label: 'Events', icon: Calendar, component: EventCalendar },
    { id: 'clubs', label: 'Clubs', icon: Users, component: ClubDirectory },
    { id: 'chat', label: 'Chat', icon: MessageCircle, component: CommunicationHub },
    { id: 'marketplace', label: 'Shop', icon: ShoppingBag, component: Marketplace },
    { id: 'central', label: 'PPMK', icon: Home, component: PPMKCentral },
  ]

  const [joinedClubs, setJoinedClubs] = useState<JoinedClub[]>([
    { name: 'MKBA', nextMeeting: '2025-08-20', attending: false },
    { name: 'Kasuma Spring', nextMeeting: '2023-08-22', attending: false },
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'MKBA',
      club: 'MKBA',
      description: 'MKBA is a student-led organization focused on badminton.',
      category: 'club',
      attendees: 120,
      image: 'https://raw.githubusercontent.com/afiqzulhusni05/sapphire-ppmkstudentapp/refs/heads/main/public/images/mkba.jpeg',
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
      image: 'https://raw.githubusercontent.com/afiqzulhusni05/sapphire-ppmkstudentapp/refs/heads/main/public/images/msrc.jpeg',
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
      image: 'https://raw.githubusercontent.com/afiqzulhusni05/sapphire-ppmkstudentapp/refs/heads/main/public/images/msdc.jpeg',
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
      setCurrentUser({ ...found })
    } else {
      alert("Invalid credentials!")
    }
  }

  const handleJoinEvent = (eventId: string) => {
    setCurrentUser(prev =>
      prev ? {
        ...prev,
        events: prev.events.map(e =>
          e.id === eventId ? { ...e, isJoined: !e.isJoined } : e
        ),
      } : null
    )
  }

  const handleVoteYes = (clubName: string) => {
    if (!currentUser) return

    const updatedClubs = currentUser.clubs.map(club =>
      club.name === clubName ? { ...club, attending: true } : club
    )

    const newEvent: Event = {
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

    setCurrentUser(updatedUser)
    updateStudent(updatedUser)
  }

  const userNotifications = getUserNotifications(currentUser)

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Welcome */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Welcome, {currentUser.name} (Batch {currentUser?.batch})</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">PPMK active member</p>
              </div>
            </div>

            {/* Right Side: Notifications + Theme + Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-600 cursor-pointer transition-colors" />
                  {userNotifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {userNotifications.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-700 font-semibold">
                      Notifications
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {userNotifications.map(n => (
                        <li key={n.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <p className="font-medium">{n.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{n.message}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.date}</p>
                        </li>
                      ))}
                    </ul>
                    {userNotifications.length === 0 && (
                      <div className="p-3 text-gray-500 dark:text-gray-400 text-sm text-center">No new notifications</div>
                    )}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Profile Placeholder */}
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calendar' && (
          <>
            <EventCalendar events={events} onJoinEvent={handleJoinEvent} />
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
              rating: 0,
              president: 'TBA',
              contact: 'TBA',
              activities: ['Activity 1', 'Activity 2'],
            }))}
            joinedClubs={joinedClubs}
          />
        )}
        {activeTab === 'chat' && <CommunicationHub currentUser={currentUser} />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'central' && <PPMKCentral />}
      </main>

      {/* Floating ChatBox Toggle */}
      <div className="fixed bottom-24 right-6 z-50">
        {showChat ? (
          <div className="relative">
            <ChatBox />
            <button
              onClick={() => setShowChat(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowChat(true)}
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
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
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`} />
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Bottom padding for fixed nav */}
      <div className="h-20"></div>
    </div>
  )
}

export default App
