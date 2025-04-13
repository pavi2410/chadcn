// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import React from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [count, setCount] = React.useState(0)

  return (
    <Button
      onClick={() => {
        setCount(count + 1)
      }}
    >
      Add 1 to {count}?
    </Button>
  )
}