import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="mb-6">Essa tela ainda não foi desenvolvida, mas você pode ver suas finanças</p>
      <Link href="/finances">
        <Button>Ver Finanças</Button>
      </Link>
    </div>
  )
}