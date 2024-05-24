// import { jsPDF } from 'jspdf'
import { OPTIONS } from './options.js'

const jsPDF = window.jspdf.default

const createPdf = (canvas) => {
  const pdf = new jsPDF({ format: 'a3' })

  // Add a background color to the pdf
  pdf.setFillColor(OPTIONS.color1.getHexString())
  pdf.rect(0, 0, 9999, 9999, 'F')

  // // Save the canvas as an image
  const image = canvas.toDataURL('image/jpeg', 1.0)

  // // Add image to the pdf
  pdf.addImage(
    image,
    'JPEG',
    OPTIONS.borderMM,
    OPTIONS.borderMM,
    OPTIONS.width - OPTIONS.borderMM * 2,
    OPTIONS.height - OPTIONS.borderMM * 2,
    '',
    'NONE',
    0
  )

  pdf.save('riso-print')
}

export default createPdf
