import Modal from "./Modal"


export default function CustomCalculator({ open, onClose, type, setOption }: { 
  open: boolean, 
  onClose: () => void, 
  type: 'camera' | 'telescope' | 'flattReduc',
  setOption: () => void
}) {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      content={
        <form onSubmit={onSubmit}>
          {type === 'camera'? (
            <>
              <input type="text" name="resolution" />
              <input type="text" name="matrixSize" />
              <input type="text" name="pixelSize" />
            </>
          ): type === 'telescope' ? (
            <>
              <input type="text" name="focalLength" />
              <input type="text" name="diameter" />
              <input type="text" name="focalRatio" />
            </>
          ) : <input type="text" name="times" />}
          <input type="submit" value="Submit" />
        </form>
      }
    />
  )
}
