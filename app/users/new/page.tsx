'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof schema>

export default function NewUser() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to create user')
      }

      toast.success('User created successfully!')
      router.push('/')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 border rounded-md shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Create User</h1>

      <label className="block mb-2 font-semibold">Name</label>
      <input
        {...register('name')}
        className={`w-full p-2 border rounded-md mb-1 ${
          errors.name ? 'border-red-600' : 'border-gray-300'
        }`}
        placeholder="Name"
      />
      {errors.name && (
        <p className="text-red-600 text-sm mb-2">{errors.name.message}</p>
      )}

      <label className="block mb-2 font-semibold">Email</label>
      <input
        {...register('email')}
        className={`w-full p-2 border rounded-md mb-1 ${
          errors.email ? 'border-red-600' : 'border-gray-300'
        }`}
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-600 text-sm mb-4">{errors.email.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-md transition"
      >
        {isSubmitting ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
