export default function ValidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypass the main layout - full screen validation interface
  return <>{children}</>;
}
