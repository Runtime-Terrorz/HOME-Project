import React from 'react';
import { Grid, Image, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid style={{ marginTop: '50px' }} verticalAlign='middle' textAlign='center' container>
          <Menu>
          <Grid.Column width={6}>
            <Menu.Item as={NavLink} activeClassName="" exact to="add">
            <Image width={'350px'} src="/images/addorder.jpg"/>
            </Menu.Item>
          </Grid.Column>
            <Grid.Column width={6}>
              <Menu.Item as={NavLink} activeClassName="" exact to="inventory">
                <Image width={'330px'} src="/images/listinventory.jpg"/>
              </Menu.Item>
            </Grid.Column>
        </Menu>
        </Grid>
    );
  }
}

export default Landing;
