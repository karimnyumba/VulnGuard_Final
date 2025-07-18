import { AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Play, Eye } from "lucide-react"

export function ScanningHelp() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Info className="h-5 w-5 text-blue-500" />
          <CardTitle>How Scanning Works</CardTitle>
        </div>
        <CardDescription>
          Understanding the two-stage scanning process and how to monitor your scans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Process Steps */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
              <RefreshCw className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold">1. Spider Scan (0-100%)</h3>
              <p className="text-sm text-muted-foreground">
                The first stage crawls through your website to identify all accessible paths and URLs. 
                This helps map out the structure of your website for comprehensive testing.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
              <Play className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold">2. Active Scan (0-100%)</h3>
              <p className="text-sm text-muted-foreground">
                Once the Spider Scan is complete, click the play button to start the Active Scan. 
                This stage performs in-depth security testing on all identified URLs.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold">3. View Results</h3>
              <p className="text-sm text-muted-foreground">
                After both scans are complete, click the eye icon to view detailed vulnerability reports 
                and security findings.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Tip */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Troubleshooting Tip</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                If you notice that your scans are not progressing, try refreshing the page. 
                This can help resolve any temporary connection issues and ensure smooth scanning progress.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 