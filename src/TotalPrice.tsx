import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
    }
  })
);

interface TotalPriceProps{
    price: number;
}


const TotalPrice: React.FC<TotalPriceProps>=({price})=>{
  const classes = useStyles();
    return (
        <Paper className={classes.paper}>Total price ${price} Eur</Paper>
    )
}

export default TotalPrice