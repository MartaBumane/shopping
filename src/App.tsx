import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Product from "./Product";
import TotalPrice from "./TotalPrice";
import SelectedItem, {calculateTotalPriceForItem} from "./SelectedItem";
import { ShopItem, SelectedItemProps } from "./interfaces";
import { DndProvider, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Switch from '@material-ui/core/Switch';

const style: React.CSSProperties = {  
  color: 'white'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    search: {
      backgroundColor: '#a19494',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    header: {
      backgroundColor: '#635757',
      color: 'white',
      padding: theme.spacing(2),
      fontSize: 30, 
      display: 'flex',
      justifyContent: 'center'
    }


  })
);

const calculateTotalSum = (items: SelectedItemProps[]): number => {  
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    if(isNaN(items[i].quantity)){
      items[i].quantity = 0;
    }
    sum = sum + calculateTotalPriceForItem(items[i].price ,items[i].quantity, items[i].status);
  }
  return sum;
}

const updateLocalStorage=(selectedItems: SelectedItemProps[]): void=>{
  localStorage.setItem("savedData", JSON.stringify(selectedItems));
}

const deleteLocalStorage = ():void=>{
  localStorage.clear();  
}

const deleteAllItemsFromCart = (selectedItems: SelectedItemProps[]):SelectedItemProps[]=>{
  const clearedArray  = selectedItems;
  while(clearedArray.length > 0) {
    clearedArray.pop();
  }
  return clearedArray;
}

const addItemToSelection = (selectedItems: SelectedItemProps[], item: ShopItem) => {
  const existingItem = selectedItems.find(i => item.id === i.id);
  if (existingItem) {
    let itemWithchangedValue = selectedItems.map(i => i === existingItem ? { ...existingItem, quantity: existingItem.quantity + 1 } : i)
    
    return itemWithchangedValue;
  }

  return [...selectedItems, { ...item, quantity: 1 }]
}


let dataFromLocalStorage = localStorage.getItem("savedData");
let initialItems: SelectedItemProps[] = [];
if(dataFromLocalStorage){
  initialItems = JSON.parse(dataFromLocalStorage);
}

let searchValue = '';

const items: ShopItem[] = [
  {
    name: 'California',
    description: 'crab meat, avocado, cucumber',
    price: 8,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-65-of-140-544x367.jpg",
    id: 1, 
    status: "Pay for 2, get 3rd one for free",
    inStock: 20
  },
  {
    name: 'Vegan',
    description: 'tomatoes, carrots, avacado, mango',
    price: 7,
    image: "http://www.npfamilyrecipes.com/wp-content/uploads/2017/09/VeganSushiRolls_top.jpg",
    id: 2, 
    status: '',
    inStock: 20
  },
  {
    name: 'Philadelphia',
    description: 'salmon, cream cheese, avocado, sesame seed.',
    price: 8.50,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-119-of-140-544x367.jpg",
    id: 3,
    status: "Pay for 2, get 3rd one for free",
    inStock: 15
  },
  {
    name: 'Ebi Avo',
    description: 'avocado, Philadelphia cream, shrimp, sesame',
    price: 7.50,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-59-of-140-544x367.jpg",
    id: 4,
    status: '',
    inStock: 20
  }
].filter((searched) => searched.name.startsWith(searchValue));


export const startQuantityInStock: { name: string, inStock: number }[] = [];
for(let i = 0;i<items.length;i++){
  startQuantityInStock.push({name: items[i].name, inStock: items[i].inStock})
}

export function updateStock(product:string, changesInstock:number): void{
  if (changesInstock>=0){
    for(let i = 0; i<startQuantityInStock.length; i++){
      if(startQuantityInStock[i].name===product){
        items[i].inStock = startQuantityInStock[i].inStock - changesInstock;
      }
    }
  }
  else{
    for(let i = 0; i<items.length; i++){
      if(items[i].name===product){
        items[i].inStock = items[i].inStock + changesInstock;
      }
    }
  }

}


const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemProps[]>(initialItems);
  for (let i = 0; i<selectedItems.length;i++){
    updateStock(selectedItems[i].name, selectedItems[i].quantity);
  }
  
  const classes = useStyles();
  
  
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {    
    let value: string = event.target.value;
    searchValue= value.toLowerCase();
    
  }
  
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'DropHere' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  
  const isActive = canDrop && isOver;
  let backgroundColor = '#a19494'
  if (isActive) {
    backgroundColor = '#7afa7d'
  } else if (canDrop) {
    backgroundColor = '#f0e984'
  }

  
  return (
    <div className="App">
        
      <Grid container spacing={3}>
      <Grid item xs={12} >
          <Paper className={classes.header}>SUSHI SHOP
          <Switch
            defaultChecked
            value="checkedF"
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
          </Paper>
        </Grid>

        <Grid item xs={6}>          
          <Paper className={classes.search}>
            <form>
              <input  type="text" id="addInput" className={classes.paper} placeholder={"Search..."} onChange={handleSearch}/>                
            </form></Paper>
          
              {items.map(item => <Product
                status = {item.status}
                inStock = {item.inStock}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onSelect={() => {
                  if(item.inStock!==0){
                    const selected = addItemToSelection(selectedItems, item);
                    setSelectedItems(selected);
                    updateLocalStorage(selected);                    
                    item.inStock= item.inStock-1;
                  }     
                }}
          />)}          
        </Grid>
        
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid ref={drop} style={{ ...style, backgroundColor }} container spacing={3}>
              <Grid item xs={12}>
                {selectedItems.map((item, i) => <SelectedItem
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  status = {item.status}
                  inStock = {item.inStock}
                  name={item.name}
                  quantity={item.quantity}
                  onRemove={() => {
                    selectedItems.splice(i, 1)
                    const selected =[...selectedItems];
                    setSelectedItems(selected);
                    item.quantity = 0;
                    updateStock(item.name,item.quantity);
                    updateLocalStorage(selected);
                  
                  }}
                  updateQuantity={(number: number) => {
                    if (number < selectedItems[i].quantity) {
                      if (selectedItems[i].quantity === 1) {
                        selectedItems.splice(i, 1)
                        const selected =[...selectedItems];
                        setSelectedItems(selected);
                        updateLocalStorage(selected);
                        item.quantity = 0;
                        updateStock(item.name,item.quantity);
                      } else {
                        selectedItems[i].quantity = number;
                        const selected =[...selectedItems];
                        setSelectedItems(selected);
                        updateLocalStorage(selected);
                        
                        updateStock(item.name,item.quantity);
                      }
                    } else {
                        if(item.quantity!==item.inStock){
                          selectedItems[i].quantity = number;
                          const selected =[...selectedItems];
                          setSelectedItems(selected);
                          updateLocalStorage(selected);
                          updateStock(item.name,-1);
                      }
                    }
                  }}
                />)}
              </Grid>


              <Grid item xs={12}>
                <TotalPrice price={calculateTotalSum(selectedItems)} 
                clear={() => {
                  for (let i = 0; i<selectedItems.length;i++){
                    updateStock(selectedItems[i].name, 0);
                  }
                  deleteLocalStorage();
                  const clearedCart = [...deleteAllItemsFromCart(selectedItems)];
                  
                  setSelectedItems(clearedCart); 
                  
                  
                  }} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

      
      </Grid>
    </div>
  );
};

export default App;