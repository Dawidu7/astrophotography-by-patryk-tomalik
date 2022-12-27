export interface Image {
  id: number,
  image_url: string,
  name: string,
  optic: string,
  camera: string,
  mount: string,
  filters: string,
  date: Date,
  sqml: string,
  exposure_details: string,
  acquisition: string,
  processing: string,
  info: string,
  annotation_url: string
}

export interface CalculatorCamera {
  id: number,
  name: string,
  resolution_x: number,
  resolution_y: number,
  matrix_x: number,
  matrix_y: number,
  pixel_size: number,
  resolution: string,
  matrix_size: string
}

export interface CalculatorTelescope {
  id: number,
  name: string,
  focal_length: number,
  diameter: number,
  focal_ratio: number
}

export interface CalculatorFlattReduc {
  id: number,
  name: string,
  times: number
}

export interface GeneratorCatalog {
  id: number,
  name: string,
  value: string
}