import mongoose, { Document, Model, Schema } from 'mongoose'
import { schemaName } from '../definitions/user'

//
interface IUser extends Document {
  name: string
  email: string
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>(schemaName, userSchema)

export default User
