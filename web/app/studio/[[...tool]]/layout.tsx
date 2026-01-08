export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{ minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
