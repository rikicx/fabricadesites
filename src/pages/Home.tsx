import { Hero } from '../components/Hero'
import { Clients } from '../components/Clients'
import { Portfolio } from '../components/Portfolio'
import { Process } from '../components/Process'
import { AiDirection, Faq, Packages, Plan, Why } from '../components/Sections'

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Portfolio />
      <Process />
      <AiDirection />
      <Why />
      <Packages />
      <Plan />
      <Faq />
    </>
  )
}
