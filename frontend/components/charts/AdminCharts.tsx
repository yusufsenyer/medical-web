'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, TrendingUp, Users, Package } from 'lucide-react'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

import type { Order, User } from '@/lib/store'

interface AdminChartsProps {
  orders: Order[]
  users: User[]
}

type TimeRange = 'weekly' | 'monthly' | 'yearly'

export function AdminCharts({ orders, users }: AdminChartsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly')

  // Process data based on time range
  const processedData = useMemo(() => {
    const now = new Date()
    let startDate: Date

    switch (timeRange) {
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        break
      case 'yearly':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        break
    }

    const filteredOrders = orders.filter(order => {
      if (!order.id) return false // Skip orders without ID
      const orderDate = new Date(order.created_at || order.createdAt || Date.now())
      return orderDate >= startDate
    })

    const filteredUsers = users.filter(user => {
      if (!user.id) return false // Skip users without ID
      const userDate = new Date(user.createdAt || user.created_at || Date.now())
      return userDate >= startDate
    })

    return { filteredOrders, filteredUsers, startDate, endDate: now }
  }, [orders, users, timeRange])

  // Status distribution data
  const statusData = useMemo(() => {
    const statusCounts: Record<string, number> = {}
    processedData.filteredOrders.forEach(order => {
      if (!order.id) return // Skip orders without ID
      const status = order.status || 'pending'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    const colors = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#8b5cf6',
      delivered: '#10b981'
    }

    return {
      series: Object.values(statusCounts),
      labels: Object.keys(statusCounts).map(status => {
        const statusText = {
          pending: 'Bekliyor',
          'in-progress': 'Devam Ediyor',
          completed: 'Tamamlandı',
          delivered: 'Teslim Edildi'
        }[status] || status
        return statusText
      }),
      colors: Object.keys(statusCounts).map(status => colors[status as keyof typeof colors] || '#6b7280')
    }
  }, [processedData.filteredOrders])

  // Monthly orders data
  const monthlyOrdersData = useMemo(() => {
    const ordersByMonth: Record<string, number> = {}
    const revenueByMonth: Record<string, number> = {}

    processedData.filteredOrders.forEach(order => {
      if (!order.id) return // Skip orders without ID
      const date = new Date(order.created_at || order.createdAt || Date.now())
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      ordersByMonth[monthKey] = (ordersByMonth[monthKey] || 0) + 1
      revenueByMonth[monthKey] = (revenueByMonth[monthKey] || 0) + (order.total_price || order.totalPrice || 0)
    })

    const sortedMonths = Object.keys(ordersByMonth).sort()
    
    return {
      categories: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-')
        const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
        return `${monthNames[parseInt(monthNum) - 1]} ${year}`
      }),
      orders: sortedMonths.map(month => ordersByMonth[month]),
      revenue: sortedMonths.map(month => revenueByMonth[month])
    }
  }, [processedData.filteredOrders])

  // User statistics data
  const userStatsData = useMemo(() => {
    const usersByMonth: Record<string, number> = {}
    const onlineUsersByMonth: Record<string, number> = {}

    processedData.filteredUsers.forEach(user => {
      if (!user.id) return // Skip users without ID
      const date = new Date(user.createdAt || user.created_at || Date.now())
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      usersByMonth[monthKey] = (usersByMonth[monthKey] || 0) + 1
      
      // Simulate online users (in real app, this would come from active sessions)
      const lastLogin = new Date(user.lastLogin || user.last_login || Date.now())
      const isRecentlyActive = (Date.now() - lastLogin.getTime()) < 24 * 60 * 60 * 1000 // 24 hours
      if (isRecentlyActive) {
        onlineUsersByMonth[monthKey] = (onlineUsersByMonth[monthKey] || 0) + 1
      }
    })

    const sortedMonths = Object.keys(usersByMonth).sort()
    
    return {
      categories: sortedMonths.map(month => {
        const [year, monthNum] = month.split('-')
        const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
        return `${monthNames[parseInt(monthNum) - 1]} ${year}`
      }),
      newUsers: sortedMonths.map(month => usersByMonth[month]),
      onlineUsers: sortedMonths.map(month => onlineUsersByMonth[month] || 0)
    }
  }, [processedData.filteredUsers])

  // Average orders per user
  const avgOrdersPerUser = useMemo(() => {
    const userOrderCounts: Record<string, number> = {}
    
    processedData.filteredOrders.forEach(order => {
      if (!order.id) return // Skip orders without ID
      const userEmail = order.customer_email || order.customerEmail || 'unknown'
      userOrderCounts[userEmail] = (userOrderCounts[userEmail] || 0) + 1
    })

    const orderCounts = Object.values(userOrderCounts)
    const average = orderCounts.length > 0 ? orderCounts.reduce((a, b) => a + b, 0) / orderCounts.length : 0

    return {
      series: [Math.round(average * 100) / 100],
      labels: ['Ortalama Sipariş']
    }
  }, [processedData.filteredOrders])

  // Chart options
  const donutOptions = {
    chart: {
      type: 'donut' as const,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#374151'
            },
            value: {
              show: true,
              fontSize: '18px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: '#111827'
            },
            total: {
              show: true,
              label: 'Toplam',
              fontSize: '14px',
              fontWeight: 600,
              color: '#6b7280'
            }
          }
        }
      }
    },
    stroke: {
      width: 0
    },
    legend: {
      position: 'bottom' as const,
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: (value: number) => `${value} sipariş`
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const lineOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#0ea5e9', '#8b5cf6'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: monthlyOrdersData.categories,
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: 'Sipariş Sayısı',
          style: {
            color: '#0ea5e9',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }
        },
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Gelir (₺)',
          style: {
            color: '#8b5cf6',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }
        },
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          formatter: (value: number) => `₺${value.toLocaleString('tr-TR')}`
        }
      }
    ],
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: (value: number, { seriesIndex }: any) => {
          if (seriesIndex === 0) return `${value} sipariş`
          return `₺${value.toLocaleString('tr-TR')}`
        }
      }
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'left' as const,
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    colors: ['#0ea5e9', '#8b5cf6']
  }

  const barOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        distributed: false,
        dataLabels: {
          position: 'top'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#10b981', '#059669'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: userStatsData.categories,
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Kullanıcı Sayısı',
        style: {
          color: '#10b981',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: (value: number) => `${value} kullanıcı`
      }
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'left' as const,
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    colors: ['#10b981', '#3b82f6']
  }

  const gaugeOptions = {
    chart: {
      type: 'radialBar' as const,
      height: 200,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: '70%'
        },
        track: {
          background: '#e5e7eb',
          strokeWidth: '97%',
          margin: 5
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            color: '#374151',
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: '#111827',
            offsetY: 5,
            formatter: (value: number) => value.toFixed(1)
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#0ea5e9', '#8b5cf6'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    colors: ['#0ea5e9']
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              <span className="font-medium text-gray-700">Zaman Aralığı</span>
            </div>
            <div className="flex space-x-2">
              {(['weekly', 'monthly', 'yearly'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? 'bg-gradient-to-r from-teal-500 to-sky-600' : ''}
                >
                  {range === 'weekly' && 'Haftalık'}
                  {range === 'monthly' && 'Aylık'}
                  {range === 'yearly' && 'Yıllık'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Donut Chart */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-teal-600" />
              <span>Sipariş Durumu Dağılımı</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={donutOptions}
              series={statusData.series}
              type="donut"
              height={300}
            />
          </CardContent>
        </Card>

        {/* Average Orders Per User Gauge */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <span>Kullanıcı Başına Ortalama Sipariş</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Chart
              options={gaugeOptions}
              series={avgOrdersPerUser.series}
              type="radialBar"
              height={200}
            />
          </CardContent>
        </Card>

        {/* Monthly Orders Line Chart */}
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              <span>Aylık Sipariş ve Gelir Trendi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={lineOptions}
              series={[
                {
                  name: 'Sipariş Sayısı',
                  data: monthlyOrdersData.orders
                },
                {
                  name: 'Gelir (₺)',
                  data: monthlyOrdersData.revenue
                }
              ]}
              type="line"
              height={350}
            />
          </CardContent>
        </Card>

        {/* User Statistics Bar Chart */}
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-teal-600" />
              <span>Kullanıcı İstatistikleri</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              options={barOptions}
              series={[
                {
                  name: 'Yeni Kullanıcılar',
                  data: userStatsData.newUsers
                },
                {
                  name: 'Aktif Kullanıcılar',
                  data: userStatsData.onlineUsers
                }
              ]}
              type="bar"
              height={350}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
