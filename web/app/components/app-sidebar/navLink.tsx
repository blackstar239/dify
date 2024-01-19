'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import classNames from 'classnames'
import Link from 'next/link'

export type NavIcon = React.ComponentType<
React.PropsWithoutRef<React.ComponentProps<'svg'>> & {
  title?: string | undefined
  titleId?: string | undefined
}
>

export type NavLinkProps = {
  name: string
  href: string
  iconMap: {
    selected: NavIcon
    normal: NavIcon
  }
  mode?: string
}

export default function NavLink({
  name,
  href,
  iconMap,
  mode = 'expand',
}: NavLinkProps) {
  const segment = useSelectedLayoutSegment()
  const formattedSegment = (() => {
    let res = segment?.toLowerCase()
    // logs and annotations use the same nav
    if (res === 'annotations')
      res = 'logs'

    return res
  })()
  const isActive = href.toLowerCase().split('/')?.pop() === formattedSegment
  const NavIcon = isActive ? iconMap.selected : iconMap.normal

  return (
    <Link
      key={name}
      href={href}
      className={classNames(
        isActive ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
        'group flex items-center h-9 rounded-md py-2 text-sm font-normal',
        mode === 'expand' ? 'px-3' : 'px-2.5',
      )}
    >
      <NavIcon
        className={classNames(
          'h-4 w-4 flex-shrink-0',
          isActive ? 'text-primary-600' : 'text-gray-700',
          mode === 'expand' ? 'mr-2' : 'mr-0',
        )}
        aria-hidden="true"
      />
      {mode === 'expand' && name}
    </Link>
  )
}
