import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import userService from "@/services/user"
import { User, CreateUserDto, UpdateUserDto } from "@/type"
import { useNotification } from "@/hooks/useNotification"

export const useUsers = () => {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotification()

  // Get all users
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await userService.getUsers()
      return response
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  })

  // Create user
  const createUser = useMutation({
    mutationFn: async (userData: CreateUserDto) => {
      const response = await userService.register(userData)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      success("User created successfully")
    },
    onError: (err) => {
      showError("Failed to create user")
      console.error(err)
    },
  })

  // Update user
  const updateUser = useMutation({
    mutationFn: async ({ id, userData }: { id: string; userData: UpdateUserDto }) => {
      const response = await userService.updateUser(id, userData)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      success("User updated successfully")
    },
    onError: (err) => {
      showError("Failed to update user")
      console.error(err)
    },
  })

  // Delete user
  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      await userService.deleteUser(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      success("User deleted successfully")
    },
    onError: (err) => {
      showError("Failed to delete user")
      console.error(err)
    },
  })

  return {
    users,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
  }
} 