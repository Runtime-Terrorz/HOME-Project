import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { stuffDefineMethod } from '../../api/stuff/StuffCollection.methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  reserves: Number,
  storage: {
    type: String,
    allowedValues: ['Case 1', 'Case 2', 'Case 3', 'Case 4', 'Case 5', 'Case 6', 'Case 7',
      'Case 8', 'Refrigerator Closet', 'Bottom Drawer', 'Freezer', 'Freezer-Derm', 'Drawer 2-2',
      'Drawer 2-3', 'Emergency Kit', 'Refrigerator'],
    defaultValue: 'Case 1',
  },
    lot: String,
    expiration: String,
});

/** Renders the Page for adding stuff. */
class AddInventory extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    // console.log('AddInventory.submit', data);
    const { name, reserves, storage, lot, expiration } = data;
    const owner = Meteor.user().username;
    // console.log(`{ ${name}, ${quantity}, ${condition}, ${owner} }`);
    stuffDefineMethod.call({ name, reserves, storage, lot, expiration, owner },
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
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add New Medication</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name' placeholder={'Ex: Acetaminophen 500 mg Caps'}/>
                <SelectField name='storage'/>
                <Form.Group widths={'equal'}>
                  <NumField name='reserves' decimal={false} placeholder={'The total quantity to be added'}/>
                  <TextField name='lot' placeholder={'Ex: #133258'}/>
                  <TextField name='expiration' placeholder={'DD/MM/YYYY'}/>
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
