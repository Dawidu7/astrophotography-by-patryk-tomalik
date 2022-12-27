const getFormErrors = (form: HTMLFormElement, className: string) => {
  return Array.from(form.elements).slice(0, -1).map(element => {
    const input = element as HTMLInputElement

    if(input.value === '') {
      input.classList.add(className)
      return false
    }
    else {
      input.classList.remove(className)
      return true
    }
  })
}

export default getFormErrors