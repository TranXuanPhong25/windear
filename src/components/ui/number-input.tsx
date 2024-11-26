import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from 'lucide-react'

interface NumberInputProps {
    initialValue?: number
    min?: number
    max?: number
    step?: number
    onChange?: (value: number) => void
    className?: string
    id?: string
}

export function NumberInput({
                                initialValue = 0,
                                min = -Infinity,
                                max = Infinity,
                                step = 1,
                                onChange,
                                className = '',
                                id=""
                            }: NumberInputProps) {
    const [value, setValue] = useState<number>(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value)
        if (!isNaN(newValue)) {
            updateValue(newValue)
        }
    }

    const updateValue = (newValue: number) => {
        const clampedValue = Math.min(Math.max(newValue, min), max)
        setValue(clampedValue)
        onChange?.(clampedValue)
    }

    const increment = () => updateValue(value + step)
    const decrement = () => updateValue(value - step)

    return (
        <div className={`flex items-center ${className}`}>
            <Button
                variant="outline"
                size="icon"
                onClick={decrement}
                disabled={value <= min}
                className="rounded-r-none dark:text-white"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                id={id}
                type="number"
                value={value}
                onChange={handleInputChange}
                className="w-20 text-center rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:text-white"
                min={min}
                max={max}
                step={step}
            />
            <Button
                variant="outline"
                size="icon"
                onClick={increment}
                disabled={value >= max}
                className="rounded-l-none dark:text-white"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

