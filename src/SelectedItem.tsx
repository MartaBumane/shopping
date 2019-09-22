import { updateStock , startQuantityInStock} from "./App";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SelectedItemProps } from "./interfaces";
import Button from '@material-ui/core/Button';

let priceWithDiscount =0;
let isWorningMessageVisable = false;

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

    button: {
      color: theme.palette.text.secondary
      
    },

    input: {
      color: theme.palette.text.secondary, 
      border: 'none', 
      fontSize: 17, 
      width: 20

      
    },
    
    img: {
      width: 45,
      height: 30,
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }, 

    itemButtons: {
      display: 'flex',
      justifyContent: 'space-between'      
    },

    itemContent: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    outOfStockMessage: {
      fontSize: 12, 
      color:'#f55151',
    },

    hideMessage: {
      display: 'none'
    }

  })
);

export function calculateTotalPriceForItem(price: number, quantity: number, status: string): number{  
 
  if(status==='Pay for 2, get 3rd one for free'){
    if(quantity%3===0){  
      priceWithDiscount=  (price * quantity) - ((quantity/3)* price); 
      return priceWithDiscount;
  
    }else if (quantity%3===1 &&quantity>3){
      return priceWithDiscount +price;
    }
    else if (quantity%3===2&&quantity>3){
      return priceWithDiscount +price+price;
    }
  }
  return price * quantity;
}

function isInStock(name: string, quantity: number):boolean{
  for(let i = 0;i<startQuantityInStock.length;i++){
    if(name === startQuantityInStock[i].name){
      if(startQuantityInStock[i].inStock-quantity===0){
        return false;
      }
    }
  }
  return true;
}

function quantityInStock(name: string, quantity: number):number{
  for(let i = 0;i<startQuantityInStock.length;i++){
    if(name === startQuantityInStock[i].name){
      return startQuantityInStock[i].inStock-quantity;      
    }
  }
  return 0;
}

const SelectedItem: React.FC<SelectedItemProps & { onRemove: () => void } & { updateQuantity: (num: number) => void }& {image:string}>=({name, price, quantity, onRemove, updateQuantity, image, status})=>{
  const classes = useStyles();
  const [quantityInput, updateQInput] = useState<string>(`${quantity}`)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){    
    if(event.target.validity.valid){
      if(parseInt(event.target.value)>(quantityInStock(name, quantity)+2)){
        updateQInput(event.target.value);
        isWorningMessageVisable= true;
      }else{
        isWorningMessageVisable= false;
        updateQInput(event.target.value);
        const value: string = event.target.value
        if(!isNaN(parseInt(value))){
          updateQuantity(parseInt(value));
          updateStock(name, parseInt(value));
        }
      }
    }    
    
  }
  

  return (
        <Paper className={classes.paper}>
            <Grid className={classes.itemContent} container spacing = {2}> 
               
                <Grid item>
                    <img
                      className={classes.img}
                      alt={name}
                      src={image}
                    />
                </Grid>               
                <Grid item>
                    {name}
                </Grid>
                <Grid item >
                  <form >
                    <input className={classes.input} type="text" pattern="[0-9]*" value={isNaN(parseInt(quantityInput)) ? quantityInput : quantity} onChange={handleChange}/>
                      pcs.
                    <div className={isWorningMessageVisable ? classes.outOfStockMessage : classes.hideMessage}>Sorry, we do not have that much right now</div>
                  </form>
                </Grid>
                <Grid item>
                    {calculateTotalPriceForItem(price, quantity, status)} Eur
                </Grid> 
                
                <Grid>
                <Grid item className={classes.itemButtons}>
                    <Button className={classes.button}  onClick={() => updateQuantity(quantity-1)}>-</Button>                 
                    <Button className={classes.button}   disabled={!isInStock(name, quantity)}  onClick={() =>updateQuantity(quantity+1)}>+</Button>                
                    <Button className={classes.button}  onClick = {onRemove}>Remove</Button>
                </Grid>  
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SelectedItem