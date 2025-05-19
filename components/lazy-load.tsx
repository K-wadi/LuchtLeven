"use client"

import { Suspense, lazy, ComponentType } from "react"
import { LoadingState } from "./loading-state"

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
}

export const LazyLoad = ({ component, fallback }: LazyLoadProps) => {
  const Component = lazy(component)

  return (
    <Suspense fallback={fallback || <LoadingState />}>
      <Component />
    </Suspense>
  )
} 