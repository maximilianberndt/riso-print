import { OPTIONS } from './options.js'

const jsPDF = window.jspdf.default

const createPdf = (canvas) => {
	const borderMM = 10;

	const pdf = new jsPDF({ format: OPTIONS.format })

	// Add a background color to the pdf
	pdf.setFillColor("#ff0000")
	pdf.rect(0, 0, 9999, 9999, 'F')

	// Save the canvas as an image
	const image = canvas.toDataURL('image/jpeg', 1.0)

	// Add image to the pdf
	pdf.addImage(
		image,
		'JPEG',
		borderMM,
		borderMM,
		OPTIONS.width - borderMM * 2,
		OPTIONS.height - borderMM * 2,
		'',
		'NONE',
		0
	)

	pdf.save('riso-print')
}

export default createPdf
