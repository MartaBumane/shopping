import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';



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
        <Paper className={classes.paper}>Total price $    {price} Eur
          
          <IconButton aria-label="delete" className={classes.margin} onClick = {clear}>
            Del
          </IconButton>
          
        </Paper>
    )
}

export default TotalPrice