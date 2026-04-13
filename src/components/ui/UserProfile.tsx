import { FC } from 'react'
import { useAuth } from '../../hooks'
import type { Language } from '../../types/common'
import { i18n } from '../../lang'

interface UserProfileProps {
  lang: Language
}

const UserProfile: FC<UserProfileProps> = ({ lang }) => {
  const { user, logout, isAuthenticated } = useAuth()
  const t = i18n[lang]

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow">
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div className="flex-1">
        <p className="font-medium text-gray-900">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={logout}
        className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
      >
        {t.logout}
      </button>
    </div>
  )
}

export default UserProfile
