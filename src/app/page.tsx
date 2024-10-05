"use client"

import React from 'react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  value: string | number
  description: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold mb-2">{value}</p>
        <CardDescription className="text-primary-foreground/70">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
)

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <h2 className="text-2xl font-semibold mb-4">Engagement and Automation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Personalized Campaigns" 
          value={12} 
          description="Active targeted campaigns based on user behavior"
        />
        <DashboardCard 
          title="Automated Workflows" 
          value={8} 
          description="Workflows triggered by specific events"
        />
        <DashboardCard 
          title="A/B Tests" 
          value={5} 
          description="Ongoing A/B tests for campaign optimization"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Analytics and Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Active Users" 
          value="15,234" 
          description="Users active in the last 30 days"
        />
        <DashboardCard 
          title="Audience Segments" 
          value={18} 
          description="Distinct audience segments for targeting"
        />
        <DashboardCard 
          title="Churn Risk" 
          value="3.2%" 
          description="Predicted churn rate for next month"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Channels and Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Active Channels" 
          value={5} 
          description="Email, Push, SMS, In-app, Web Push"
        />
        <DashboardCard 
          title="Integrations" 
          value={12} 
          description="Connected third-party tools and platforms"
        />
        <DashboardCard 
          title="Message Delivery Rate" 
          value="99.7%" 
          description="Successful message delivery across all channels"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Customer Support and Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Live Chat Sessions" 
          value={342} 
          description="Active live chat sessions today"
        />
        <DashboardCard 
          title="Self-Service Usage" 
          value="78%" 
          description="Customers using self-service portal"
        />
        <DashboardCard 
          title="Customer Feedback" 
          value={4.7} 
          description="Average rating out of 5 stars"
        />
      </div>
    </div>
  )
}