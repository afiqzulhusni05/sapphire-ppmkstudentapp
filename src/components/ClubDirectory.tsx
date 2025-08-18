import React, { useState } from 'react'
import { Users, Search, Star, MapPin, Calendar, UserPlus, ExternalLink } from 'lucide-react'
import {Club, JoinedClub} from './types'

/*
interface Club {
  id: string
  name: string
  description: string
  category: string
  members: number
  image: string
  isJoined: boolean
  rating: number
  location: string
  meetingTime: string
  activities: string[]
  president: string
  contact: string
}
*/

interface Props{
  allclubs:Club[];
  joinedClubs: JoinedClub[];
}

const ClubDirectory: React.FC<Props> = ({allclubs, joinedClubs}) => {
  const [filter, setFilter] = useState<"active"|"joined"|"categories"|"all">("all");
  const joinedClubNames = new Set(joinedClubs.map(c=>c.name));
  /*
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedClub, setSelectedClub] = useState<Club | null>(null)
  */
  /*const clubs: Club[] = [
    {
      id: '1',
      name: 'Computer Science Club',
      description: 'Explore the world of technology, programming, and innovation. Join us for coding competitions, tech talks, and hackathons.',
      category: 'Technology',
      members: 156,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400',
      isJoined: true,
      rating: 4.8,
      location: 'Engineering Building, Room 201',
      meetingTime: 'Fridays, 3:00 PM',
      activities: ['Coding Competitions', 'Tech Talks', 'Hackathons', 'Project Collaborations'],
      president: 'Sarah Chen',
      contact: 'cs.club@university.edu'
    },
    {
      id: '2',
      name: 'Cultural Society',
      description: 'Celebrate diversity through music, dance, and cultural events. Experience traditions from around the world.',
      category: 'Arts & Culture',
      members: 203,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      isJoined: false,
      rating: 4.6,
      location: 'Student Center, Hall B',
      meetingTime: 'Wednesdays, 6:00 PM',
      activities: ['Cultural Performances', 'International Food Festival', 'Language Exchange', 'Art Exhibitions'],
      president: 'Raj Patel',
      contact: 'cultural@university.edu'
    },
    {
      id: '3',
      name: 'Entrepreneurship Club',
      description: 'Turn your ideas into reality. Network with like-minded individuals and learn from successful entrepreneurs.',
      category: 'Business',
      members: 89,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
      isJoined: false,
      rating: 4.7,
      location: 'Business Center, Room 305',
      meetingTime: 'Tuesdays, 4:30 PM',
      activities: ['Startup Pitches', 'Mentorship Programs', 'Business Plan Competitions', 'Networking Events'],
      president: 'Michael Johnson',
      contact: 'entrepreneur@university.edu'
    },
    {
      id: '4',
      name: 'Environmental Action Group',
      description: 'Make a positive impact on our planet. Join sustainability initiatives and environmental awareness campaigns.',
      category: 'Environment',
      members: 134,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
      isJoined: true,
      rating: 4.9,
      location: 'Science Building, Room 102',
      meetingTime: 'Thursdays, 5:00 PM',
      activities: ['Campus Clean-up', 'Recycling Drives', 'Sustainability Workshops', 'Tree Planting'],
      president: 'Emma Rodriguez',
      contact: 'environment@university.edu'
    },
    {
      id: '5',
      name: 'Photography Club',
      description: 'Capture moments and express creativity through the lens. Learn techniques and showcase your work.',
      category: 'Arts & Culture',
      members: 78,
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
      isJoined: false,
      rating: 4.5,
      location: 'Art Building, Studio 3',
      meetingTime: 'Saturdays, 2:00 PM',
      activities: ['Photo Walks', 'Workshops', 'Exhibitions', 'Photo Contests'],
      president: 'David Kim',
      contact: 'photo@university.edu'
    },
    {
      id: '6',
      name: 'Debate Society',
      description: 'Sharpen your public speaking and critical thinking skills through structured debates and discussions.',
      category: 'Academic',
      members: 67,
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400',
      isJoined: false,
      rating: 4.4,
      location: 'Liberal Arts Building, Room 205',
      meetingTime: 'Mondays, 7:00 PM',
      activities: ['Weekly Debates', 'Public Speaking Workshops', 'Inter-university Competitions', 'Mock Trials'],
      president: 'Lisa Wang',
      contact: 'debate@university.edu'
    }
]*/
  let filteredClubs: Club[] = allclubs;

  if(filter == "active"){
    filteredClubs = allclubs.filter(c=>c.members>50);
  }else if(filter === "joined"){
    filteredClubs = allclubs.filter(c=>joinedClubNames.has(c.name));
  }else if(filter === "categories"){
    filteredClubs = allclubs;
  }
  /*
  const categories = ['all', ...Array.from(new Set(clubs.map(club => club.category)))]

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  */
  const handleJoinClub = (clubId: string) => {
    console.log(`Joining club ${clubId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Club Directory</h2>
          <p className="text-gray-600">Discover and join student organizations</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{allclubs.length}</p>
              <p className="text-gray-600">Active Clubs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{joinedClubs.length}</p>
              <p className="text-gray-600">Joined Clubs</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Club Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div key={club.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                  {club.category}
                </span>
              </div>
              {club.isJoined && (
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Joined
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{club.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{club.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{club.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{club.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{club.meetingTime}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleJoinClub(club.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    club.isJoined
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {club.isJoined ? 'Joined' : 'Join Club'}
                </button>
                <button
                  onClick={() => setSelectedClub(club)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Club Detail Modal */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedClub.image}
                alt={selectedClub.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => setSelectedClub(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedClub.name}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedClub.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{selectedClub.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedClub.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Club Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedClub.members} members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedClub.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedClub.meetingTime}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Leadership</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>President:</strong> {selectedClub.president}</p>
                    <p><strong>Contact:</strong> {selectedClub.contact}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClub.activities.map((activity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => handleJoinClub(selectedClub.id)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedClub.isJoined
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {selectedClub.isJoined ? 'Already Joined ✓' : 'Join This Club'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClubDirectory
