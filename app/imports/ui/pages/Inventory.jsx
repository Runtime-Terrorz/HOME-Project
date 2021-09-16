import React from 'react';
import { Link } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { Container, Table, Header, Grid, Dropdown, Icon, Button, Loader, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Inventories } from '../../api/inventory/InventoryCollection';
import InventoryItem from '../components/InventoryItem';

/** Inventory Page Mockup */
/** Render a table containing Inventory. */
class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  handleChange = (e, { value }) => this.setState({ search: value });

  MedFind = (inventories) => {
    const { search } = this.state;
    const lowerCase = search.toLowerCase();
    return inventories.name.toLowerCase().startsWith(lowerCase);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** renders page with mockup data until Inventory documents are created */
  renderPage() {
    const allmedicine = _.filter(this.props.inventories, this.MedFind);
    const sorted = _.sortBy(allmedicine, 'name');
    return (
        <Container className="inventory">
            <Grid container column={3}>
              <Grid.Row column={2} className="top inventory">
              <Grid.Column width={10}>
                <Header as="h1" textAlign="left">Inventory</Header>
              </Grid.Column>
                <Grid.Column width={5}>
                  <Input transparent type='text' size='large' placeholder='Search by name...' icon='search' fluid
                         onChange={this.handleChange}/>
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
                  <Link to={'/edit'}>
                    <Button
                        icon
                        labelPosition='left'
                        color='blue'
                        floated='right'
                    >
                      <Icon name='pencil'/> Edit
                    </Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Medication</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Should Have</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Storage Location</Table.HeaderCell>
                <Table.HeaderCell>Lot #</Table.HeaderCell>
                <Table.HeaderCell>Expiration Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sorted.map((inventories, index) => <InventoryItem key={index} inventory={inventories}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Inventory.propTypes = {
  inventories: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Inventories.subscribeInventory();
  return {
    inventories: Inventories.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Inventory);
