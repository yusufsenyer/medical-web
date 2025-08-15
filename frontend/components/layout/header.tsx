"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, User, LogOut, Bell } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { collection, getDocs, query, where, db } from '@/lib/firebase'

const navItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Özellikler', href: '#features' },
  { name: 'Fiyatlandırma', href: '/pricing' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'İletişim', href: '#contact' }
]

interface NotificationDoc {
  id: string
  user_email: string
  order_id?: string
  message: string
  createdAt?: string
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [notifItems, setNotifItems] = useState<NotificationDoc[]>([])
  const [notifLoading, setNotifLoading] = useState(false)
  const [notifError, setNotifError] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  // Load notifications when opening the modal
  useEffect(() => {
    const loadNotifs = async () => {
      if (!isNotifOpen) return
      if (!user?.email) return
      try {
        setNotifLoading(true)
        setNotifError(null)
        const q = query(collection(db as any, 'notifications'), where('user_email', '==', user.email.toLowerCase()))
        const snap = await getDocs(q as any)
        const data: NotificationDoc[] = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() || {}) }))
        data.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        setNotifItems(data)
      } catch (e: any) {
        console.error(e)
        setNotifError(e?.message || 'Bildirimler yüklenemedi')
      } finally {
        setNotifLoading(false)
      }
    }
    loadNotifs()
  }, [isNotifOpen, user?.email])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" suppressHydrationWarning>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-600">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            MedWebify
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {user?.role !== 'admin' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotifOpen(true)}
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                  aria-label="Bildirimler"
                >
                  <Bell className="h-4 w-4" />
                </Button>
              )}
              <Link href="/auth/profile">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                  <User className="h-4 w-4" />
                  <span>{user?.firstName || user?.email}</span>
                </Button>
              </Link>
              {user?.role === 'admin' ? (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                    Admin Panel
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                    Siparişlerim
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Çıkış
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                  Kayıt Ol
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {isAuthenticated ? (
                <>
                  {user?.role !== 'admin' && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                      onClick={() => { setIsNotifOpen(true); setIsOpen(false) }}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Bildirimler
                    </Button>
                  )}
                  <Link href="/auth/profile">
                    <Button variant="ghost" className="w-full justify-start flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                      <User className="h-4 w-4" />
                      <span>{user?.firstName || user?.email}</span>
                    </Button>
                  </Link>

                  {user?.role === 'admin' ? (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                        Admin Panel
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                        Siparişlerim
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300">
                      Kayıt Ol
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications Modal */}
      <Dialog open={isNotifOpen} onOpenChange={setIsNotifOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Bildirimler</DialogTitle>
          </DialogHeader>
          <Card className="border-teal-100">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50/60 py-3">
              <CardTitle className="text-sm text-teal-700">Gelen Kutusu</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {!isAuthenticated ? (
                <div className="p-6 text-center text-gray-600">Bildirimleri görmek için giriş yapın.</div>
              ) : notifLoading ? (
                <div className="p-6 text-center text-gray-600">Yükleniyor...</div>
              ) : notifError ? (
                <div className="p-6 text-center text-red-600">{notifError}</div>
              ) : notifItems.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">Henüz bildiriminiz yok.</div>
              ) : (
                <ul className="divide-y">
                  {notifItems.map((n) => (
                    <li key={n.id} className="p-4">
                      <div className="flex items-start gap-3">
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
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </header>
  )
}