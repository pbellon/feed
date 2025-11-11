import Container from "@mui/material/Container";
import { Suspense } from "react";

import { LoadingPlaceholder } from "@/lib/ui/LoadingPlaceholder";
import NavBar, { NavBarSkeleton } from "@/lib/ui/NavBar";

type ConsoleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ websiteId: string }>;
}>;

async function Layout({ children, params }: ConsoleLayoutProps) {
  const { websiteId } = await params;
  return (
    <>
      <Suspense fallback={<NavBarSkeleton />}>
        <NavBar websiteId={websiteId} />
      </Suspense>

      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
}

export default function ConsoleLayout({
  children,
  params,
}: ConsoleLayoutProps) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Layout params={params}>{children}</Layout>
    </Suspense>
  );
}
