import React, { useState } from 'react'
import { Home, Bell, FileText, BarChart3, Download, Calendar, Users, MessageSquare, ChevronRight, AlertCircle, CheckCircle, Info } from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success'
  date: string
  author: string
  isRead: boolean
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  category: string
}

interface Poll {
  id: string
  question: string
  options: { id: string; text: string; votes: number }[]
  totalVotes: number
  endDate: string
  hasVoted: boolean
  userVote?: string
}

const PPMKCentral = () => {
  const [activeTab, setActiveTab] = useState('announcements')
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null)

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Ongoing Event: HackPPMK25',
      content: 'HackPPMK25 is ongoing, submission closes on August 23rd.',
      type: 'info',
      date: '2025-08-17',
      author: 'Academic and Career Bureau',
      isRead: false
    },
    {
      id: '2',
      title: 'Team MAD Recruitment CLOSED',
      content: 'Application for Team MAD closed yesterday. Thank you to all aplicants.',
      type: 'info',
      date: '2025-08-16',
      author: 'Communication and Special Task Bureau',
      isRead: false
    },
    {
      id: '3',
      title: 'New Semester Begins',
      content: 'Fall semester 2025 will begin on September 2nd. Please ensure all prerequisites are met and fees are paid before registration.',
      type: 'info',
      date: '2025-08-01',
      author: 'Academic and Career Bureau',
      isRead: false
    },
    {
      id: '3',
      title: 'Campus Maintenance Notice',
      content: 'The main library will be closed for maintenance from July 20-22. Alternative study spaces will be available in the student center.',
      type: 'warning',
      date: '2025-06-23',
      author: 'Facilities Management',
      isRead: true
    },
    {
      id: '4',
      title: 'Scholarship Applications Now Open',
      content: 'Merit-based scholarships for the next academic year are now accepting applications. Deadline is September 1st, 2025.',
      type: 'success',
      date: '2025-06-25',
      author: 'Financial Aid Office',
      isRead: false
    },
    {
      id: '5',
      title: 'Student Health Services Update',
      content: 'New mental health counseling services are now available. Schedule appointments through the student portal or visit the health center.',
      type: 'info',
      date: '2025-01-03',
      author: 'Student Health Services',
      isRead: true
    }
  ]

  const documents: Document[] = [
    {
      id: '1',
      name: 'Borang Kebenaran ke Luar Negara BKLN JPA',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-01-01',
      category: 'Guidelines'
    },
    {
      id: '2',
      name: 'Borang Tuntutan',
      type: 'PDF',
      size: '156 KB',
      uploadDate: '2025-01-10',
      category: 'Forms'
    },
    {
      id: '3',
      name: 'Keahlian PPMK',
      type: 'PDF',
      size: '890 KB',
      uploadDate: '2025-01-01',
      category: 'Academic'
    },
    {
      id: '4',
      name: 'Perumahan',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: '2025-01-05',
      category: 'Financial Aid'
    },
    {
      id: '5',
      name: 'Tabung Khas',
      type: 'PDF',
      size: '678 KB',
      uploadDate: '2025-01-01',
      category: 'Safety'
    },
    {
      id: '6',
      name: 'Keahlian PPMK',
      type: 'PDF',
      size: '500 KB',
      uploadDate: '2025-01-01',
      category: 'Safety'
    }
  ]

  const polls: Poll[] = [
    {
      id: '1',
      question: 'What time should the library extend its hours during finals week?',
      options: [
        { id: 'a', text: 'Until 2 AM', votes: 145 },
        { id: 'b', text: '24/7', votes: 203 },
        { id: 'c', text: 'Until midnight', votes: 89 },
        { id: 'd', text: 'Current hours are fine', votes: 34 }
      ],
      totalVotes: 471,
      endDate: '2024-01-25',
      hasVoted: false
    },
    {
      id: '2',
      question: 'Which new food option would you like to see in the cafeteria?',
      options: [
        { id: 'a', text: 'Mediterranean cuisine', votes: 167 },
        { id: 'b', text: 'Vegan/Vegetarian options', votes: 234 },
        { id: 'c', text: 'Asian fusion', votes: 189 },
        { id: 'd', text: 'Local specialties', votes: 98 }
      ],
      totalVotes: 688,
      endDate: '2024-01-30',
      hasVoted: true,
      userVote: 'b'
    },
    {
      id: '3',
      question: 'How satisfied are you with the current campus WiFi speed?',
      options: [
        { id: 'a', text: 'Very satisfied', votes: 78 },
        { id: 'b', text: 'Satisfied', votes: 156 },
        { id: 'c', text: 'Needs improvement', votes: 234 },
        { id: 'd', text: 'Very poor', votes: 89 }
      ],
      totalVotes: 557,
      endDate: '2024-02-05',
      hasVoted: false
    }
  ]

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getAnnouncementBg = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200'
      case 'success': return 'bg-green-50 border-green-200'
      default: return 'bg-blue-50 border-blue-200'
    }
  }

  const handleVote = (pollId: string, optionId: string) => {
    console.log(`Voting for poll ${pollId}, option ${optionId}`)
  }

  const downloadDocument = (docId: string) => {
    console.log(`Downloading document ${docId}`)
  }

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'polls', label: 'Polls & Surveys', icon: BarChart3 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PPMK Central</h2>
          <p className="text-gray-600">Official announcements, documents, and association updates</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {announcements.filter(a => !a.isRead).length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
              <p className="text-gray-600">Announcements</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              <p className="text-gray-600">Documents</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{polls.length}</p>
              <p className="text-gray-600">Active Polls</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'announcements' && (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-4 rounded-lg border ${getAnnouncementBg(announcement.type)} ${
                    !announcement.isRead ? 'ring-2 ring-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getAnnouncementIcon(announcement.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <div className="flex items-center space-x-2">
                          {!announcement.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          <span className="text-sm text-gray-500">
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{announcement.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">by {announcement.author}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Read More <ChevronRight className="w-3 h-3 inline ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">{doc.category}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{doc.type} • {doc.size}</span>
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <button
                      onClick={() => downloadDocument(doc.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'polls' && (
            <div className="space-y-6">
              {polls.map((poll) => (
                <div key={poll.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{poll.question}</h3>
                    <span className="text-sm text-gray-500">
                      Ends: {new Date(poll.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    {poll.options.map((option) => {
                      const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                      const isUserVote = poll.hasVoted && poll.userVote === option.id
                      
                      return (
                        <div key={option.id} className="relative">
                          <button
                            onClick={() => !poll.hasVoted && handleVote(poll.id, option.id)}
                            disabled={poll.hasVoted}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              poll.hasVoted
                                ? isUserVote
                                  ? 'bg-blue-50 border-blue-300'
                                  : 'bg-gray-50 border-gray-200'
                                : 'hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{option.text}</span>
                              <div className="flex items-center space-x-2">
                                {isUserVote && <CheckCircle className="w-4 h-4 text-blue-600" />}
                                <span className="text-sm text-gray-600">
                                  {option.votes} votes ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                            </div>
                            {poll.hasVoted && (
                              <div className="mt-2 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    isUserVote ? 'bg-blue-600' : 'bg-gray-400'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            )}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{poll.totalVotes} total votes</span>
                    {poll.hasVoted ? (
                      <span className="text-green-600 font-medium">✓ You voted</span>
                    ) : (
                      <span>Click an option to vote</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PPMKCentral
