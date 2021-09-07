import React from 'react';
import { Grid, Header, Segment, Input, Button, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'; // required for Uniforms

/** Renders the Page for editing a single document. */
class EditInventory2 extends React.Component {
  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Register your account
              </Header>
                <Segment stacked>
                  <Header>Enter Name of Medicine:</Header>
                  <Input defaultValue='Example Med 1'/>
                  <Header>Enter Reserve Number: </Header>
                  <Input defaultValue='100'/>
                  <Header>Enter Location:</Header>
                  <Input defaultValue='Drawer 5'/>
                  <Header>Enter Lot #:</Header>
                  <Input defaultValue='#09854'/>
                  <Header>Enter Expiration Date:</Header>
                  <Input defaultValue='09/1/2021'/>
                  <Button primary>Submit</Button>
                </Segment>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default withRouter(EditInventory2);
