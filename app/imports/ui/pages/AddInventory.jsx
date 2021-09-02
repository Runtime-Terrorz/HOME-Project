import React from 'react';
import { Grid, Segment, Header, Form /*, Loader */ } from 'semantic-ui-react';
import { /* AutoForm ,*/ TextField, SubmitField } from 'uniforms-semantic';
/* import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types'; */

// const bridge = new SimpleSchema2Bridge(ADD SCHEMA NAME HERE.schema);

/** Renders the AddUser Page: what appears after the user logs in. */
class AddInventory extends React.Component {

  /** On submit, insert the data. */
  /*submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Medication added successfully', 'success');
      }
    });
  }*/

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    /*return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() { */
    // const email = Meteor.user().username;
    // const profile = ADD SCHEMA HERE.collection.findOne({ email });
    // const model = _.extend({}, profile);
    return (
        <div className="container-addmed">
          <Grid container centered>
            <Grid.Column width={8}>
                <Header as="h1" textAlign="center"><em>Add a Medication</em></Header>
                <Segment>
                  <Form.Group>
                    <TextField id='name' name='name' showInlineError={true} placeholder={'Name of Medication'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                  <TextField id='reserves' name='reserves' showInlineError={true} placeholder={'Reserves'}/>
                  <TextField id='location' name='location' showInlineError={true} placeholder={'Storage Location'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                  <TextField id='lot' name='lot' showInlineError={true} placeholder={'Lot Number #'}/>
                  <TextField id='expiration'  name='expiration' showInlineError={true} placeholder={'Expiration Date'} />
                  </Form.Group>
                  <SubmitField id='Addmed-submit' value='Submit'/>
                </Segment>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/*AddUser.propTypes = {
  ready: PropTypes.bool.isRequired,
};*/

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
/*export default withTracker(() => {
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(AddUser);*/

export default AddInventory;