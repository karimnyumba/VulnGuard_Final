import { useState } from "react"
import { useScanSessions } from "./hooks/useScanSessions"
import { ScanTable } from "./components/ScanTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { ScanInput } from "../dashboard/components/ScanInput"
import Header from "@/components/layout/header"

interface CreateScanSessionForm {
  url: string
}

export default function ScanSessionsPage() {
  const { scanSessions, isLoading, startScan } = useScanSessions()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  console.log(scanSessions)

  const form = useForm<CreateScanSessionForm>({
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (data: CreateScanSessionForm) => {
    startScan.mutate(data.url, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <DashboardLayout>
         <Header date={date} setDate={setDate} />
    <div className="container mx-auto py-10">
      <div className="flex w-full justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Scan Sessions</h1>
        <ScanInput />
      </div>

      <ScanTable data={scanSessions} isLoading={isLoading} />
    </div>
    </DashboardLayout>
  )
} 