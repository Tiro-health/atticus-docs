import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mermaid from 'mermaid'
import puppeteer from 'puppeteer'
import { visit } from 'unist-util-visit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let browser
let page

async function initializeBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    page = await browser.newPage()
    
    // Set up mermaid in the page
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
        </head>
        <body>
          <div id="mermaid-container"></div>
        </body>
      </html>
    `)
    
    await page.evaluate(() => {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
      })
    })
  }
}

async function generateSVG(mermaidCode) {
  await initializeBrowser()
  
  try {
    const svg = await page.evaluate(async (code) => {
      const container = document.getElementById('mermaid-container')
      container.innerHTML = ''
      
      const { svg } = await mermaid.render('mermaid-diagram', code)
      return svg
    }, mermaidCode)
    
    return svg
  } catch (error) {
    console.error('Error generating SVG from Mermaid:', error)
    throw error
  }
}

async function saveSVGFile(svg, filename) {
  const publicDir = path.resolve(__dirname, '../../public/diagrams')
  
  // Ensure the diagrams directory exists
  await fs.mkdir(publicDir, { recursive: true })
  
  const filePath = path.join(publicDir, filename)
  await fs.writeFile(filePath, svg)
  
  return `/diagrams/${filename}`
}

function generateHash(content) {
  return createHash('md5').update(content).digest('hex').substring(0, 8)
}

export function rehypeMermaidToSvg() {
  return async (tree) => {
    const mermaidNodes = []
    
    // First pass: collect all mermaid code blocks
    visit(tree, 'element', (node, index, parent) => {
      if (
        node.tagName === 'pre' &&
        node.children?.[0]?.tagName === 'code' &&
        node.properties?.language === 'mermaid'
      ) {
        mermaidNodes.push({ node, index, parent })
      }
    })
    
    // Process each mermaid diagram
    for (const { node, index, parent } of mermaidNodes) {
      try {
        const codeNode = node.children[0]
        const mermaidCode = codeNode.children[0].value
        
        // Generate unique filename based on content hash
        const hash = generateHash(mermaidCode)
        const filename = `mermaid-${hash}.svg`
        
        // Generate SVG
        const svg = await generateSVG(mermaidCode)
        
        // Save SVG file
        const publicPath = await saveSVGFile(svg, filename)
        
        // Replace the code block with an img element
        const imgNode = {
          type: 'element',
          tagName: 'img',
          properties: {
            src: publicPath,
            alt: 'Mermaid diagram',
            className: ['mermaid-diagram']
          },
          children: []
        }
        
        parent.children[index] = imgNode
      } catch (error) {
        console.error('Failed to process mermaid diagram:', error)
        // Keep the original code block if SVG generation fails
      }
    }
  }
}

// Clean up browser on process exit
process.on('exit', async () => {
  if (browser) {
    await browser.close()
  }
})

process.on('SIGINT', async () => {
  if (browser) {
    await browser.close()
  }
  process.exit()
})

process.on('SIGTERM', async () => {
  if (browser) {
    await browser.close()
  }
  process.exit()
})