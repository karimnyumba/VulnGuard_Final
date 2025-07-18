import { ScanSession, ScanAlert } from "@/type"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw, Eye, Loader2, Globe, Server, Shield, AlertTriangle, Info, Download, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useScanSessions } from "../hooks/useScanSessions"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { TechnicalReportPDF } from "@/components/reports/TechnicalReportPDF"
import { NonTechnicalReportModal } from "./NonTechnicalReportModal"
import { SwahiliReportModal } from "./SwahiliReportModal"

interface NonTechnicalReport {
  name: string;
  risk: string;
  description: string;
}

interface SwahiliReport {
  name: string;
  risk: string;
  description: string;
}

interface ScanTableProps {
  data?: ScanSession[] | null
  isLoading?: boolean
}

export function ScanTable({ data = [], isLoading }: ScanTableProps) {
  const [technicalScan, setTechnicalScan] = useState<ScanSession | null>(null)
  const [nonTechnicalScan, setNonTechnicalScan] = useState<ScanSession | null>(null)
  const [swahiliScan, setSwahiliScan] = useState<ScanSession | null>(null)
  const [selectedNonTechnical, setSelectedNonTechnical] = useState<NonTechnicalReport[] | null>(null)
  const [selectedSwahili, setSelectedSwahili] = useState<SwahiliReport[] | null>(null)
  const { deleteScan } = useScanSessions()

  // Ensure data is always an array
  const scanSessions = Array.isArray(data) ? data : []

  const handleViewResults = (session: ScanSession) => {
    setTechnicalScan(session)
    setNonTechnicalScan(null)
    setSwahiliScan(null)
    setSelectedNonTechnical(null)
    setSelectedSwahili(null)
  }

  const handleViewNonTechnical = (session: ScanSession) => {
    if (session.activeResults && session.activeResults.length > 0) {
      const nonTechnicalDescriptions = session.activeResults
        .filter(alert => alert.nonTechnicalDescription)
        .map(alert => ({
          name: alert.name,
          risk: alert.risk,
          description: alert.nonTechnicalDescription || ''
        }));
      setNonTechnicalScan(session);
      setSelectedNonTechnical(nonTechnicalDescriptions);
      setTechnicalScan(null);
      setSwahiliScan(null);
      setSelectedSwahili(null);
    }
  }

  const handleViewSwahili = (session: ScanSession) => {
    if (session.activeResults && session.activeResults.length > 0) {
      const swahiliDescriptions = session.activeResults
        .filter(alert => alert.swahiliDescription)
        .map(alert => ({
          name: alert.name,
          risk: alert.risk,
          description: alert.swahiliDescription || ''
        }));
      setSwahiliScan(session);
      setSelectedSwahili(swahiliDescriptions);
      setTechnicalScan(null);
      setNonTechnicalScan(null);
      setSelectedNonTechnical(null);
    }
  }

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

  const handleDeleteScan = async (scanId: number) => {
    try {
      await deleteScan.mutateAsync(scanId)
      setTechnicalScan(null)
    } catch (error) {
      console.error('Error deleting scan:', error)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Server Info</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Scan Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scanSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No scan sessions found. Start a new scan to begin.
                </TableCell>
              </TableRow>
            ) : (
              scanSessions.map((session) => {
                const isSpiderComplete = session.spiderStatus === 100
                const isActiveComplete = session.activeStatus === 100
                const hasActiveResults = session.activeResults !== null
                const showViewResult = isSpiderComplete && isActiveComplete && hasActiveResults
                
                // Calculate combined progress
                let combinedProgress = 0
                if (isSpiderComplete) {
                  // If spider is complete, show active scan progress
                  combinedProgress = hasActiveResults ? 100 : Math.min(session.activeStatus, 99)
                } else {
                  // If spider is not complete, show spider progress
                  combinedProgress = session.spiderStatus
                }

                return (
                  <TableRow key={session.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div className="font-mono text-sm">{session.url}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div className="font-medium">{session.webServer}</div>
                          <div className="text-muted-foreground">{session.ipAddress}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(session.startedAt), { addSuffix: true })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{combinedProgress}%</span>
                        </div>
                        <Progress value={combinedProgress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {showViewResult && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>View Report</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewResults(session)}>
                                Technical Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewNonTechnical(session)}>
                                Non-Technical Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewSwahili(session)}>
                                Swahili Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDeleteScan(session.id)}
                          disabled={deleteScan.isPending}
                        >
                          {deleteScan.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!technicalScan} onOpenChange={() => setTechnicalScan(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-semibold">Technical Security Report</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4 overflow-y-auto">
            {technicalScan && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Target Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{technicalScan.url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <span>{technicalScan.webServer}</span>
                      </div>
                      <div className="text-muted-foreground">
                        IP: {technicalScan.ipAddress}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {technicalScan.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {technicalScan.activeResults && technicalScan.activeResults.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Security Alerts</h3>
                    <div className="space-y-4">
                      {Array.from(
                        new Map<string, ScanAlert>(
                          technicalScan.activeResults
                            .map(alert => {
                              const referenceKey = Object.keys(alert.tags).sort().join(',');
                              return [referenceKey, alert] as [string, ScanAlert];
                            })
                            .sort((a, b) => {
                              const riskOrder = { high: 0, medium: 1, low: 2 };
                              return riskOrder[a[1].risk.toLowerCase()] - riskOrder[b[1].risk.toLowerCase()];
                            })
                        ).values()
                      ).map((alert, index) => (
                        <Card key={alert.id}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                  <h4 className="font-medium">{alert.name}</h4>
                                  <Badge className={getRiskColor(alert.risk)}>
                                    {alert.risk}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {alert.description}
                                </p>
                                {alert.urls && alert.urls.length > 0 && (
                                  <div className="mt-2">
                                    <h5 className="text-sm font-medium mb-1">Affected URLs</h5>
                                    <div className="space-y-1">
                                      {alert.urls.map((url, urlIndex) => (
                                        <div key={urlIndex} className="flex items-center gap-2">
                                          <Globe className="h-3 w-3 text-muted-foreground" />
                                          <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-500 hover:underline break-all"
                                          >
                                            {url}
                                          </a>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {alert.solution && (
                                  <div className="mt-2">
                                    <h5 className="text-sm font-medium mb-1">Solution</h5>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                                      {alert.solution}
                                    </p>
                                  </div>
                                )}
                                {Object.entries(alert.tags).length > 0 && (
                                  <div className="mt-2">
                                    <h5 className="text-sm font-medium mb-1">References</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {Object.entries(alert.tags).map(([key, value]) => (
                                        <a
                                          key={key}
                                          href={value}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm text-blue-500 hover:underline"
                                        >
                                          {key}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No security alerts found
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
          <DialogFooter className="mt-4 pt-4 border-t flex justify-between">
            <div className="flex items-center gap-2">
              {technicalScan && (
                <>
                  <PDFDownloadLink
                    document={
                      <TechnicalReportPDF
                        alerts={technicalScan.activeResults || []}
                        targetInfo={{
                          url: technicalScan.url,
                          webServer: technicalScan.webServer,
                          ipAddress: technicalScan.ipAddress
                        }}
                      />
                    }
                    fileName={`technical-report-${technicalScan.url.replace(/[^a-z0-9]/gi, '-')}.pdf`}
                  >
                    {({ loading }) => (
                      <Button variant="outline" size="sm" disabled={loading}>
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download Technical PDF
                          </>
                        )}
                      </Button>
                    )}
                  </PDFDownloadLink>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteScan(technicalScan.id)}
                    disabled={deleteScan.isPending}
                  >
                    {deleteScan.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Scan
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
            <Button variant="outline" onClick={() => setTechnicalScan(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NonTechnicalReportModal
        scan={nonTechnicalScan}
        reports={selectedNonTechnical}
        onClose={() => {
          setNonTechnicalScan(null);
          setSelectedNonTechnical(null);
        }}
      />

      <SwahiliReportModal
        scan={swahiliScan}
        reports={selectedSwahili}
        onClose={() => {
          setSwahiliScan(null);
          setSelectedSwahili(null);
        }}
      />
    </>
  )
}