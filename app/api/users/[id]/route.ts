import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id)
  const data = await req.json()

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _: Request,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id)

  try {
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
