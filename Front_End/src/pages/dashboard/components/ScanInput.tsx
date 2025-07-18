import { Search, Shield, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useScanSessions } from "@/pages/inventory/hooks/useScanSessions"
import { Card, CardContent } from "@/components/ui/card"

export const ScanInput = () => {
  const [url, setUrl] = useState("")
  const { startScan } = useScanSessions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    try {
      await startScan.mutateAsync(url)
      setUrl("")
    } catch (error) {
      console.error("Failed to start scan:", error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="url"
              placeholder="Enter URL to scan (e.g., https://example.com)"
              className="pl-9"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={startScan.isPending}>
            {startScan.isPending ? (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 animate-pulse" />
                Scanning...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Start Scan
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 