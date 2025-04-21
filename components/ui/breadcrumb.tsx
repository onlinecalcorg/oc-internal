"use client"

import Link from "next/link"

import * as React from "react"
import { cn } from "@/lib/utils"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <li ref={ref} className={cn("flex items-center", className)} {...props}>
        {children}
      </li>
    )
  },
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.HTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        href={props.href || ""}
        ref={ref}
        className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors", className)}
        {...props}
      >
        {children}
      </Link>
    )
  },
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn("flex items-center", className)} {...props}>
        {children}
      </ol>
    )
  },
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("mx-2 h-4 w-4 text-muted-foreground", className)} {...props} aria-hidden="true" />
    )
  },
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn("font-medium text-foreground", className)} {...props} aria-current="page" />
  },
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("font-medium text-foreground", className)} {...props}>
        ...
      </span>
    )
  },
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(({ className, children, ...props }, ref) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)} {...props} ref={ref}>
      {children}
    </nav>
  )
})
Breadcrumb.displayName = "Breadcrumb"

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
}
