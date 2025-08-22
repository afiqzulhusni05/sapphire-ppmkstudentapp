import React, { useState, useEffect } from 'react'
import { Message, Student } from './types'
import { MessageCircle, Send, Users, Hash, Plus, Search, Phone, Video, MoreVertical } from 'lucide-react'
import { chatRooms, chatRoomsMessages, addMessage} from './ppmkdb'

interface CommunicationHubProps{
  currentUser:Student
}

const CommunicationHub:React.FC<CommunicationHubProps> = ({currentUser}) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const[messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const[searchTerm, setSearchTerm] = useState("")

  useEffect(()=>{
    if(selectedRoom){
      setMessages(chatRoomsMessages[selectedRoom]||[])
    }
  },[selectedRoom,chatRoomsMessages])

  const filteredRooms = chatRooms.filter(room =>{
    if (room.type==="club"){
      return currentUser.clubs.some(club=>club.name===room.name)
    }
    if (room.type === "batch"){
      return currentUser.batch === 22 && room.name.includes("Batch 22")
    }
    if (room.type === "university"){
      return true
    }
    return false
  })

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom)


  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRoom){
      const newMsg : Message = {
        id:Date.now().toString(),
        sender:"You",
        content:newMessage,
        timestamp:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
      }
      addMessage(selectedRoom, newMsg)
      setMessages(prev=>[...prev,newMsg])
      setNewMessage('')
    }
  }

  /*
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
  */

  return (
    <div className="space-y-6">
      {/* Header*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Hub</h2>
          <p className="text-gray-600">Connect with the ppmk community</p>
        </div>
        
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
          {filteredRooms.map((room)=>(
            <div
              key={room.id}
              onClick={()=>setSelectedRoom(room.id)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedRoom === room.id ? "bg-gray-200" : ""}`}
            >
              <h3 className="font-medium">{room.name}</h3>
              <p className="text-sm text-gray-500 truncate">{room.lastMessage}</p>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedRoomData ? (
            <>
              <div className="p-4 border-b border-gray-300 bg-white shadow-sm">
                <h2 className="font-semibold">{selectedRoomData.name}</h2>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${
                    message.sender === currentUser.name ? "justify-end" : "justify-start"
                  }`}
                  >
                    <div className={`p-2 rounded-lg ${message.sender === currentUser.name ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                      <p>{message.content}</p>
                      <span className="text-xs">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-300 bg-white flex space-x-2">
                  <input
                    className="flex-1 border rounded-lg px-3 py-2"
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
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
