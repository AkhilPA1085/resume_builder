"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address."),
  linkedin: z.string().url("Invalid LinkedIn URL.").optional().or(z.literal("")),
  github: z.string().url("Invalid GitHub URL.").optional().or(z.literal("")),
})

const formFields: Array<{
  name: keyof z.infer<typeof formSchema>
  placeholder: string
  label: string
}> = [
    { name: "fullname", placeholder: "Enter your full name", label: "Full Name *" },
    { name: "phone", placeholder: "Enter your phone number", label: "Phone Number *" },
    { name: "email", placeholder: "Enter your Email id", label: "Email *" },
    { name: "linkedin", placeholder: "Enter your Linkedin url", label: "Linkedin url" },
    { name: "github", placeholder: "Enter your Github url", label: "Github url" },
  ]

function BasicInfo() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('basicInfo', JSON.stringify(values))
  }

  return (
    <section className=" pt-10 flex items-center justify-center px-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          {formFields?.map((formField, index) => (
            <FormField
              key={index}
              control={form.control}
              name={formField?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-700">
                    {formField?.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                       placeholder={formField?.placeholder}
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit"
          >Submit</Button>
        </form>
      </Form>
    </section>
  )
}

export default BasicInfo