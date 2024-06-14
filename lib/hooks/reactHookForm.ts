import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

//
export const useFormBySchema = <
  T extends z.ZodType<any, any>,
  V extends z.infer<T>
>(
  schema: T,
  values: V
) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: values
  })
}
