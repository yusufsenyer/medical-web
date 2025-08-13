import * as React from "react"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

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
  return <Toaster />
}
