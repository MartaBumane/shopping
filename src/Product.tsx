import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import "./App.css";


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

interface ProductProps {
    name: string;
    description : string;
    price: number;
    image: string;
    status: string;
    onSelect(): void
}

const Product: React.FC<ProductProps> = ({name, description, price, image, status, onSelect}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt={name}
                      src={image}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>                       
                        {description}
                      </Typography>
                      <Typography  variant="body2" gutterBottom >
                        {status}
                      </Typography>
                      
                    </Grid>
                    <Grid item>
                      
                      <button onClick = {onSelect}>Add to cart</button> 
                        
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">{price} Eur</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>    
    );
  };

  export default Product;