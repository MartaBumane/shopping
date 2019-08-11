import React from 'react';
import TextField from '@material-ui/core/TextField';

interface State {
  name: string;
  age: string;
  multiline: string;
  currency: string;
}

export default function OutlinedTextFields() {
  const [values, setValues] = React.useState<State>({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-search"
        label="Search field"
        type="text"
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}