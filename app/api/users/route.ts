import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all users
export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

// Create a new user
export async function POST(req: Request) {
  const data = await req.json()
  const user = await prisma.user.create({ data })
  return NextResponse.json(user)
}
