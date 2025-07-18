import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ScanAlert } from "@/type"
import { AlertTriangle, Globe, Server, Shield, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScanResultsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  alerts: ScanAlert[]
}

export function ScanResultsModal({ isOpen, onOpenChange, alerts }: ScanResultsModalProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'low':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Technical Security Report</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold">{alert.name}</h3>
                      <Badge className={getRiskColor(alert.risk)}>
                        {alert.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">URL:</span>
                      <span className="text-muted-foreground break-all">{alert.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Method:</span>
                      <span className="text-muted-foreground">{alert.method}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Confidence:</span>
                      <span className="text-muted-foreground">{alert.confidence}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">CWE ID:</span>
                      <span className="text-muted-foreground">{alert.cweid}</span>
                    </div>
                  </div>
                </div>

                {alert.solution && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Solution
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{alert.solution}</p>
                  </div>
                )}

                {alert.reference && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      References
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{alert.reference}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4 pt-4 border-t flex justify-between">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 