import { ColumnDef } from "@tanstack/react-table"
import { ScanSession } from "@/type"
import { Button } from "@/components/ui/button"
import { Eye, Loader2 } from "lucide-react"
import { useScanSessions } from "../hooks/useScanSessions"
import { useState } from "react"

export const scanSessionColumns: ColumnDef<ScanSession>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.original.url}</div>
    ),
  },
  {
    accessorKey: "spiderStatus",
    header: "Spider Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${row.original.spiderStatus}%` }}
          />
        </div>
        <span className="text-sm font-medium">{row.original.spiderStatus}%</span>
      </div>
    ),
  },
  {
    accessorKey: "activeStatus",
    header: "Active Scan Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${row.original.activeStatus}%` }}
          />
        </div>
        <span className="text-sm font-medium">{row.original.activeStatus}%</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const scanSession = row.original
      const { getScan } = useScanSessions()
      const [isLoading, setIsLoading] = useState(false)

      const isSpiderComplete = scanSession.spiderStatus === 100
      const isActiveComplete = scanSession.activeStatus === 100
      const showViewResult = isSpiderComplete && isActiveComplete

      const handleViewResults = async () => {
        setIsLoading(true)
        try {
          await getScan.mutateAsync(scanSession.id)
        } catch (error) {
          console.error('Failed to get scan details:', error)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <div className="flex items-center gap-2">
          {showViewResult && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleViewResults}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )
    },
  },
] 