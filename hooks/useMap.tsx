import { CustomArea } from 'react-img-mapper'
import { useState } from 'react'
import usePurchase from './usePurchase'

const useMap = () => {
  const [mapperKey, setMapperKey] = useState(0)
  const { isCrossmintOpen, setIsCrossmintOpen, mint, purchasing } = usePurchase()
  const [isSpinampOpen, setIsSpinampOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isHybersubOpen, setIsHybersubOpen] = useState(false)
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false)

  const clickMap = (area: CustomArea) => {
    if (area.id === 'spinamp') setIsSpinampOpen(!isSpinampOpen)
    if (area.id === 'leaderboard') setIsLeaderboardOpen(!isLeaderboardOpen)
    if (area.id === 'metadata') setIsMetadataOpen(!isMetadataOpen)
    if (area.id === 'video') setIsVideoOpen(!isVideoOpen)
    if (area.id === 'merch') window.open('http://shopxcelencia.com/', '_blank')
    if (area.id === 'live-show') window.open('https://xcelencia.world', '_blank')
    if (area.id === 'mint') mint()
    if (area.id === 'subscribe') setIsHybersubOpen(!isHybersubOpen)
    if (area.id === 'control') setIsGuestbookOpen(!isGuestbookOpen)
  }

  return {
    clickMap,
    isCrossmintOpen,
    setIsCrossmintOpen,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    mapperKey,
    setMapperKey,
    purchasing,
    isSpinampOpen,
    setIsSpinampOpen,
    isMetadataOpen,
    setIsMetadataOpen,
    isVideoOpen,
    setIsVideoOpen,
    isHybersubOpen,
    setIsHybersubOpen,
    isGuestbookOpen,
    setIsGuestbookOpen,
  }
}

export default useMap
