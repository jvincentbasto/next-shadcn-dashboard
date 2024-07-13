import mongoose, { Document, Model, Schema } from 'mongoose'
import { schemaName } from '../definitions/schema'
//
interface IProjectSchema extends Document {
  schemaType: string
  schemaName: string
  schemaDefinition: string
  formName: string
  formFields: string
}

const ProjectSchemaSchema: Schema<IProjectSchema> = new Schema({
  schemaType: { type: String, required: true },
  schemaName: { type: String, required: true, unique: true },
  schemaDefinition: { type: String },
  formName: { type: String },
  formFields: { type: String }
})

export const ProjectSchema: Model<IProjectSchema> =
  mongoose.models.ProjectSchema ||
  mongoose.model<IProjectSchema>(schemaName, ProjectSchemaSchema)

export default ProjectSchema
