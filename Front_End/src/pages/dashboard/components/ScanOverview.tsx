import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import type { ScanSession } from "@/type";

interface ScanOverviewProps {
  totalScans: number;
  totalVulnerabilities: number;
  recentScans: ScanSession[];
  isLoading: boolean;
}

export const ScanOverview: React.FC<ScanOverviewProps> = ({ 
  totalScans, 
  totalVulnerabilities, 
  recentScans, 
  isLoading 
}) => {
  const safeRecentScans = Array.isArray(recentScans) ? recentScans : [];
  
  // Calculate statistics
  const successfulScans = safeRecentScans.filter(session =>
    session.spiderStatus === 100 && session.activeStatus === 100
  ).length;

  const failedScans = safeRecentScans.filter(session =>
    session.spiderStatus === -1 || session.activeStatus === -1
  ).length;

  const inProgressScans = safeRecentScans.filter(session =>
    (session.spiderStatus >= 0 && session.spiderStatus < 100) ||
    (session.activeStatus >= 0 && session.activeStatus < 100)
  ).length;

  // Calculate unique vulnerabilities by name
  const uniqueVulnerabilities = new Set();
  safeRecentScans.forEach(session => {
    if (Array.isArray(session.activeResults)) {
      session.activeResults.forEach(alert => {
        uniqueVulnerabilities.add(alert.name);
      });
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-muted-foreground">
              All time scan count
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVulnerabilities}</div>
            <p className="text-xs text-muted-foreground">
              {uniqueVulnerabilities.size}  types
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successfulScans}</div>
            <p className="text-xs text-muted-foreground">
              Completed successfully
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedScans}</div>
            <p className="text-xs text-muted-foreground">
              {inProgressScans} in progress
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {safeRecentScans.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No scan sessions found</p>
              <p className="text-sm">Start your first security scan to see results here</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vulnerabilities</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {safeRecentScans.map((session) => {
                  const vulnerabilityCount = Array.isArray(session.activeResults) ? session.activeResults.length : 0;
                  const highRiskCount = Array.isArray(session.activeResults) 
                    ? session.activeResults.filter(alert => alert.risk.toLowerCase() === 'high').length 
                    : 0;
                  const mediumRiskCount = Array.isArray(session.activeResults) 
                    ? session.activeResults.filter(alert => alert.risk.toLowerCase() === 'medium').length 
                    : 0;
                  const lowRiskCount = Array.isArray(session.activeResults) 
                    ? session.activeResults.filter(alert => alert.risk.toLowerCase() === 'low').length 
                    : 0;

                  return (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.url}</TableCell>
                      <TableCell>{new Date(session.startedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {session.spiderStatus === 100 && session.activeStatus === 100 ? (
                          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : session.spiderStatus === -1 || session.activeStatus === -1 ? (
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Failed
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{vulnerabilityCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {highRiskCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {highRiskCount} High
                            </Badge>
                          )}
                          {mediumRiskCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {mediumRiskCount} Medium
                            </Badge>
                          )}
                          {lowRiskCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {lowRiskCount} Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 