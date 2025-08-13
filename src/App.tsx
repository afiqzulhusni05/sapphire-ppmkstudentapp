import React, { useState } from 'react'
import { Calendar, Users, MessageCircle, ShoppingBag, Home, Bell } from 'lucide-react'
import EventCalendar from './components/EventCalendar'
import ClubDirectory from './components/ClubDirectory'
import CommunicationHub from './components/CommunicationHub'
import Marketplace from './components/Marketplace'
import PPMKCentral from './components/PPMKCentral'

function App() {
  const [activeTab, setActiveTab] = useState('calendar')
  const [notifications, setNotifications] = useState(3)

  const tabs = [
    { id: 'calendar', label: 'Events', icon: Calendar, component: EventCalendar },
    { id: 'clubs', label: 'Clubs', icon: Users, component: ClubDirectory },
    { id: 'chat', label: 'Chat', icon: MessageCircle, component: CommunicationHub },
    { id: 'marketplace', label: 'Shop', icon: ShoppingBag, component: Marketplace },
    { id: 'central', label: 'PPMK', icon: Home, component: PPMKCentral },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || EventCalendar

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
                <h1 className="text-xl font-bold text-gray-900">PPMK Student</h1>
                <p className="text-sm text-gray-500">University Management</p>
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
        <ActiveComponent />
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
