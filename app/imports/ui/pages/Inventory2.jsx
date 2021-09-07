import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Table, Header, Grid, Search, Dropdown, Icon, Button } from 'semantic-ui-react';

/** Inventory Page Mockup */
/** Render a table containing Inventory. */
class Inventory2 extends React.Component {

  /** renders page with mockup data until Inventory documents are created */
  render() {
    return (
        <Container className="inventory">
          <Grid container column={3}>
            <Grid.Row column={2} className="top inventory">
              <Grid.Column width={12}>
                <Header as="h1" textAlign="left">Inventory</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Search/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={12}>
                Showing 1-3 of 3
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown
                    text='Filter'
                    icon='filter'
                    floating
                    labeled
                    button
                    className='icon'
                >
                  <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content='Filter by tag' />
                    <Dropdown.Divider />
                    <Dropdown.Item>Medicines</Dropdown.Item>
                    <Dropdown.Item>Vaccines</Dropdown.Item>
                    <Dropdown.Item>Pills</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Reserves</Table.HeaderCell>
                <Table.HeaderCell>Storage Location</Table.HeaderCell>
                <Table.HeaderCell>Lot #</Table.HeaderCell>
                <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Example Med 1</Table.Cell>
                <Table.Cell>100</Table.Cell>
                <Table.Cell>Drawer 5</Table.Cell>
                <Table.Cell>#09854</Table.Cell>
                <Table.Cell>09/1/2021</Table.Cell>
                <Table.Cell textAlign='center'><Link to='/edit2'><Icon name='pencil'/></Link></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Example Med 2</Table.Cell>
                <Table.Cell>50</Table.Cell>
                <Table.Cell>Drawer 3</Table.Cell>
                <Table.Cell>#09422</Table.Cell>
                <Table.Cell>09/2/2021</Table.Cell>
                <Table.Cell textAlign='center'><Link to='/edit2'><Icon name='pencil'/></Link></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Example Med 3</Table.Cell>
                <Table.Cell>49</Table.Cell>
                <Table.Cell>Drawer 1</Table.Cell>
                <Table.Cell>#09822</Table.Cell>
                <Table.Cell>09/3/2021</Table.Cell>
                <Table.Cell textAlign='center'><Link to='/edit2'><Icon name='pencil'/></Link></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

export default withRouter(Inventory2);
