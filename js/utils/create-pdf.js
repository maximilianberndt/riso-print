import { wait } from '../utils/wait.js'
const jsPDF = window.jspdf.default

const createPage = (name, canvas, options) =>
  new Promise(async (accept) => {
    const {
      borderMM = 10,
      format = 'a3',
      width = 297,
      height = 420,
    } = options

    const pdf = new jsPDF({ format })

    // Add a background color to the pdf
    pdf.setFillColor('#fff')
    pdf.rect(0, 0, 9999, 9999, 'F')

    await wait(100)

    // Save the canvas as an image
    const image = canvas.toDataURL('image/jpeg', 1.0)

    await wait(100)

    // Add image to the pdf
    const imageWidth = width - borderMM * 2
    const imageHeight = height - borderMM * 2

    pdf.addImage(
      image,
      'JPEG',
      borderMM,
      borderMM,
      imageWidth,
      imageHeight,
      '',
      'NONE',
      0
    )

    pdf.save(name)

    accept()
  })

const createPdf = async (canvas, composer, options = {}) => {
  const redPass = composer.passes[1]
  const bluePass = composer.passes[2]

  // Show just red color
  redPass.enabled = true
  bluePass.enabled = false
  await createPage('color-1', canvas, options)

  // Show just blue color
  redPass.enabled = false
  bluePass.enabled = true
  await createPage('color-2', canvas, options)

  bluePass.enabled = false
}

export default createPdf
