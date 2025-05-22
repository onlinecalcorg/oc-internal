import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DollarsToRupeesLoading() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-6">
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />

          <Card className="mb-8">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
          </div>

          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-64 w-full mb-4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              <div className="pt-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
              </div>

              <div className="pt-4">
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
