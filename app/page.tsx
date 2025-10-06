'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface User {
  id: number
  name: string
  email: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to fetch users')
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array of users')
      }

      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error((error as Error).message)
    }
  }

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure?')) return

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      toast.success('User deleted')
      fetchUsers()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>
      <div className="flex justify-end mb-4">
        <Link
          href="/users/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Add User
        </Link>
      </div>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map(user => (
            <li
              key={user.id}
              className="flex justify-between items-center border rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="space-x-3">
                <Link
                  href={`/users/${user.id}/edit`}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
