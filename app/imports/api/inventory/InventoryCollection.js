import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';

export const inventoryMedications = ['Allergy & Cold Medicines', 'Analgesics/Anti-inflammatory', 'Anti-hypertensives',
  'Anti-microbial', 'Cardiac/Cholesterol', 'Dermatological Preparations', 'Diabetes Meds', 'Ear and Eye Preparations',
  'Emergency Kit', 'GI Meds', 'GYN Meds', 'Pulmonary', 'Smoking Cessation', 'Vitamins and Supplements'];
export const inventoryPublications = {
  inventory: 'Inventory',
};

class InventoryCollection extends BaseCollection {
  constructor() {
    super('Inventories', new SimpleSchema({
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
      owner: String,
    }));
  }

  /**
   * Defines a new Inventory item.
   * @param medication the classification of medicine.
   * @param name the name of the item.
   * @param location the location of the item.
   * @param should_have the number of items that is recommended to have in stock.
   * @param quantity the number of items.
   * @param lot the lot number of the item.
   * @param expiration expiration date of the item.
   * @return {String} the docID of the new document.
   */
  define({ medication, name, location, should_have, quantity, lot, expiration, owner }) {
    const docID = this._collection.insert({
      medication,
      name,
      location,
      should_have,
      quantity,
      lot,
      expiration,
      owner,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the name of the item.
   * @param location the location of the item.
   * @param should_have the number of items that is recommended to have in stock.
   * @param quantity the number of items.
   * @param expiration expiration date of the item.
   */
  update(docID, { name, location, should_have, quantity, expiration }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (location) {
      updateData.location = location;
    }
    if (_.isNumber(should_have)) {
      updateData.should_have = should_have;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(quantity)) {
      updateData.quantity = quantity;
    }
    if (expiration) {
      updateData.expiration = expiration;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection and just the inventory associated to an owner.
   */

  publish() {
    if (Meteor.isServer) {
      // get the InventoryCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(inventoryPublications.inventory, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for inventory owned by the current user.
   */
  subscribeInventory() {
    if (Meteor.isClient) {
      return Meteor.subscribe(inventoryPublications.inventory);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Inventories = new InventoryCollection();
