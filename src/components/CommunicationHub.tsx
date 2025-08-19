import React, { useState } from 'react'
import { updateStudent } from './ppmkdb'
import { MessageCircle, Send, Users, Hash, Plus, Search, Phone, Video, MoreVertical } from 'lucide-react'

interface ChatRoom {
  id: string
  name: string
  type: 'batch' | 'university' | 'club'
  members: number
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  avatar: string
}

export interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  avatar: string
}

const CommunicationHub = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const chatRooms: ChatRoom[] = [
    {
      id: '1',
      name: 'Kodae Manse',
      type: 'university',
      members: 238,
      lastMessage: 'AUTUMN 2025 TUITION FEE PAYMENT',
      lastMessageTime: '2 min ago',
      unreadCount: 3,
      avatar: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100'
    },
    {
      id: '2',
      name: 'PPMK Announcements',
      type: 'university',
      members: 1250,
      lastMessage: 'New semester registration opens tomorrow',
      lastMessageTime: '1 hour ago',
      unreadCount: 1,
      avatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100'
    },
    {
      id: '3',
      name: 'MKBA',
      type: 'club',
      members: 78,
      lastMessage: 'Great shots from yesterday\'s event!',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100'
    },
    {
      id: '4',
      name: 'Batch 22',
      type: 'batch',
      members: 140,
      lastMessage: 'Study group meeting at 3 PM',
      lastMessageTime: '5 hours ago',
      unreadCount: 2,
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100'
    },
    {
      id: '5',
      name: 'MSDC',
      type: 'club',
      members: 203,
      lastMessage: 'Rehearsal schedule updated',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100'
    }
  ]

  const [roomMessages, setRoomMessages] = useState<Record<string, Message[]>>({
    '1':[],
    '2':[],
    '3':[],
    '4':[],
    '5':[],
  })

  const messages = roomMessages[selectedRoom] || []
    
  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom)
  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRoom){
      const newMsg : Message = {
        id:Date.now().toString(),
        sender:"You",
        content:newMessage,
        timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
        avatar:"https://via.placeholder.com/40",
      }

      setRoomMessages(prev=>({
        ...prev,
        [selectedRoom]:[...(prev[selectedRoom]||[]), newMsg]
      }))
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'batch': return 'bg-blue-100 text-blue-800'
      case 'university': return 'bg-purple-100 text-purple-800'
      case 'club': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'batch': return <Users className="w-4 h-4" />
      case 'university': return <Hash className="w-4 h-4" />
      case 'club': return <MessageCircle className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Hub</h2>
          <p className="text-gray-600">Connect with classmates and university community</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-full">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedRoom === room.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={room.avatar}
                      alt={room.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {room.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{room.name}</h3>
                      <span className="text-xs text-gray-500">{room.lastMessageTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                      <div className="flex items-center space-x-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(room.type)}`}>
                          {getRoomTypeIcon(room.type)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-1">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{room.members} members</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          {selectedRoomData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedRoomData.avatar}
                    alt={selectedRoomData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedRoomData.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoomTypeColor(selectedRoomData.type)}`}>
                        {selectedRoomData.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{selectedRoomData.members} members</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                        <p className="text-gray-800">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat to start messaging</h3>
                <p className="text-gray-500">Choose from your existing conversations or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{chatRooms.filter(r => r.type === 'batch').length}</p>
              <p className="text-gray-600">Batch Groups</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{chatRooms.filter(r => r.type === 'university').length}</p>
              <p className="text-gray-600">University Channels</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{chatRooms.filter(r => r.type === 'club').length}</p>
              <p className="text-gray-600">Club Chats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunicationHub
