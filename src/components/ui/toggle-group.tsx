
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

// Define separate props for single and multiple toggle groups
type ToggleGroupBaseProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    className?: string
  }

type ToggleGroupSingleProps = ToggleGroupBaseProps & {
  type: "single"
  value?: string
  defaultValue?: string
}

type ToggleGroupMultipleProps = ToggleGroupBaseProps & {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
}

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, type, ...props }, ref) => {
  // Proper type casting based on the 'type' prop
  if (type === "multiple") {
    return (
      <ToggleGroupPrimitive.Root
        type="multiple"
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props as ToggleGroupMultipleProps}
      >
        <ToggleGroupContext.Provider value={{ variant, size }}>
          {children}
        </ToggleGroupContext.Provider>
      </ToggleGroupPrimitive.Root>
    )
  }
  
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props as ToggleGroupSingleProps}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
})

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, value, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      value={value || ""}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
