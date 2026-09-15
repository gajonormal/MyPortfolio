import Header from "@/components/Header";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeWrapper>
      <Header />
      <main>{children}</main>
    </ThemeWrapper>
  );
}
