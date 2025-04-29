export interface Product {
  id: string;
  brand: string;
  model: string;
  price: string;
  imgUrl: string;
}

export interface ProductDetail extends Product {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string[];
  secondaryCmera: string[] | string;
  dimentions: string;
  weight: string;
  options?: {
    colors: ColorOption[];
    storages: StorageOption[];
  };
}

export interface ColorOption {
  code: number;
  name: string;
}

export interface StorageOption {
  code: number;
  name: string;
}

export interface CartResponse {
  count: number;
}

export interface CartAddRequest {
  id: string;
  colorCode: string;
  storageCode: string;
}
