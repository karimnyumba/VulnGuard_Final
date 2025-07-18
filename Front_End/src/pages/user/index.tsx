import { useState } from "react"
import { useUsers } from "../../hooks/useUsers"
import { UserTable } from "../../components/UserTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/header"

interface CreateUserForm {
  name: string
  email: string
  password: string
  role: string
}

export default function UserManagementPage() {
  const { users, isLoading, createUser } = useUsers()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  const form = useForm<CreateUserForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  })

  const onSubmit = (data: CreateUserForm) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <DashboardLayout>
      <Header date={date} setDate={setDate} />
      <div className="container mx-auto py-10">
        <div className="flex w-full justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Create User</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <UserTable data={users} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  )
} 