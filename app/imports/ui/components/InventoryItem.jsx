import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InventoryItem extends React.Component {
  render() {
    return (
          <Table.Row>
            <Table.Cell>{this.props.inventory.medication}</Table.Cell>
            <Table.Cell>{this.props.inventory.name}</Table.Cell>
            <Table.Cell>{this.props.inventory.should_have}</Table.Cell>
            <Table.Cell>{this.props.inventory.quantity}</Table.Cell>
            <Table.Cell>{this.props.inventory.location}</Table.Cell>
            <Table.Cell>{this.props.inventory.lot}</Table.Cell>
            <Table.Cell>{this.props.inventory.expiration}</Table.Cell>
          </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
InventoryItem.propTypes = {
  inventory: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(InventoryItem);
