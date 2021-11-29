import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { ReactElement, cloneElement } from "react";


interface ActiveLinkProps extends LinkProps{
  children: ReactElement;
  ActiveClassName: string;
}

export function ActiveLink({children, ActiveClassName, ...rest}: ActiveLinkProps){

  const {asPath} = useRouter()

  const className = asPath === rest.href
  ? ActiveClassName
  : '';

  return(
    <Link {...rest}>
      {cloneElement(children, {
        className,
      }) }
    </Link>
  )
}