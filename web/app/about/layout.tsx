export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      {children}
    </main>
  )
}