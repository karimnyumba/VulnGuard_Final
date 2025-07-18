"use client"

import { Shield, Bug, Lock, Globe, AlertTriangle, Zap, FileCode, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function VulnerabilityTests() {
  const vulnerabilityTests = [
    {
      title: "Cross-Site Scripting (XSS)",
      description:
        "Tests for vulnerabilities that allow attackers to inject malicious scripts into web pages viewed by users.",
      icon: FileCode,
      color: "bg-red-100 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
      borderColor: "border-red-200 dark:border-red-800",
      severity: "High",
      severityColor: "bg-red-500",
    },
    {
      title: "SQL Injection",
      description:
        "Checks for vulnerabilities that allow attackers to inject malicious SQL code into database queries.",
      icon: Database,
      color: "bg-orange-100 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
      borderColor: "border-orange-200 dark:border-orange-800",
      severity: "Critical",
      severityColor: "bg-red-700",
    },
    {
      title: "Cross-Site Request Forgery",
      description: "Tests for vulnerabilities that allow attackers to trick users into performing unwanted actions.",
      icon: Globe,
      color: "bg-yellow-100 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      severity: "Medium",
      severityColor: "bg-yellow-500",
    },
    {
      title: "Authentication Bypass",
      description: "Checks for vulnerabilities in authentication mechanisms that could allow unauthorized access.",
      icon: Lock,
      color: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
      borderColor: "border-purple-200 dark:border-purple-800",
      severity: "High",
      severityColor: "bg-red-500",
    },
    {
      title: "Security Misconfigurations",
      description: "Identifies security gaps in server configurations, frameworks, and application settings.",
      icon: AlertTriangle,
      color: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
      borderColor: "border-green-200 dark:border-green-800",
      severity: "Medium",
      severityColor: "bg-yellow-500",
    },
    {
      title: "Insecure Direct Object References",
      description:
        "Tests for vulnerabilities that allow attackers to manipulate references to access unauthorized data.",
      icon: Bug,
      color: "bg-cyan-100 dark:bg-cyan-900/20",
      textColor: "text-cyan-600 dark:text-cyan-400",
      borderColor: "border-cyan-200 dark:border-cyan-800",
      severity: "Low",
      severityColor: "bg-blue-500",
    },
    {
      title: "Broken Access Control",
      description: "Checks for vulnerabilities in access control mechanisms that could allow unauthorized actions.",
      icon: Shield,
      color: "bg-pink-100 dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400",
      borderColor: "border-pink-200 dark:border-pink-800",
      severity: "High",
      severityColor: "bg-red-500",
    },
    {
      title: "Performance Testing",
      description: "Evaluates how your website performs under various load conditions and identifies bottlenecks.",
      icon: Zap,
      color: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      severity: "Low",
      severityColor: "bg-blue-500",
    },
  ]

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Website Vulnerability Tests</h2>
        <p className="text-muted-foreground">Comprehensive security checks to protect your website from threats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vulnerabilityTests.map((test, index) => (
          <Card key={index} className={`border ${test.borderColor} transition-all hover:shadow-md`}>
            <CardHeader className={`${test.color} ${test.textColor} pb-2`}>
              <div className="flex justify-between items-start">
                <test.icon className="h-6 w-6" />
                <Badge className={`${test.severityColor} text-white`}>{test.severity}</Badge>
              </div>
              <CardTitle className="text-lg mt-2">{test.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <CardDescription className="text-sm min-h-[80px]">{test.description}</CardDescription>
              <Button variant="outline" className={`w-full mt-2 ${test.textColor} border-current`}>
                Run Test
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
