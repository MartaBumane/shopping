import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "right",
      color: theme.palette.text.secondary
    },
    image: {
      width: 128,
      height: 128
    },
    button: {
      margin: theme.spacing(1),
      color: theme.palette.text.secondary
    },
    input: {
      display: 'none',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  })
);

interface TotalPriceProps{
    price: number;
    clear(): void;
}


const TotalPrice: React.FC<TotalPriceProps>=({price, clear})=>{
  const classes = useStyles();
    return (
        <Paper className={classes.paper}>
          <IconButton aria-label="delete" className={classes.margin} onClick = {clear}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          
          Total price $    {price} Eur

          <Button variant="contained" className={classes.button}>
            Checkout
          </Button>
          
          
        </Paper>
    )
}

export default TotalPrice