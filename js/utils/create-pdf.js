import { wait } from '../utils/wait.js'
const jsPDF = window.jspdf.default

const createPage = (name, canvas, pass, options) =>
  new Promise(async (accept) => {
    pass.enabled = true

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

  bluePass.enabled = false
  await createPage('page-1', canvas, redPass, options)

  redPass.enabled = false
  await createPage('page-2', canvas, bluePass, options)

  bluePass.enabled = false
}

export default createPdf
