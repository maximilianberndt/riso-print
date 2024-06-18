export const saveToLocalstorage = (name, data) => {
  if (!data) return
  localStorage.setItem(name, JSON.stringify(data))
}

export const loadFromLocalstorage = (name) => {
  const data = localStorage.getItem(name)

  if (!data) return null
  return JSON.parse(data)
}
