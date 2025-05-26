import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-3 md:px-6">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-trust-primary/5 via-background to-trust-accent/5 py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Skeleton className="mx-auto mb-4 h-6 w-32" />
            <Skeleton className="mx-auto mb-4 h-12 w-96" />
            <Skeleton className="mx-auto mb-6 h-6 w-80" />
            <Skeleton className="mx-auto h-10 w-64" />
          </div>
        </div>
      </section>

      {/* Quick Navigation Skeleton */}
      <section className="py-6 border-b">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Skeleton className="mx-auto mb-4 h-6 w-48" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-center">
                    <Skeleton className="mx-auto mb-2 h-4 w-24" />
                    <Skeleton className="mx-auto h-3 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Table Skeleton */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 text-center">
              <Skeleton className="mx-auto mb-2 h-8 w-64" />
              <Skeleton className="mx-auto h-4 w-80" />
            </div>

            {/* Table Header Skeleton */}
            <div className="mb-4 hidden md:block">
              <div className="grid grid-cols-4 gap-4 rounded-lg bg-muted p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-20" />
                ))}
              </div>
            </div>

            {/* Table Rows Skeleton */}
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="md:hidden">
                      <div className="flex items-center justify-between">
                        <div>
                          <Skeleton className="mb-1 h-6 w-20" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <div className="hidden md:grid md:grid-cols-4 md:gap-4 md:items-center">
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
