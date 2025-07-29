"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const navItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Özellikler', href: '#features' },
  { name: 'Fiyatlandırma', href: '/pricing' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'İletişim', href: '#contact' }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WebBuilder Pro
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
              <Link href="/auth/profile">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <User className="h-4 w-4" />
                  <span>{user?.firstName || user?.email}</span>
                </Button>
              </Link>

              {user?.role === 'admin' ? (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
                    Admin Panel
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
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
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
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
                  <Link href="/auth/profile">
                    <Button variant="ghost" className="w-full justify-start flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <User className="h-4 w-4" />
                      <span>{user?.firstName || user?.email}</span>
                    </Button>
                  </Link>

                  {user?.role === 'admin' ? (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
                        Admin Panel
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
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
                    <Button variant="ghost" className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300">
                      Kayıt Ol
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}