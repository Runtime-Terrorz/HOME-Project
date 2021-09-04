import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const inventoryMedications = ['Allergy & Code Medicines', 'Analgesics/Antiinflammatory', 'Antihypertensives',
  'Antimicrobials', 'Cardiac/Cholesterol', 'Dermatologic Preparations', 'Diabetes Meds', 'Ear and Eye Preparations',
  'Emergency Kit', 'GI Meds', 'GYN Meds', 'Pulmonary', 'Smoking Cessation', 'Vitamins and Supplements'];
export const inventoryPublications = {
  inventory: 'Stuff',
  inventoryAdmin: 'StuffAdmin',
};

class InventoryCollection extends BaseCollection {
  constructor() {
    super('Inventorys', new SimpleSchema({
      medication: {
        type: String,
        allowedValues: inventoryMedications,
        defaultValue: '',
      },
      name: String,
      location: String,
      quantity: Number,
      lot: Number,
      expiration: new Date(),
    }));
  }

  /**
   * Defines a new Inventory item.
   * @param medication the classification of medicine.
   * @param name the name of the item.
   * @param location the location of the item.
   * @param quantity the number of items.
   * @param lot the lot number of the item.
   * @param expiration expiration date of the item.
   * @return {String} the docID of the new document.
   */
  define({ medication, name, location, quantity, lot, expiration }) {
    const docID = this._collection.insert({
      medication,
      name,
      location,
      quantity,
      lot,
      expiration,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { name, quantity, condition }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(quantity)) {
      updateData.quantity = quantity;
    }
    if (condition) {
      updateData.condition = condition;
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
   * It publishes the entire collection for admin and just the inventory associated to an owner.
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

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(inventoryPublications.inventoryAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
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

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeInventoryAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(inventoryPublications.inventoryAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Inventorys = new InventoryCollection();
