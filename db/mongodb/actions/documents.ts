'use server'

import connectToDatabase from '@/db/mongodb/db'
import { Model } from 'mongoose'
import { TTypeValues } from '../utilities'

//
type TField = {
  name?: string
  typeValue?: TTypeValues
}

//
export const actionFetchDynamic = async (Schema: Model<any>) => {
  await connectToDatabase()

  //
  const document = await Schema.find()
  return document
}

//
export const actionCreatDynamic = async (
  Schema: Model<any>,
  formData: FormData,
  fields: TField[]
) => {
  await connectToDatabase()

  //
  let object = {}
  for (const field of fields) {
    const { name, typeValue } = field
    if (!name || !typeValue) continue

    //
    const value = formData.get(name)
    object = { ...object, [name]: value }
  }

  //
  const newDocument = new Schema(object)
  await newDocument.save()

  //
  return `Dynamic document has been created successfully!`
}

//
export const actionUpdatDynamic = async (
  Schema: Model<any>,
  id: string,
  formData: FormData,
  fields: TField[]
) => {
  await connectToDatabase()

  //
  let object = {}
  for (const field of fields) {
    const { name, typeValue } = field
    if (!name || !typeValue) continue

    //
    const value = formData.get(name)
    object = { ...object, [name]: value }
  }

  //
  await Schema.findByIdAndUpdate(id, object)
  return `Dynamic document has been updated successfully!`
}

//
export const actionDeletDynamic = async (Schema: Model<any>, id: string) => {
  await connectToDatabase()

  //
  await Schema.findByIdAndDelete(id)
  return `Dynamic document has been deleted successfully!`
}

// import { useState, useTransition, useEffect } from 'react';
// import { createUser, getUsers, updateUser, deleteUser } from './actions';
// import { IUser } from '../models/User';

// export default function Home() {
//   const [response, setResponse] = useState<string>('');
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     async function fetchUsers() {
//       const users = await getUsers();
//       setUsers(users);
//     }
//     fetchUsers();
//   }, []);

//   const handleCreate = async (formData: FormData) => {
//     startTransition(async () => {
//       const message = await createUser(formData);
//       setResponse(message);
//       const users = await getUsers();
//       setUsers(users);
//     });
//   };

//   const handleUpdate = async (id: string, formData: FormData) => {
//     startTransition(async () => {
//       const message = await updateUser(id, formData);
//       setResponse(message);
//       const users = await getUsers();
//       setUsers(users);
//     });
//   };

//   const handleDelete = async (id: string) => {
//     startTransition(async () => {
//       const message = await deleteUser(id);
//       setResponse(message);
//       const users = await getUsers();
//       setUsers(users);
//     });
//   };

//   return (
//     <div>
//       <h1>Next.js 14 TypeScript CRUD Example</h1>

//       <h2>Create User</h2>
//       <form action={handleCreate}>
//         <input type="text" name="name" placeholder="Enter your name" />
//         <input type="text" name="age" placeholder="Enter your age" />
//         <button type="submit">Submit</button>
//       </form>

//       <h2>Users</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user._id}>
//             <p>Name: {user.name}, Age: {user.age}</p>
//             <form action={(e) => handleUpdate(user._id, new FormData(e.currentTarget))}>
//               <input type="text" name="name" defaultValue={user.name} />
//               <input type="text" name="age" defaultValue={user.age.toString()} />
//               <button type="submit">Update</button>
//             </form>
//             <button onClick={() => handleDelete(user._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {isPending ? <p>Loading...</p> : <p>{response}</p>}
//     </div>
//   );
// }
