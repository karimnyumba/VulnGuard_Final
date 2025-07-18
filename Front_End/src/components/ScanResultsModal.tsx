import { ScanSession, ScanAlert } from "@/type"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Server, Globe, Download, Loader2 } from "lucide-react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { TechnicalReportPDF } from "./reports/TechnicalReportPDF"
import { TechnologyReportPDF } from "./reports/TechnologyReportPDF"
import { detectTechnologies, Technology } from "@/utils/detectTechnologies"
import { useState, useEffect } from "react"

interface ScanResultsModalProps {
  scan: ScanSession | null
  onClose: () => void
}

interface AlertWithTechnologies extends ScanAlert {
  urlTechnologies?: Record<string, Technology[]>
}

export function ScanResultsModal({ scan, onClose }: ScanResultsModalProps) {
  const [technologies, setTechnologies] = useState<Technology[] | null>(null)
  const [isLoadingTech, setIsLoadingTech] = useState(false)
  const [techError, setTechError] = useState<string | null>(null)
  const [alertsWithTech, setAlertsWithTech] = useState<AlertWithTechnologies[]>([])

  useEffect(() => {
    if (scan?.url) {
      setIsLoadingTech(true)
      setTechError(null)
      
      // Detect technologies for the main URL
      detectTechnologies(scan.url)
        .then(setTechnologies)
        .catch((error) => {
          console.error('Error detecting technologies:', error)
          setTechError('Failed to detect technologies')
        })
        .finally(() => setIsLoadingTech(false))

      // Detect technologies for each alert URL
      if (scan.activeResults) {
        const processAlerts = async () => {
          const alertsWithTechData = await Promise.all(
            scan.activeResults.map(async (alert) => {
              if (alert.urls && alert.urls.length > 0) {
                const urlTechMap: Record<string, Technology[]> = {}
                for (const url of alert.urls) {
                  try {
                    const techs = await detectTechnologies(url)
                    urlTechMap[url] = techs
                  } catch (error) {
                    console.error(`Error detecting technologies for URL ${url}:`, error)
                    urlTechMap[url] = []
                  }
                }
                return { ...alert, urlTechnologies: urlTechMap }
              }
              return alert
            })
          )
          setAlertsWithTech(alertsWithTechData)
        }
        processAlerts()
      }
    }
  }, [scan?.url, scan?.activeResults])

  const getCategoryColor = (category: Technology['category']) => {
    switch (category) {
      case 'framework':
        return 'bg-blue-500/10 text-blue-500'
      case 'cms':
        return 'bg-purple-500/10 text-purple-500'
      case 'library':
        return 'bg-green-500/10 text-green-500'
      case 'analytics':
        return 'bg-yellow-500/10 text-yellow-500'
      case 'hosting':
        return 'bg-orange-500/10 text-orange-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  if (!scan) return null

  return (
    <Dialog open={!!scan} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Technical Security Report</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 overflow-y-auto">
          <div className="space-y-6 py-4">
            {/* Target Information */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Target URL</h3>
                </div>
                <p className="text-sm text-muted-foreground">{scan.url}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Web Server</h3>
                </div>
                <p className="text-sm text-muted-foreground">{scan.webServer}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">IP Address</h3>
                </div>
                <p className="text-sm text-muted-foreground">{scan.ipAddress}</p>
              </div>
            </div>

            {/* Technology Detection Results */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Technology Detection</h3>
              {isLoadingTech ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : techError ? (
                <div className="text-sm text-red-500 p-4 border rounded-lg">
                  {techError}
                </div>
              ) : technologies && technologies.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={getCategoryColor(tech.category)}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {technologies.map((tech, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{tech.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Category: {tech.category}
                            </p>
                          </div>
                          <Badge variant="outline">
                            Confidence: {tech.confidence}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground p-4 border rounded-lg">
                  No technologies detected
                </div>
              )}
            </div>

            {/* Security Alerts */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Security Alerts</h3>
              {scan.activeResults && scan.activeResults.length > 0 ? (
                <div className="space-y-4">
                  {scan.activeResults.map((alert, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">{alert.name}</h4>
                        </div>
                        <Badge variant="outline" className="bg-red-500/10 text-red-500">
                          {alert.risk}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {alert.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Method:</span> {alert.method}
                        </div>
                        <div>
                          <span className="font-medium">Confidence:</span> {alert.confidence}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Solution:</span> {alert.solution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground p-4 border rounded-lg">
                  No security alerts found
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4 pt-4 border-t flex justify-between">
          <div className="flex items-center gap-2">
            <PDFDownloadLink
              document={
                <TechnicalReportPDF
                  alerts={alertsWithTech}
                  targetInfo={{
                    url: scan.url,
                    webServer: scan.webServer,
                    ipAddress: scan.ipAddress
                  }}
                />
              }
              fileName={`technical-report-${scan.url.replace(/[^a-z0-9]/gi, '-')}.pdf`}
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
            {technologies && (
              <PDFDownloadLink
                document={
                  <TechnologyReportPDF
                    url={scan.url}
                    technologies={technologies}
                  />
                }
                fileName={`technology-report-${scan.url.replace(/[^a-z0-9]/gi, '-')}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="outline" size="sm" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download Technology PDF
                      </>
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 