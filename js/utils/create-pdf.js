const jsPDF = window.jspdf.default

const createPage = (name, canvas, options) =>
  new Promise((accept) => {
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

    // Save the canvas as an image
    const image = canvas.toDataURL('image/jpeg', 1.0)

    // Add image to the pdf
    const imageWidth = width - borderMM * 2
    const imageHeight = height - borderMM * 2

    setTimeout(() => {
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
    }, 1)
  })

const createPdf = async (canvas, options = {}) => {
  await createPage('page-1', canvas, options)
  // await createPage('page-2', canvas, options)
}

export default createPdf
