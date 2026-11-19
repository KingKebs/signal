import { Skeleton } from "@/components/ui/skeleton";

export default function LeadsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[200px] mb-2" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="flex justify-between items-center py-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="border rounded-md">
        <div className="h-12 border-b bg-muted/20 flex items-center px-4">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="divide-y">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center p-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[200px]" />
              </div>
              <Skeleton className="h-4 w-[120px] mx-4" />
              <Skeleton className="h-6 w-[60px] mx-4" />
              <Skeleton className="h-6 w-[80px] mx-4" />
              <Skeleton className="h-4 w-[100px] mx-4" />
              <Skeleton className="h-9 w-[90px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
