import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { inventoryDefineMethod } from '../../api/inventory/InventoryCollection.methods';
import { inventoryMedications } from '../../api/inventory/InventoryCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  medication: {
    type: String,
    allowedValues: inventoryMedications,
    defaultValue: '',
  },
  name: String,
  location: String,
  should_have: Number,
  quantity: Number,
  lot: String,
  expiration: String,
});

/** Renders the Page for adding stuff. */
class AddInventory extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    // console.log('AddInventory.submit', data);
    const { medication, name, location, should_have, quantity, lot, expiration } = data;
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
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered >
          <Grid.Column width={10}>
            <Header as="h2" textAlign="center">Add Inventory</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment inverted style={{ backgroundColor: '#FB785E' }}>
                <SelectField name='medication'/>
                <TextField name='name' placeholder={'Diphenhydramine 50 mg/mL'}/>
                <Form.Group widths={'equal'}>
                  <TextField name='location'/>
                  <Form.Group>
                    <NumField name='should_have' decimal={false}/>
                    <NumField name='quantity' decimal={false}/>
                  </Form.Group>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='expiration' placeholder={'Ex: 08/04/2022'}/>
                  <TextField name='lot'/>
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddInventory;
