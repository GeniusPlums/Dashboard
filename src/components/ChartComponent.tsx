"use client"

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

type ChartDataPoint = {
  name: string
  value: number
  [key: string]: string | number
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))']

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
        return [{ name: category, [category]: values, value: values }]
      }
      return Object.entries(values).map(([subCategory, value]) => ({
        name: subCategory,
        [category]: value,
        value: value as number
      }))
    })
  }

  const preparedData = prepareData()

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={preparedData} layout={horizontal ? 'vertical' : 'horizontal'}>
            {horizontal ? (
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
            ) : (
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
            )}
            {horizontal ? (
              <XAxis type="number" axisLine={false} tickLine={false} />
            ) : (
              <YAxis axisLine={false} tickLine={false} />
            )}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))'
              }}
            />
            {comparison ? (
              Object.keys(preparedData[0]).filter(key => key !== 'name' && key !== 'value').map((key, index) => (
                <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} radius={[4, 4, 0, 0]} />
              ))
            ) : (
              <Bar dataKey="value" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      )
    }

    if (type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={preparedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill={COLORS[0]}
              dataKey="value"
            >
              {preparedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  )
}