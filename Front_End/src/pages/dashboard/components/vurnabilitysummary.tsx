"use client"

import { Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ScanSession } from "@/type"

interface VulnerabilitySummaryProps {
  scanSessions: ScanSession[];
}

export function VulnerabilitySummary({ scanSessions }: VulnerabilitySummaryProps) {
  // Calculate security metrics from scan data
  const totalVulnerabilities = scanSessions.reduce((total, session) => {
    if (Array.isArray(session.activeResults)) {
      return total + session.activeResults.length;
    }
    return total;
  }, 0);

  const highRiskVulnerabilities = scanSessions.reduce((total, session) => {
    if (Array.isArray(session.activeResults)) {
      return total + session.activeResults.filter(alert => 
        alert.risk.toLowerCase() === 'high'
      ).length;
    }
    return total;
  }, 0);

  const mediumRiskVulnerabilities = scanSessions.reduce((total, session) => {
    if (Array.isArray(session.activeResults)) {
      return total + session.activeResults.filter(alert => 
        alert.risk.toLowerCase() === 'medium'
      ).length;
    }
    return total;
  }, 0);

  const lowRiskVulnerabilities = scanSessions.reduce((total, session) => {
    if (Array.isArray(session.activeResults)) {
      return total + session.activeResults.filter(alert => 
        alert.risk.toLowerCase() === 'low'
      ).length;
    }
    return total;
  }, 0);

  // Calculate security score (100 - weighted risk score)
  const calculateSecurityScore = () => {
    if (totalVulnerabilities === 0) return 100;
    
    const weightedScore = (highRiskVulnerabilities * 10) + (mediumRiskVulnerabilities * 5) + (lowRiskVulnerabilities * 2);
    const maxPossibleScore = totalVulnerabilities * 10;
    const riskPercentage = (weightedScore / maxPossibleScore) * 100;
    
    return Math.max(0, Math.round(100 - riskPercentage));
  };

  const securityScore = calculateSecurityScore();
  const warnings = mediumRiskVulnerabilities + lowRiskVulnerabilities;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Security Score</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <CardDescription>Overall security rating</CardDescription>
              <span className={`font-medium ${securityScore >= 80 ? 'text-green-500' : securityScore >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                {securityScore}%
              </span>
            </div>
            <Progress 
              value={securityScore} 
              className={`h-2 ${
                securityScore >= 80 ? 'bg-green-100' : 
                securityScore >= 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}
            >
              <div 
                className={`h-2 ${
                  securityScore >= 80 ? 'bg-green-500' : 
                  securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
                style={{ width: `${securityScore}%` }} 
              />
            </Progress>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 dark:border-yellow-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Warnings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <CardDescription>Issues requiring attention</CardDescription>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-yellow-500">{warnings}</span>
              <span className="text-xs ml-1 text-muted-foreground">issues</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="text-yellow-500 font-medium">{mediumRiskVulnerabilities} medium</span>, {lowRiskVulnerabilities} low risk
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">Critical Threats</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <CardDescription>High priority vulnerabilities</CardDescription>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-red-500">{highRiskVulnerabilities}</span>
              <span className="text-xs ml-1 text-muted-foreground">threats</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            {highRiskVulnerabilities > 0 ? (
              <span className="text-red-500 font-medium">Immediate action</span>
            ) : (
              <span className="text-green-500 font-medium">No critical threats</span>
            )} {highRiskVulnerabilities > 0 ? 'recommended' : 'detected'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
