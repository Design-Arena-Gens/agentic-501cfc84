'use client'

import { useState, useEffect, useRef } from 'react'

interface World {
  id: number
  name: string
  icon: string
  description: string
  type: string
  inhabitants: number
  terrain: string
}

const worlds: World[] = [
  {
    id: 1,
    name: 'Crystal Peaks',
    icon: '⛰️',
    description: 'Majestic mountains made of luminescent crystals that change color with the seasons',
    type: 'Mountain',
    inhabitants: 12000,
    terrain: 'Rocky'
  },
  {
    id: 2,
    name: 'Nebula Forest',
    icon: '🌲',
    description: 'An enchanted forest where trees glow with ethereal cosmic energy',
    type: 'Forest',
    inhabitants: 45000,
    terrain: 'Dense'
  },
  {
    id: 3,
    name: 'Azure Depths',
    icon: '🌊',
    description: 'Underwater civilization with bioluminescent coral cities',
    type: 'Ocean',
    inhabitants: 78000,
    terrain: 'Aquatic'
  },
  {
    id: 4,
    name: 'Crimson Dunes',
    icon: '🏜️',
    description: 'Vast desert with shifting red sands and ancient ruins',
    type: 'Desert',
    inhabitants: 8000,
    terrain: 'Sandy'
  },
  {
    id: 5,
    name: 'Sky Citadel',
    icon: '☁️',
    description: 'Floating islands suspended in the clouds with gravity-defying architecture',
    type: 'Sky',
    inhabitants: 32000,
    terrain: 'Aerial'
  },
  {
    id: 6,
    name: 'Ember Plains',
    icon: '🔥',
    description: 'Volcanic grasslands where fire and life coexist in harmony',
    type: 'Volcanic',
    inhabitants: 15000,
    terrain: 'Volcanic'
  }
]

export default function Home() {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (selectedWorld && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)

      let animationId: number
      let time = 0

      const drawWorld = () => {
        const width = canvas.width / 2
        const height = canvas.height / 2

        // Clear canvas
        ctx.clearRect(0, 0, width, height)

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height)

        switch(selectedWorld.type) {
          case 'Mountain':
            gradient.addColorStop(0, '#1a1a2e')
            gradient.addColorStop(1, '#4a4e69')
            break
          case 'Forest':
            gradient.addColorStop(0, '#0f2027')
            gradient.addColorStop(1, '#2c5364')
            break
          case 'Ocean':
            gradient.addColorStop(0, '#000428')
            gradient.addColorStop(1, '#004e92')
            break
          case 'Desert':
            gradient.addColorStop(0, '#cb2d3e')
            gradient.addColorStop(1, '#ef473a')
            break
          case 'Sky':
            gradient.addColorStop(0, '#84fab0')
            gradient.addColorStop(1, '#8fd3f4')
            break
          case 'Volcanic':
            gradient.addColorStop(0, '#2c0703')
            gradient.addColorStop(1, '#c31432')
            break
        }

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Draw animated particles
        for (let i = 0; i < 100; i++) {
          const x = (i * 137.5 + time * 0.5) % width
          const y = (Math.sin(i + time * 0.01) * 50 + height / 2 + Math.cos(i * 0.5 + time * 0.02) * 100) % height
          const size = Math.sin(i + time * 0.02) * 2 + 3

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(i + time * 0.02) * 0.3 + 0.4})`
          ctx.fill()
        }

        // Draw terrain-specific elements
        if (selectedWorld.type === 'Mountain') {
          // Draw mountains
          for (let i = 0; i < 5; i++) {
            ctx.beginPath()
            ctx.moveTo(i * (width / 4) - 50, height)
            ctx.lineTo(i * (width / 4) + width / 8, height - 200 - Math.sin(time * 0.01 + i) * 20)
            ctx.lineTo(i * (width / 4) + width / 4 + 50, height)
            ctx.closePath()
            ctx.fillStyle = `rgba(138, 135, 255, ${0.3 + Math.sin(time * 0.01 + i) * 0.1})`
            ctx.fill()
          }
        } else if (selectedWorld.type === 'Ocean') {
          // Draw waves
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            for (let x = 0; x < width; x += 10) {
              const y = height / 2 + i * 50 + Math.sin(x * 0.02 + time * 0.02 + i) * 20
              if (x === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 - i * 0.1})`
            ctx.lineWidth = 3
            ctx.stroke()
          }
        }

        time++
        animationId = requestAnimationFrame(drawWorld)
      }

      drawWorld()

      return () => {
        cancelAnimationFrame(animationId)
      }
    }
  }, [selectedWorld])

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Gemini Worlds</h1>
        <p className="subtitle">Explore infinite parallel dimensions</p>
      </div>

      <div className="world-grid">
        {worlds.map((world) => (
          <div
            key={world.id}
            className="world-card"
            onClick={() => setSelectedWorld(world)}
          >
            <span className="world-icon">{world.icon}</span>
            <h2 className="world-name">{world.name}</h2>
            <p className="world-description">{world.description}</p>
            <div className="world-stats">
              <div className="stat">
                <span className="stat-label">Type:</span>
                <span>{world.type}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Pop:</span>
                <span>{world.inhabitants.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedWorld && (
        <div className="canvas-container" onClick={() => setSelectedWorld(null)}>
          <div className="canvas-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedWorld(null)}>
              Close
            </button>
            <canvas ref={canvasRef} className="world-canvas" />
            <div className="world-info">
              <strong>{selectedWorld.name}</strong> - {selectedWorld.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
