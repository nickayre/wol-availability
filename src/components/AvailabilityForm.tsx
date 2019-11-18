import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import React from 'react';

const AvailabilityForm: React.FC = () => {
  return (
    <Container>
      <TextField
        type="text"
        label="Note"
        margin="normal"
        fullWidth
      />
      <TextField
        type="text"
        label="Vehicle"
        margin="normal"
        fullWidth
      />
    </Container>
  );
};

export default AvailabilityForm;
