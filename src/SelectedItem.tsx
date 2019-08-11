import React from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SelectedItemProps } from "./interfaces";
import { string } from "prop-types";
import Button from '@material-ui/core/Button';

let priceWithDiscount =0;


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
      display: 'none',
    },
    
    img: {
      width: 45,
      height: 30,
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }

  })
);

export function calculateTotalPriceForItem(price: number, quantity: number, status: string): number{  
  
  if(isNaN(quantity) ){
    quantity = 0;
  }

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


const SelectedItem: React.FC<SelectedItemProps & { onRemove: () => void } & { updateQuantity: (num: number) => void }& {image:string}>=({name, price, quantity, onRemove, updateQuantity, image, status})=>{
  const classes = useStyles();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    updateQuantity(parseInt(value));
  }
  

  return (
        <Paper className={classes.paper}>
            <Grid container spacing = {2}> 

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
                <Grid item>
                  <form>
                    <input  value={quantity} onChange={handleChange}/>
                      pcs.
                  </form>
                </Grid>
                <Grid item>
                    {calculateTotalPriceForItem(price, quantity, status)} Eur
                </Grid> 
                <Grid item>
                    <Button className={classes.button}  onClick={() => updateQuantity(quantity-1)}>-</Button>
                </Grid>  
                <Grid item>
                    <Button className={classes.button}  onClick={() =>updateQuantity(quantity+1)}>+</Button>
                </Grid>  
                <Grid item>
                    <Button className={classes.button}  onClick = {onRemove}>Remove</Button>
                </Grid>  
            </Grid>
        </Paper>
    )
}

export default SelectedItem