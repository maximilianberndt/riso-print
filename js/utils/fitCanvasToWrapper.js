import { OPTIONS } from '../options.js'

const wrapper = document.querySelector('#canvas-wrapper')

export const fitCanvasToWrapper = () => {
	const bounds = wrapper.getBoundingClientRect()

	const width = bounds.width
	const height = width * (OPTIONS.height / OPTIONS.width)

	if (height > window.innerHeight) {
		const height = bounds.height
		const width = height * (OPTIONS.width / OPTIONS.height)

		return { width, height }
	}

	return { width, height }
}
