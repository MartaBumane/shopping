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
      fontSize: 30
    }

  })
);


const items: ShopItem[] = [
  {
    name: 'California',
    description: 'crab meat, avocado, cucumber',
    price: 8,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-65-of-140-544x367.jpg",
    id: 1, 
    status: "Pay for 2, get 3rd one for free"
  },
  {
    name: 'Vegan',
    description: 'tomatoes, carrots, avacado, mango',
    price: 7,
    image: "http://www.npfamilyrecipes.com/wp-content/uploads/2017/09/VeganSushiRolls_top.jpg",
    id: 2, 
    status: ''
  },
  {
    name: 'Philadelphia',
    description: 'salmon, cream cheese, avocado, sesame seed.',
    price: 8.50,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-119-of-140-544x367.jpg",
    id: 3,
    status: "Pay for 2, get 3rd one for free"
  },
  {
    name: 'Ebi Avo',
    description: 'avocado, Philadelphia cream, shrimp, sesame',
    price: 7.50,
    image: "https://sansushi.md/wp-content/uploads/2015/03/resize-sun-sushi-59-of-140-544x367.jpg",
    id: 4,
    status: ''


  }

]

const calculateTotalSum = (items: SelectedItemProps[]): number => {
  
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    if(isNaN(items[i].quantity)){
      items[i].quantity = 0;
    }
    sum = sum + calculateTotalPriceForItem(items[i].price ,items[i].quantity, items[i].status) ;

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

const App: React.FC = () => {

  const [selectedItems, setSelectedItems] = useState<SelectedItemProps[]>(initialItems);
  const classes = useStyles();
  
  let searchValue = '';
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    let value: string = event.target.value;
    searchValue= value;
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
      <Grid item xs={12}>
          <Paper className={classes.header}>SUSHI SHOP</Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.search}>
            <form>
              <input  className={classes.paper} placeholder={"Search..."} value={searchValue} onChange={handleSearch}/>                
            </form></Paper>
          
              {items.map(item => <Product
                status = {item.status}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onSelect={() => {
                  const selected = addItemToSelection(selectedItems, item);
                  setSelectedItems(selected);
                  updateLocalStorage(selected);
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
                  name={item.name}
                  quantity={item.quantity}
                  onRemove={() => {
                    selectedItems.splice(i, 1)
                    const selected =[...selectedItems];
                    setSelectedItems(selected);
                    updateLocalStorage(selected);
                  }}
                  updateQuantity={(number: number) => {
                    if (number < selectedItems[i].quantity) {
                      if (selectedItems[i].quantity === 1) {
                        selectedItems.splice(i, 1)
                        const selected =[...selectedItems];
                        setSelectedItems(selected);
                        updateLocalStorage(selected);
                      } else {
                        selectedItems[i].quantity = number;
                        const selected =[...selectedItems];
                        setSelectedItems(selected);
                        updateLocalStorage(selected);
                      }
                    } else {
                      selectedItems[i].quantity = number;
                      const selected =[...selectedItems];
                      setSelectedItems(selected);
                      updateLocalStorage(selected);
                    }
                  }}
                />)}
              </Grid>


              <Grid item xs={12}>
                <TotalPrice price={calculateTotalSum(selectedItems)} 
                clear={() => {
                  deleteLocalStorage();
                  const clearedCart = [...deleteAllItemsFromCart(selectedItems)];
                  console.log(clearedCart)
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