import { cn } from '../utils/cn'

export default function Container({ className, children }) {
  return (
    <div className={cn('h-full container mx-auto ', className)}>{children}</div>
  )
}
