'use client'
import mermaid from 'mermaid'
import { useEffect } from 'react'

interface MermaidDiagramProps {
  code: string
}
export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  useEffect(() => {
    mermaid.run()
  }, [code])
  return (
    <pre className="mermaid" suppressHydrationWarning>
      {code}
    </pre>
  )
}

export function useMermaid() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      flowchart: {
        useMaxWidth: false,
      },
    })
  }, [])
}
