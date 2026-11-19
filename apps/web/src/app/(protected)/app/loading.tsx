import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Top KPI Row Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-border shadow-sm flex flex-col h-[120px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <Skeleton className="h-8 w-[80px] mb-2" />
              <Skeleton className="h-3 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border shadow-sm h-[350px]">
          <CardHeader className="pb-6">
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-6 flex-1 mx-4 rounded-full" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-border shadow-sm h-[350px]">
          <CardHeader className="pb-6">
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-7">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-2 w-2 rounded-full mr-4" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                  <Skeleton className="h-3 w-[60px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row Skeleton */}
      <Card className="border-border shadow-sm h-[400px]">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <Skeleton className="h-9 w-[100px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
