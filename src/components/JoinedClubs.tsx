import React from 'react'
import {JoinedClub} from './types'

interface Props {
  clubs: JoinedClub[]
  onVote: (clubName: string) => void
}

const JoinedClubs: React.FC<Props> = ({ clubs, onVote }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Your Clubs</h2>
      {clubs.map(club => (
        <div key={club.name} className="bg-white p-4 rounded-lg shadow mb-3">
          <p className="font-medium">{club.name}</p>
          <p className="text-sm text-gray-600">Next meeting: {club.nextMeeting}</p>
          {!club.attending ? (
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => onVote(club.name)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Yes
              </button>
              <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
                No
              </button>
            </div>
          ) : (
            <p className="text-green-600 mt-2">✔️ You're attending</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default JoinedClubs
