'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import useDialog from '@/hooks/useDialog'
import Dialog from './Dialog'
import { useEffect } from 'react'
import getLoginEvents from '@/lib/stack/getLoginPoints'
import trackLoginPoints from '@/lib/stack/trackLoginPoints'
import getTooltipText from '@/lib/getTooltipText'
import { useActiveAccount } from 'thirdweb/react'
import CreditCardPayModal from '../CreditCardPayModal'
import { Account } from 'thirdweb/wallets'
import useMap from '@/hooks/useMap'

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
    tooltipId,
    show,
  } = useDialog()

  const { clickMap, isCrossmintOpen, setIsCrossmintOpen, mapperKey, setMapperKey, purchasing } =
    useMap()

  const activeAccount: Account = useActiveAccount()
  const address = activeAccount?.address

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onClick={(area) => clickMap(area, show)}
          key={mapperKey}
          disabled={purchasing}
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
