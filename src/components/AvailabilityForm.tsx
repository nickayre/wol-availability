import { Available, RescueAvailable } from '../model/availability';

import React, { useState } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

interface RadioButtonGroupProps<T> {
  options: Array<{ value: T, text: string, variant: string }>;
  value: T | undefined;
  onChange: (value: T | undefined) => void;
}

class RadioButtonGroup<T> extends React.Component<RadioButtonGroupProps<T>, any> {
  public render() {
    const { value, options, onChange } = this.props;

    return (
      <ButtonGroup>
        {options.map(opt => {
          const variant = (opt.value === value) ? opt.variant : `outline-${opt.variant}`;
          const handleClick = () => onChange(opt.value === value ? undefined : opt.value);

          return (
            <Button variant={variant as ButtonProps['variant']} onClick={handleClick}>
              {opt.text}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }
}

const AvailabilityForm: React.FC = props => {
  const [storm, setStorm] = useState<Available | undefined>();
  const [rescue, setRescue] = useState<RescueAvailable | undefined>();
  const [vehicle, setVehicle] = useState('');
  const [note, setNote] = useState('');

  return (
    <Form>
      <Form.Group controlId='storm'>
        <Form.Label>Storm and support</Form.Label>
        <div>
          <RadioButtonGroup
            options={[
              { value: 'AVAILABLE', text: 'Available', variant: 'success' },
              { value: 'UNAVAILABLE', text: 'Unavailable', variant: 'danger' },
            ]}
            value={storm}
            onChange={setStorm}
          />
        </div>
      </Form.Group>
      <Form.Group controlId='rescue'>
        <Form.Label>Rescue</Form.Label>
        <div>
          <RadioButtonGroup
            options={[
              { value: 'IMMEDIATE', text: 'Immediate', variant: 'success' },
              { value: 'SUPPORT', text: 'Support', variant: 'warning' },
              { value: 'UNAVAILABLE', text: 'Unavailable', variant: 'danger' },
            ]}
            value={rescue}
            onChange={setRescue}
          />
        </div>
      </Form.Group>
      <Form.Group controlId='vehicle'>
        <Form.Label>Covering vehicle</Form.Label>
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
