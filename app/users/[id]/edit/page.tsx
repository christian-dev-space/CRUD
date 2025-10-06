'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditUser() {
  const router = useRouter()
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users`)
      const users = await res.json()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user = users.find((u: any) => u.id === parseInt(id as string))
      if (user) {
        setName(user.name)
        setEmail(user.email)
      }
    }
    fetchUser()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    router.push('/')
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit User</h1>
      
      <label className="block mb-2 font-medium text-gray-700">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Name"
      />
      
      <label className="block mb-2 font-medium text-gray-700">Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Email"
        type="email"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
      >
        Update
      </button>
    </form>
  )
}
