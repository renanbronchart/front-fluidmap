import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const takeHighResScreenshot = function takeHighResScreenshot (srcEl, scaleFactor, offsetWidth = 0, offsetHeight = 0) {
  // Save original size of element
  const originalWidth = srcEl.offsetWidth
  const originalHeight = srcEl.offsetHeight
  const scaledCanvas = document.createElement('canvas')
  const scaledContext = scaledCanvas.getContext('2d')
  // Force px size (no %, EMs, etc)
  srcEl.style.width = originalWidth + 'px'
  srcEl.style.height = originalHeight + 'px'

  // Create scaled canvas
  scaledCanvas.width = originalWidth * scaleFactor
  scaledCanvas.height = originalHeight * scaleFactor
  scaledCanvas.style.width = originalWidth + 'px'
  scaledCanvas.style.height = originalHeight + 'px'
  scaledContext.scale(scaleFactor, scaleFactor)

  srcEl.style.width = '100%'
  srcEl.style.height = 'auto'

  html2canvas(srcEl, { canvas: scaledCanvas })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const ratioWidth = canvas.width / (originalWidth - offsetWidth)
      const ratioHeight = canvas.height / (originalHeight - offsetHeight)

      const doc = new JsPDF('p', 'pt', 'a4')

      doc.addImage(imgData, 'PNG', 0, 0, originalWidth / ratioWidth, originalHeight / ratioHeight)
      doc.save('sample-file.pdf')

      window.open(imgData)
    })
}

export default takeHighResScreenshot
