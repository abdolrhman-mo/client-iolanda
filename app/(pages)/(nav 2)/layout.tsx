import '@/app/ui/global.css'
import { poppins } from '@/app/ui/fonts'
import CheckoutNav from '@/app/ui/checkout/checkout-nav'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body className={`${poppins.className} antialiased`}>
        <CheckoutNav />
        {children}
    </body>
  )
}
