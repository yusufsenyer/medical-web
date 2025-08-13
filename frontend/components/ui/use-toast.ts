import { Toast } from "@/components/ui/toast"

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

interface UseToast {
  toast: (props: { title: string; description?: string; variant?: "default" | "destructive" }) => void
}

export const useToast = (): UseToast => {
  return {
    toast: ({ title, description, variant = "default" }) => {
      // Implementation
    }
  }
}
