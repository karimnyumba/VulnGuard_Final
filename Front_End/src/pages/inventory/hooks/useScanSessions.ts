import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { startFullScan, getAllScans, getScanById, deleteScan } from "@/services/scan"
import { ScanSession } from "@/type"
import { useNotification } from "@/hooks/useNotification"

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const useScanSessions = () => {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotification()

  // Get all scan sessions with automatic refresh every 5 seconds
  const { data: scanSessions = [], isLoading } = useQuery<ScanSession[]>({
    queryKey: ["scanSessions"],
    queryFn: async () => {
      const response = await getAllScans()
      return response.data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true, // Continue refetching even when the tab is not active
    staleTime: 0, // Consider data stale immediately to ensure fresh data
  })

  // Start a full scan
  const startScan = useMutation({
    mutationFn: async (url: string) => {
      const response = await startFullScan(url)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Scan started successfully")
    },
    onError: (err) => {
      showError("Failed to start scan")
      console.error(err)
    },
  })

  // Get a specific scan
  const getScan = useMutation({
    mutationFn: async (id: number) => {
      const response = await getScanById(id)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (err) => {
      showError("Failed to get scan details")
      console.error(err)
    },
  })

  // Delete a scan
  const deleteScanMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await deleteScan(id)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Scan deleted successfully")
    },
    onError: (err) => {
      showError("Failed to delete scan")
      console.error(err)
    },
  })

  return {
    scanSessions,
    isLoading,
    startScan,
    getScan,
    deleteScan: deleteScanMutation,
  }
} 