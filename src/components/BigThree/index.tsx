'use client'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { motion, MotionValue } from 'framer-motion'

import { BackgroundScanline } from '@components/BackgroundScanline'

import classes from './index.module.scss'

interface BigThreeProps {
  className?: string
  whiteOpacity?: MotionValue
  style?: CSSProperties
}

const BigThree: React.FC<BigThreeProps> = props => {
  const { className, whiteOpacity } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const defaultStyles = {
    '--mouse-x': 0,
    '--mouse-y': 0,
  } as CSSProperties
  const [gradientStyles, setGradientStyle] = useState<CSSProperties>(defaultStyles)

  useEffect(() => {
    let intersectionObserver: IntersectionObserver
    let scheduledAnimationFrame = false

    const updateMousePosition = e => {
      if (containerRef.current) {
        const boundingRect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - boundingRect.left
        const y = e.clientY - boundingRect.top

        const styles = {
          '--mouse-x': x,
          '--mouse-y': y,
        } as CSSProperties

        setGradientStyle(styles)
      }
      scheduledAnimationFrame = false
    }

    const handleMouseMovement = e => {
      if (scheduledAnimationFrame) {
        return
      }

      scheduledAnimationFrame = true
      requestAnimationFrame(function (timestamp) {
        updateMousePosition(e)
      })
    }

    if (containerRef.current) {
      intersectionObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              window.addEventListener('mousemove', handleMouseMovement)
            } else {
              window.removeEventListener('mousemove', handleMouseMovement)
            }
          })
        },
        {
          rootMargin: '0px',
        },
      )

      intersectionObserver.observe(containerRef.current)
    }

    return () => {
      if (intersectionObserver) intersectionObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMovement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  return (
    <div
      ref={containerRef}
      className={[className, classes.container].filter(Boolean).join(' ')}
      data-theme="dark"
    >
      <div className={classes.mask}>
        <div className={classes.gradient} style={gradientStyles} />
        <div className={classes.noise} />
        <div className={classes.black} />
      </div>
      <svg
        width="1601"
        height="855"
        viewBox="0 0 1601 855"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.stroke}
      >
        <path d="M628.256 616.221C628.256 744.592 518.389 854.458 322.942 854.458C134.433 854.458 14.1582 750.374 0.280273 594.248H147.155C154.094 680.984 221.17 737.653 322.942 737.653C424.713 737.653 486.007 686.767 486.007 605.813C486.007 522.545 422.4 482.068 328.724 482.068H243.144V368.731H326.411C403.896 368.731 466.347 334.037 466.347 246.143C466.347 174.441 417.774 117.773 326.411 117.773C229.266 117.773 172.598 182.536 166.815 265.804H25.7231C34.9751 122.398 139.059 0.966716 327.568 0.966716C513.763 0.966716 609.752 114.303 609.752 241.517C609.752 338.663 544.988 408.052 461.721 423.087C561.179 439.278 628.256 514.45 628.256 616.221Z" />
        <path d="M691.655 840.581V668.263H863.973V840.581H691.655Z" />
        <path d="M898.289 427.706C898.289 180.216 1034.76 0.959961 1249.86 0.959961C1464.97 0.959961 1600.28 180.216 1600.28 427.706C1600.28 675.195 1464.97 854.452 1249.86 854.452C1034.76 854.452 898.289 675.195 898.289 427.706ZM1053.26 427.706C1053.26 615.058 1118.02 734.176 1249.86 734.176C1380.55 734.176 1445.31 615.058 1445.31 427.706C1445.31 240.354 1380.55 121.235 1249.86 121.235C1118.02 121.235 1053.26 240.354 1053.26 427.706Z" />
      </svg>
    </div>
  )
}

export default BigThree
