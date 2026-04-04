import "./globals.css";

// Root layout is a minimal pass-through.
// The real layout with metadata, providers, and locale is in [locale]/layout.tsx.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
