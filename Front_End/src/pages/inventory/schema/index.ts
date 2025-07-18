import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const MedicineFormSchema = z.object({
    name: z.string().min(2, {
      message: "Medicine name must be at least 2 characters.",
    }),
    manufacturer: z.union([z.string(), z.number()]),
    dosage: z.string().optional(),
    unit: z.union([z.string(), z.number()]),
    category: z.union([z.string(), z.number()]),
    sellPrice: z.number().or(
      z.string().refine((val) => !isNaN(Number.parseFloat(val)), {
        message: "Price must be a valid number.",
      }),
    ),
    quantity: z.string().refine((val) => !isNaN(Number.parseInt(val)), {
      message: "Quantity must be a valid number.",
    }),
  })

export const UpdateStockSchema = z.object({
  quantity: z.string().refine((val) => !isNaN(Number.parseInt(val)), {
    message: "Quantity must be a valid number.",
  }),
  batchId: z.string().refine((val) => !isNaN(Number.parseInt(val)), {
    message: "Batch must be selected.",
  }),
  pricePerUnit: z.string().refine((val) => !isNaN(Number.parseFloat(val)), {
    message: "Price per unit must be a valid number.",
  }),

})