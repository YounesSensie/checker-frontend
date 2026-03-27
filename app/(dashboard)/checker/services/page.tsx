// app/(checker)/services/page.tsx
// Server Component — entry point for the Checker Services page.

//import { Suspense } from "react";
//import { BookingFilter } from "./_components/types-services";
//import { ServicesListSkeleton } from "./_components/services-list";
//import { AsyncBookings, AsyncServices } from "./_components/Asycsection";
//import { BookingsListSkeleton } from "./_components/booking-list";
//import { getSession } from "@/auth";
//import { redirect } from "next/navigation";
//import prisma from "@/lib/db";




//interface PageProps {
  //searchParams: Promise<{ filter?: string }>;
//}

//function parseFilter(raw?: string): BookingFilter {
  //if (raw === "PENDING" || raw === "CONFIRMED") return raw;
  //return "ALL";
//}

{/*export  default async function CheckerServicesPage({ searchParams }: PageProps) {
  const filterdata = (await searchParams).filter
  const filter = parseFilter(filterdata);
  const session = await getSession()
  if(!session || !session.user){
    redirect('/sign-in')
  }
  const user = await prisma.user.findUnique({
    where:{
      id:session.user.id
    },
    select:{
      checkerProfile:true,

    }
  })
 if (!user || !user.checkerProfile){
  redirect('/sign-in')
 }
  return (
    <main className="flex flex-col grow p-6 md:px-10 md:py-8 gap-10 max-w-7xl mx-auto w-full">
    
   //   <Suspense fallback={<ServicesListSkeleton />}>
        
     //   <AsyncServices checkerId={user?.checkerProfile?.id} />
      //</Suspense>

   
      <Suspense key={filter} fallback={<BookingsListSkeleton />}>
        
        <AsyncBookings checkerId={session.user.id} filter={filter} />
      </Suspense>
    </main>
  );
}
*/}
import { getSession } from '@/auth'
import ComingSoon from '@/components/comming-soon'
import { redirect } from 'next/navigation'
import React from 'react'

const ServicesPage = async() => {
   const session = await getSession()
          if(!session || !session.user.id){
            redirect('/sign-in')
          }
          if(session.user.role !== "CHECKER"){
            redirect('/')
          }
    return (
      <div>
        <ComingSoon/>
      </div>
    )
}

export default ServicesPage