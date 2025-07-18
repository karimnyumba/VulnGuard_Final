import { toast } from "sonner"

type NotificationType = "success" | "error" | "info" | "warning"

interface NotificationOptions {
  title?: string
  description?: string
  duration?: number
}

export function useNotification() {
  const notify = (
    type: NotificationType,
    message: string,
    options: NotificationOptions = {}
  ) => {
    const { title, description, duration = 3000 } = options

    switch (type) {
      case "success":
        toast.success(title || message, {
          description,
          duration,
        })
        break
      case "error":
        toast.error(title || message, {
          description,
          duration,
        })
        break
      case "info":
        toast.info(title || message, {
          description,
          duration,
        })
        break
      case "warning":
        toast.warning(title || message, {
          description,
          duration,
        })
        break
    }
  }

  return {
    success: (message: string, options?: NotificationOptions) =>
      notify("success", message, options),
    error: (message: string, options?: NotificationOptions) =>
      notify("error", message, options),
    info: (message: string, options?: NotificationOptions) =>
      notify("info", message, options),
    warning: (message: string, options?: NotificationOptions) =>
      notify("warning", message, options),
  }
} 