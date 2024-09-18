'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'
import { useEffect, useState } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import getTooltipText from '@/lib/getTooltipText'
import { useActiveAccount, useConnectedWallets } from 'thirdweb/react'
import CreditCardPayModal from '../CreditCardPayModal'
import { Account } from 'thirdweb/wallets'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const {
    close,
    showTooltip,
    closeTooltip,
    isVisibleToolTip,
    isDialogOpen,
    tooltipX,
    tooltipY,
    clickMap,
    tooltipId,
    isCrossmintOpen,
    setIsCrossmintOpen,
  } = useDialog()

  const activeAccount: Account = useActiveAccount()
  const wallets = useConnectedWallets()
  const address = activeAccount?.address
  const [mapperKey, setMapperKey] = useState(0)
  const isExternalWallet = wallets?.[0]?.id !== 'inApp'

  useEffect(() => {
    const init = async () => {
      if (address) {
        const events: any = await getLoginEvents(address)
        if (!events?.length && !events.error) {
          await trackLoginPoints(address)
        }
        setMapperKey(Math.floor(Math.random() * 1000))
      }
    }

    if (!address) return

    init()
  }, [address])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden
      flex items-center justify-center bg-background"
      ref={containerRef}
      onClick={close}
    >
      <div className="cursor-pointer relative">
        <ImageMapper
          src="/images/home.jpeg"
          map={map}
          responsive
          parentWidth={(height / 914) * 1600}
          onMouseMove={(area, index, e) => showTooltip(area, e)}
          onMouseLeave={closeTooltip}
          onClick={(area) => clickMap(area, activeAccount, isExternalWallet)}
          key={mapperKey}
        />
      </div>
      {isVisibleToolTip && (
        <div
          className="bubble-name"
          style={{
            left: tooltipX,
            top: tooltipY,
          }}
        >
          {getTooltipText(tooltipId)}
        </div>
      )}
      {isDialogOpen && <Dialog />}
      {isCrossmintOpen && <CreditCardPayModal onClose={() => setIsCrossmintOpen(false)} />}
    </div>
  )
}

export default LandingPage
