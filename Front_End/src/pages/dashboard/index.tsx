"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/header"
import { ScanInput } from "./components/ScanInput"
import { getAllScans } from "@/services/scan"
import { VulnerabilitySummary } from "./components/vurnabilitysummary"
import { VulnerabilityTests } from "./components/test"
import { ScanningHelp } from "./components/ScanningHelp"
import { ScanOverview } from "./components/ScanOverview"
import type { ScanSession } from "@/type"

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [scanSessions, setScanSessions] = useState<ScanSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchScanSessions = async () => {
      try {
        setIsLoading(true)
        const response = await getAllScans()
        if (response.success && response.data) {
          setScanSessions(response.data)
        } else {
          setScanSessions([])
        }
      } catch (error) {
        console.error('Error fetching scan sessions:', error)
        setScanSessions([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchScanSessions()
  }, [])

  // Calculate dashboard statistics
  const totalScans = scanSessions.length
  const successfulScans = scanSessions.filter(session =>
    session.spiderStatus === 100 && session.activeStatus === 100
  ).length

  // Calculate total vulnerabilities across all scans
  const totalVulnerabilities = scanSessions.reduce((total, session) => {
    if (Array.isArray(session.activeResults)) {
      return total + session.activeResults.length
    }
    return total
  }, 0)

  // Get recent scans (last 5)
  const recentScans = scanSessions
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 5)

  const handleSell = (data: { medicineId: number; quantity: number; price: number }) => {
    // TODO: Implement sell logic
    console.log('Selling medicine:', data)
  }

  return (
    <DashboardLayout>
      <Header date={date} setDate={setDate} />
      <div className="container mx-auto py-10">
        <div className="flex w-full justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <main className="flex-1">
          <ScanOverview 
            totalScans={totalScans}
            totalVulnerabilities={totalVulnerabilities}
            recentScans={recentScans}
            isLoading={isLoading}
          />
          <div className="mt-6">
            <VulnerabilitySummary scanSessions={scanSessions} />
          </div>

          {/* <VulnerabilityTests/> */}
        </main>
      </div>
    </DashboardLayout>
  )
}
