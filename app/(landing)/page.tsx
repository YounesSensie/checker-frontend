import React from 'react'
import MainHero from './_component/hero'
import FeaturesComp from './_component/feautures'
import AddBanner from './_component/add-banner'
import Footer from './_component/footer'
import ContactForm from './_component/contact/new-contcatfile'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import FeaturesSection from './_component/recomanded-hotel'
import AboutUsSection from './_component/aboutus/about-us'


const HomePage = async() => {
  const session = await getSession()
    if(session && session.user.id && session.user.role){
      redirect(`/${session.user.role.toLocaleLowerCase()}`)
    }
  return (
    <div className=' h-full'>
      {/** hero compoent */}
      <MainHero/>
      {/* Popular Destinations Section */}
       <FeaturesComp/>
      {/* Add Banner Section */}
      <AddBanner />
      <FeaturesSection/>
      <AboutUsSection/>
      <ContactForm/>
      <Footer />
    </div>
  )
}

export default HomePage
