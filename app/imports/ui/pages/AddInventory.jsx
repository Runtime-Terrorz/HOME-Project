import React, { useState } from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { inventoryDefineMethod } from '../../api/inventory/InventoryCollection.methods';
import { inventoryMedications, medLocations } from '../../api/inventory/InventoryCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  medication: {
    type: String,
    allowedValues: inventoryMedications,
    defaultValue: '',
  },
  name: String,
  location: {
    type: String,
    allowedValues: medLocations,
    defaultValue: '',
  },
  should_have: Number,
  quantity: Number,
  lot: String,
});

/** Renders the Page for adding stuff. */
const AddInventory = () => {
  const [startDate, setStartDate] = useState(new Date());

  /** On submit, insert the data. */
  const submit = (data, formRef) => {
    // console.log('AddInventory.submit', data);
    const { medication, name, location, should_have, quantity, lot } = data;
    const expiration = startDate;
    const owner = Meteor.user().username;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    inventoryDefineMethod.call({ medication, name, location, should_have, quantity, lot, expiration, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
          // console.error(error.message);
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          // console.log('Success');
        }
      });
  };

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    let fRef = null;
    return (
        <Grid container centered >
          <Grid.Column width={10}>
            <Header as="h2" textAlign="center">Add Inventory</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => submit(data, fRef)} >
              <Segment inverted style={{ backgroundColor: '#FB785E' }}>
                <SelectField name='medication' placeholder={'Medication Category'}/>
                <TextField name='name' placeholder={'Diphenhydramine 50 mg/mL'}/>
                <Form.Group widths={3}>
                  <SelectField name='location'/>
                  <NumField name='should_have' decimal={false}/>
                  <NumField name='quantity' decimal={false}/>
                </Form.Group>
                <Form.Group widths={2}>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  <TextField name='lot'/>
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
};

export default AddInventory;
