import { Available, RescueAvailable } from '../model/availability';

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form, { FormProps } from 'react-bootstrap/Form';

const AvailabilityForm: React.FC = props => {
  const [storm, setStorm] = useState<Available | undefined>();
  const [rescue, setRescue] = useState<RescueAvailable | undefined>();
  const [vehicle, setVehicle] = useState('');
  const [note, setNote] = useState('');

  return (
    <Form>
      <Form.Group controlId='storm'>
        <Form.Label>Storm and support</Form.Label>
      </Form.Group>
      <Form.Group controlId='rescue'>
        <Form.Label>Rescue</Form.Label>
      </Form.Group>
      <Form.Group controlId='vehicle'>
        <Form.Label>Vehicle</Form.Label>
        <Form.Control
          type='text'
          value={vehicle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehicle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='note'>
        <Form.Label>Note</Form.Label>
        <Form.Control
          type='text'
          value={note}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNote(e.target.value)}
        />
      </Form.Group>
      <Button type='submit' variant='primary'>Save</Button>
    </Form>
  );
};

export default AvailabilityForm;
