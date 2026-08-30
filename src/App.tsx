import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import { FinalCta, Footer } from './components/Sections'
import { WhatsAppFab } from './components/WhatsAppFab'
import { BackToTopButton } from './components/BackToTopButton'
import { DotBackdrop } from './components/DotBackdrop'
import { ScrollManager } from './components/navigation'
import { SeoManager } from './components/SeoManager'

import Home from './pages/Home'
import QuemSomos from './pages/QuemSomos'
import Servicos from './pages/Servicos'
import Contato from './pages/Contato'
import ComoFazemos from './pages/ComoFazemos'
import PorQueFazemos from './pages/PorQueFazemos'
import Checkout from './pages/Checkout'
import NaoEncontrada from './pages/NaoEncontrada'

export default function App() {
  const { pathname } = useLocation()

  return (
    <>
      <Loader />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <ScrollManager />
      <SeoManager />

      {/* key força remontagem por rota: o observer precisa reavaliar se existe
          um .hero na página nova. Só a home tem. */}
      <DotBackdrop key={pathname} />

      <Header />

      <div
        className={`page-background ${
          pathname === '/' ? 'has-final-reveal' : ''
        }`}
      >
        <main id="conteudo">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/como-fazemos" element={<ComoFazemos />} />
            <Route path="/por-que-fazemos" element={<PorQueFazemos />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NaoEncontrada />} />
          </Routes>
        </main>

        {pathname === '/' && <FinalCta />}
      </div>

      <Footer />
      <BackToTopButton />
      <WhatsAppFab />
    </>
  )
}
