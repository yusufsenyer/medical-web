import * as React from "react"
import { Toaster, toast } from "sonner"

interface UseToast {
  toast: (props: { title: string; description?: string; variant?: "default" | "destructive" }) => void
}

export const useToast = (): UseToast => {
  return {
    toast: ({ title, description, variant = "default" }) => {
      if (variant === "destructive") {
        toast.error(description || title)
      } else {
        toast.success(description || title)
      }
    }
  }
}

export function ToastProvider() {
  return <Toaster richColors position="top-right" />
}
