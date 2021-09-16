import React from 'react';
import { Grid, Image, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid style={{ marginTop: '50px' }} verticalAlign='middle' textAlign='center' container>
          <Menu>
          <Grid.Column width={5}>
            <Menu.Item as={NavLink} activeClassName="" exact to="add">
            <Image width={'300px'} src="/images/addorder.png"/>
            </Menu.Item>
          </Grid.Column>
            <Grid.Column width={5}>
              <Menu.Item as={NavLink} activeClassName="" exact to="inventory">
                <Image width={'280px'} src="/images/listinventory.png"/>
              </Menu.Item>
            </Grid.Column>
        </Menu>
        </Grid>
    );
  }
}

export default Landing;
