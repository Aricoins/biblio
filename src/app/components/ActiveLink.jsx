import { useRouter } from 'next/navigation'
import Link from 'next/link'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const isActive = router.asPath === href

  const sty = {
    marginRight: 10,
    backgroundColor: isActive ? 'red' : 'black',
    color: isActive ? 'white' : 'black',
    // Add more specific styles if needed (e.g., fontWeight)
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Link href={href} onClick={handleClick} style={sty}>
      {children}
    </Link>
  )
}

export default ActiveLink
