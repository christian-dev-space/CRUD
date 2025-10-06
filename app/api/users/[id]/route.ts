import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const data = await req.json()
  const user = await prisma.user.update({ where: { id }, data })
  return NextResponse.json(user)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
