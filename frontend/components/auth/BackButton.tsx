"use client"

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function BackButton({ 
  href = '/', 
  label = 'Ana Sayfaya Dön',
  className = ''
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  )
}
