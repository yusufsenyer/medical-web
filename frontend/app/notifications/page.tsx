"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { collection, getDocs, query, where, db } from '@/lib/firebase'
import { Bell } from 'lucide-react'

interface NotificationDoc {
  id: string
  user_email: string
  order_id?: string
  message: string
  createdAt?: string
}

export default function NotificationsPage() {
  const { isAuthenticated, user } = useAuth()
  const [items, setItems] = useState<NotificationDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        if (!user?.email) return
        const q = query(collection(db as any, 'notifications'), where('user_email', '==', user.email.toLowerCase()))
        const snap = await getDocs(q as any)
        const data: NotificationDoc[] = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() || {}) }))
        // sort by createdAt desc
        data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        setItems(data)
      } catch (e: any) {
        console.error(e)
        setError(e?.message || 'Bildirimler yüklenemedi')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.email])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Bildirimler</h1>
          <p className="text-sm text-muted-foreground">Hesabınıza iletilen güncellemeler</p>
        </div>
      </div>

      <Card className="overflow-hidden border-teal-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50/60">
          <CardTitle className="text-teal-700">Gelen Kutusu</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {!isAuthenticated ? (
            <div className="p-6 text-center text-gray-600">Bildirimleri görmek için giriş yapın.</div>
          ) : loading ? (
            <div className="p-6 text-center text-gray-600">Yükleniyor...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Henüz bildiriminiz yok.</p>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((n) => (
                <li key={n.id} className="p-4 flex items-start gap-3 hover:bg-teal-50/40 transition-colors">
                  <div className="mt-1 h-2 w-2 rounded-full bg-teal-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {n.order_id && (
                        <Badge variant="outline" className="border-teal-200 text-teal-700">Sipariş #{n.order_id}</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {n.createdAt ? new Date(n.createdAt).toLocaleString('tr-TR') : ''}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800 whitespace-pre-line break-words">{n.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
