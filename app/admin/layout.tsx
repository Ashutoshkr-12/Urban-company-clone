import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import  { ReactNode } from 'react'

const Layout = async({ children }: {children: ReactNode}) => {

    const { sessionClaims } = await auth();
    const role = (sessionClaims?.publicMetadata as { role?: string } | undefined)?.role;
  
    // if(role !== 'ADMIN') redirect('/')

   return <>{children}</> 
  
}

export default Layout