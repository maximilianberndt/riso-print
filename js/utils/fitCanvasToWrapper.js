import { OPTIONS } from '../options.js'

export const fitCanvasToWrapper = (wrapper) => {
  const bounds = wrapper.getBoundingClientRect()

  //   const width = bounds.width
  //   const height = width * (OPTIONS.height / OPTIONS.width)

  const height = bounds.height
  const width = height * (OPTIONS.width / OPTIONS.height)

  return { width, height }
}
