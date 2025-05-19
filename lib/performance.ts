export const measurePerformance = (label: string) => {
  if (process.env.NODE_ENV === "development") {
    console.time(label)
    return () => console.timeEnd(label)
  }
  return () => {}
}

export const measureAsyncPerformance = async <T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> => {
  const end = measurePerformance(label)
  try {
    return await fn()
  } finally {
    end()
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const memoize = <T extends (...args: any[]) => any>(
  fn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map()
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
} 