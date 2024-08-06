import { useState } from 'react'
import useIsMobile from './useIsMobile'
import { Address } from 'viem'
import { useConnect } from 'wagmi'
import { useRouter } from 'next/navigation'

const useDialog = () => {
  const [tooltipId, setTooltipId] = useState('connect')
  const isMobile = useIsMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const { connectors, connect } = useConnect()
  const connector = connectors[0]
  const { push } = useRouter()

  const show = () => {
    setIsVisibleTooltip(isMobile)
    setIsDialogOpen(true)
  }

  const close = () => {
    if (!isDialogOpen) return
    setIsDialogOpen(false)
  }

  const closeTooltip = () => {
    setIsVisibleTooltip(false)
  }

  const showTooltip = (area: any, e: any) => {
    if (isDialogOpen) return
    setTooltipId(area.id)
    setIsVisibleTooltip(true)
    const x = e.clientX
    const y = e.clientY

    setTooltipX(x)
    setTooltipY(y)
  }

  const tooltipText = () => {
    switch (tooltipId) {
      case 'connect':
        return `El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set`
      case 'leaderboard':
        return 'Leaderboard'
    }
  }

  const clickMap = (area: any, connectedWallet: Address) => {
    if (area.id === 'connect') {
      if (connectedWallet) {
        show()
        return
      }

      connect({ connector })
      return
    }

    if (area.id === 'leaderboard') {
      push('/leaderboard')
    }
  }

  return {
    isDialogOpen,
    isVisibleToolTip,
    tooltipX,
    tooltipY,
    showTooltip,
    show,
    close,
    closeTooltip,
    tooltipText,
    clickMap,
  }
}

export default useDialog
