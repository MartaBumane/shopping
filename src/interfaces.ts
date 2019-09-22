export interface ShopItem{
  name: string;
  description : string;
  price: number;
  image: string;
  id: number;
  status: string;
  inStock: number;
}

export type SelectedItemProps = ShopItem & {
    quantity: number;
    
}
