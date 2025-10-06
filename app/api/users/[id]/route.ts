import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const data = await req.json()

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
}
