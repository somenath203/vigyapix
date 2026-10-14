import { Loader2 } from "lucide-react";

import { Wordmark } from "./landing_page_components/Shared";


const LoadUserDataLoading = () => {

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">

      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-6 text-center"
      >

        <Wordmark />

        <Loader2
          className="size-8 animate-spin text-primary motion-reduce:animate-none"
          aria-hidden="true"
        />

        <div className="space-y-1">

          <p className="text-base font-medium text-foreground">Loading...</p>

          <p className="text-sm text-muted-foreground">
            Getting your workspace ready
          </p>

        </div>

      </div>

    </main>
  );

};

export default LoadUserDataLoading;