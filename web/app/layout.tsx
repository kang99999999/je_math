import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gradient-to-br from-[#0b1020] via-[#0f1e3a] to-[#082b3a] text-white">
        {/* Navigation */}
        <nav className="
          sticky top-0 z-50
          backdrop-blur
          bg-[rgba(10,15,35,0.75)]
          border-b border-white/10
        ">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-semibold tracking-wide hover:opacity-80"
            >
              JE's Mathematics
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-6 text-sm text-white-400">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Link href="/posts" className="hover:text-white">
                Posts
              </Link>
              <Link href="/study" className="hover:text-white">
                Study Logs
              </Link>
              <Link
                href="/about"
                className="ml-4 px-3 py-1 border border-white/20 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  )
}
