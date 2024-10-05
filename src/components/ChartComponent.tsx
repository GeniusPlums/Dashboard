"use client"

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'

interface ChartComponentProps {
  type: 'bar' | 'pie'
  data: Record<string, number | Record<string, number>>
  options?: {
    comparison?: boolean
    horizontal?: boolean
    sortDescending?: boolean
  }
  title: string
  description: string
}

interface SimpleDataPoint {
  name: string
  value: number
}

interface ComparisonDataPoint {
  category: string
  subCategory: string
  value: number
}

type ChartDataPoint = SimpleDataPoint | ComparisonDataPoint

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))']

export default function ChartComponent({ type, data, options = {}, title, description }: ChartComponentProps) {
  const { comparison, horizontal, sortDescending } = options

  const prepareData = (): ChartDataPoint[] => {
    if (type === 'pie' || !comparison) {
      const simpleData = Object.entries(data).map(([name, value]) => ({
        name,
        value: typeof value === 'number' ? value : Object.values(value)[0]
      }))
      if (sortDescending) {
        simpleData.sort((a, b) => b.value - a.value)
      }
      return simpleData
    }

    return Object.entries(data).flatMap(([category, values]) => {
      if (typeof values === 'number') {
        return [{ category, subCategory: category, value: values }]
      }
      return Object.entries(values).map(([subCategory, value]) => ({
        category,
        subCategory,
        value: value as number
      }))
    })
  }

  const preparedData = prepareData()

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={preparedData}
            layout={horizontal ? 'vertical' : 'horizontal'}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {horizontal ? (
              <YAxis dataKey={comparison ? "subCategory" : "name"} type="category" />
            ) : (
              <XAxis dataKey={comparison ? "subCategory" : "name"} />
            )}
            {horizontal ? <XAxis type="number" /> : <YAxis />}
            <Tooltip />
            <Legend />
            {comparison ? (
              <>
                <Bar dataKey="value" fill={COLORS[0]} name={(preparedData[0] as ComparisonDataPoint).category} />
                {preparedData.length > 1 && (
                  <Bar dataKey="value" fill={COLORS[1]} name={(preparedData[1] as ComparisonDataPoint).category} />
                )}
              </>
            ) : (
              <Bar dataKey="value" fill={COLORS[0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      )
    }

    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={preparedData as SimpleDataPoint[]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill={COLORS[0]}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {preparedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>
    </motion.div>
  )
}