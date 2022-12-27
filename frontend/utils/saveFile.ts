import { saveAs } from 'file-saver'


const saveFile = (text: string[], filename: string, extenstion: string = 'txt') => {
  const blob = new Blob(text, { type: 'text/plain;charset=utf-8' })
  saveAs(blob, `${filename}.${extenstion}`)
}

export default saveFile