"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, Line, LineChart, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Bell, MessageSquare, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"

export default function Component() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dummy data for charts
  const campaignData = [
    { name: "Email", value: 400 },
    { name: "SMS", value: 300 },
    { name: "Push", value: 200 },
    { name: "In-App", value: 100 },
  ]

  const engagementData = [
    { name: "Mon", value: 4000 },
    { name: "Tue", value: 3000 },
    { name: "Wed", value: 5000 },
    { name: "Thu", value: 2780 },
    { name: "Fri", value: 1890 },
    { name: "Sat", value: 2390 },
    { name: "Sun", value: 3490 },
  ]

  const abTestData = [
    { name: "A", opens: 4000, clicks: 2400 },
    { name: "B", opens: 3000, clicks: 1398 },
  ]

  const COLORS = ['#FFFF00', '#FFD700', '#FFA500', '#FF8C00']

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center h-16 px-4 border-b bg-gray-900 border-gray-800">
        <h1 className="text-lg font-bold text-yellow-400">Marketing Dashboard</h1>
        <nav className="ml-auto flex gap-4">
          <Button variant="ghost" className="text-yellow-400">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-yellow-400">
            Campaigns
          </Button>
          <Button variant="ghost" className="text-yellow-400">
            Analytics
          </Button>
          <Button variant="ghost" className="text-yellow-400">
            Support
          </Button>
        </nav>
      </header>
      <main className="flex-1 overflow-y-auto p-4 bg-black">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">10,482</div>
              <p className="text-xs text-yellow-200">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Active Campaigns</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">7</div>
              <p className="text-xs text-yellow-200">+2 new this week</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Engagement Rate</CardTitle>
              <Bell className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">24.8%</div>
              <p className="text-xs text-yellow-200">+5.2% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Support Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">42</div>
              <p className="text-xs text-yellow-200">-18% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-yellow-400">Call To Action</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#FFFF00" />
                    <YAxis stroke="#FFFF00" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#333', border: '1px solid #FFFF00' }}
                      labelStyle={{ color: '#FFFF00' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#FFFF00" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-yellow-400">Channel Distribution</CardTitle>
              <CardDescription className="text-yellow-200">Active campaigns by channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={campaignData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {campaignData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#333', border: '1px solid #FFFF00' }}
                      labelStyle={{ color: '#FFFF00' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-yellow-400">A/B Testing Results</CardTitle>
              <CardDescription className="text-yellow-200">Comparing open rates and click-through rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={abTestData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#FFFF00" />
                    <YAxis stroke="#FFFF00" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#333', border: '1px solid #FFFF00' }}
                      labelStyle={{ color: '#FFFF00' }}
                    />
                    <Bar dataKey="opens" fill="#FFFF00" />
                    <Bar dataKey="clicks" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-yellow-400">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-yellow-400">New campaign created</p>
                    <p className="text-sm text-yellow-200">Summer Sale Email Campaign</p>
                  </div>
                  <div className="ml-auto font-medium text-yellow-400">Just now</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-yellow-400">A/B Test completed</p>
                    <p className="text-sm text-yellow-200">Subject Line Test for Newsletter</p>
                  </div>
                  <div className="ml-auto font-medium text-yellow-400">2 hours ago</div>
                </div>
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-yellow-400">Segment updated</p>
                    <p className="text-sm text-yellow-200">High-Value Customers</p>
                  </div>
                  <div className="ml-auto font-medium text-yellow-400">5 hours ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}