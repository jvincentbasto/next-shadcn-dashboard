'use server'

import connectToDatabase from '@/db/mongodb/db'
import User from '@/db/mongodb/models/User'

//
export const actionFetchUsers = async () => {
  await connectToDatabase()
  const users = await User.find()
  return users
}

//
export const actionCreateUser = async (formData: FormData) => {
  await connectToDatabase()

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string, 10)

  const newUser = new User({ name, age })
  await newUser.save()

  return `User ${name} has been created successfully!`
}

//
export const actionUpdateUser = async (id: string, formData: FormData) => {
  await connectToDatabase()

  const name = formData.get('name') as string
  const age = parseInt(formData.get('age') as string, 10)

  await User.findByIdAndUpdate(id, { name, age })

  return `User ${name} has been updated successfully!`
}

//
export const actionDeleteUser = async (id: string) => {
  await connectToDatabase()

  await User.findByIdAndDelete(id)

  return `User has been deleted successfully!`
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
