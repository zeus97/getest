import styles from './page.module.css'
import RegisterForm from '@/components/RegisterForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={'/empleados'}>Empleados</Link>
      <RegisterForm />
    </main>
  )
}
