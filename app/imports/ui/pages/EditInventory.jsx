import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Table, Header, Grid, Search, Dropdown, Icon, Input, Button } from 'semantic-ui-react';

/** Inventory Page Mockup */
/** Render a table containing Inventory. */
class EditInventory extends React.Component {

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
                <Link to={'/inventory'}>
                  <Button
                      icon
                      labelPosition='left'
                      color='red'
                      floated='right'
                  >
                    <Icon name='delete'/> Cancel
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Reserves</Table.HeaderCell>
                  <Table.HeaderCell>Storage Location</Table.HeaderCell>
                  <Table.HeaderCell>Lot #</Table.HeaderCell>
                  <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell><Icon name='delete'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Example Med 1'/></Table.Cell>
                  <Table.Cell><Input defaultValue='100'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Drawer 5'/></Table.Cell>
                  <Table.Cell><Input defaultValue='#09854'/></Table.Cell>
                  <Table.Cell><Input defaultValue='09/1/2021'/></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Icon name='delete'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Example Med 2'/></Table.Cell>
                  <Table.Cell><Input defaultValue='50'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Drawer 3'/></Table.Cell>
                  <Table.Cell><Input defaultValue='#09422'/></Table.Cell>
                  <Table.Cell><Input defaultValue='09/2/2021'/></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell><Icon name='delete'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Example Med 3'/></Table.Cell>
                  <Table.Cell><Input defaultValue='50'/></Table.Cell>
                  <Table.Cell><Input defaultValue='Drawer 1'/></Table.Cell>
                  <Table.Cell><Input defaultValue='#09822'/></Table.Cell>
                  <Table.Cell><Input defaultValue='09/3/2021'/></Table.Cell>
                </Table.Row>
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    <Button floated='right' primary>Save</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
        </Container>
    );
  }
}

export default withRouter(EditInventory);
