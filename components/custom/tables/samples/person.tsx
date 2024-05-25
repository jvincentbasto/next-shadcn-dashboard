'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { faker } from '@faker-js/faker'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  image: string
  status: 'single' | 'married' | 'complicated'
  subRows?: Person[]
  createdAt: string
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    id: faker.number.int(1000),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    image: faker.image.avatar(),
    // image: 'https://static.wikia.nocookie.net/beluga/images/d/da/V8z0crk5gho71.webp/revision/latest?cb=20221103210216',
    status: faker.helpers.shuffle<Person['status']>([
      'single',
      'married',
      'complicated'
    ])[0],
    createdAt: faker.date.recent().toString()
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }

  return makeDataLevel()
}

//
export const personData = makeData(30)
export const personColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    minSize: 300,
    maxSize: 500
  },
  {
    accessorKey: 'lastName',
    id: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    cell: props => props.getValue()
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    cell: props => <Badge variant='outline'>{props.row.original.status}</Badge>
  },
  {
    accessorKey: 'image',
    id: 'image',
    cell: props => (
      <Image
        alt='Product image'
        className='aspect-square rounded-md object-cover'
        src={props.row.original.image}
        height='30'
        width='30'
      />
    )
  },
  {
    accessorKey: 'createdAt',
    id: 'createdAt',
    header: 'Created At',
    size: 300
  },
  {
    accessorKey: 'actions',
    id: 'actions',
    header: 'Actions',
    cell: props => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
