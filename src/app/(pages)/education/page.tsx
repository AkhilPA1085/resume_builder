"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Update the schema to exclude unnecessary fields
const formSchema = z.object({
  education: z.array(
    z.object({
      collegename: z.string().min(2, {
        message: "College name must be at least 2 characters.",
      }),
      course: z.string(),
      duration: z.string(),
    })
  ),
})

const formFields: Array<{
  name: keyof z.infer<typeof formSchema>['education'][0]
  placeholder: string
  label: string
}> = [
    { name: "collegename", placeholder: "Enter your College/School Name", label: "College/School *" },
    { name: "course", placeholder: "Enter your course name", label: "Course Name *" },
    { name: "duration", placeholder: "Enter Duration", label: "Duration *" },
  ]

function Education() {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: [{ collegename: "", course: "", duration: "" }],
    },
  })

  const { control, handleSubmit } = methods
  const { fields, append } = useFieldArray({
    control,
    name: "education",
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem('education', JSON.stringify(values))
  }

  return (
    <section className="pt-10 flex items-center justify-center px-16">
      {/* Wrap the form with FormProvider to provide form context */}
      <FormProvider {...methods}>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {fields.map((item, index) => (
            <div key={item.id}>
              {formFields.map((formField, fieldIndex) => (
                <FormField
                  key={fieldIndex}
                  control={control}
                  name={`education.${index}.${formField.name}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-gray-700">
                        {formField.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formField.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
          <Button
            variant='outline'
            onClick={() => append({ collegename: "", course: "", duration: "" })}>
            Add Education
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </section>
  )
}

export default Education
