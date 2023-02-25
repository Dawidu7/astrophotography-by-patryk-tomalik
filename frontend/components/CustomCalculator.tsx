import Modal from "./Modal"

import { 
  CalculatorCamera as Camera, 
  CalculatorTelescope as Telescope,
  CalculatorFlattReduc as FlattReduc
} from '../interfaces'


export default function CustomCalculator({ open, onClose, type, setOption }: { 
  open: boolean, 
  onClose: () => void, 
  type: 'camera' | 'telescope' | 'flattReduc' | null,
  setOption: React.Dispatch<React.SetStateAction<{
    camera: Camera | null,
    telescope: Telescope | null,
    flattReduc: FlattReduc | null
  }>>
}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const elements = form.elements
    for(let i = 0; i < elements.length - 1; i++) {
      if(Number((elements[i] as HTMLInputElement).value) < 0) return
    }

    setOption(prev => {
      if(type === 'camera') {
        return { ...prev, camera: {
          id: -1,
          name: 'Custom',
          resolution_x: form.resX.value,
          resolution_y: form.resY.value,
          matrix_x: form.matrixX.value,
          matrix_y: form.matrixY.value,
          pixel_size: form.pixelSize.value,
          resolution: `${form.res_x.value}x${form.res_y.value}`,
          matrix_size: `${form.matrix_x.value}x${form.matrix_y.value}`,
        } }
      }
      if(type === 'telescope') {
        return { ...prev, telescope: {
          id: -1,
          name: 'Custom',
          focal_length: form.focalLength.value,
          diameter: form.diameter.value,
          focal_ratio: form.focalRatio.value
        } }
      }
      return { ...prev, flattReduc: {
        id: -1,
        name: 'Custom',
        times: form.times.value
      } }
    })

    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      content={
        <form onSubmit={onSubmit}>
          {type === 'camera'? (
            <>
              <label>Resolution</label>
              <div className="flex">
                <input type="text" name="res_x" id="resX" className="w-1/2" />
                x
                <input type="text" name="res_y" id="resY" className="w-1/2" />
              </div>
              <label>Matrix Size</label>
              <div className="flex">
                <input type="text" name="matrix_x" id="matrixX" className="w-1/2" />
                x
                <input type="text" name="matrix_y" id="matrixY" className="w-1/2" />
              </div>
              <label>Pixel Size</label>
              <input type="text" name="pixelSize" />
            </>
          ): type === 'telescope' ? (
            <>
              <label>Focal Length</label>
              <input type="text" name="focalLength" />
              <label>Diameter</label>
              <input type="text" name="diameter" />
              <label>Focal Ratio</label>
              <input type="text" name="focalRatio" />
            </>
          ) : (
            <>
              <label>Times</label>
              <input type="text" name="times" />
            </>
          )}
          <input type="submit" value="Submit" />
        </form>
      }
    />
  )
}
