import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Inventorys } from './InventoryCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const inventoryDefineMethod = new ValidatedMethod({
  name: 'InventoryCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('inventoryDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Inventorys.define(definitionData);
      // console.log(`inventoryDefineMethod returning ${docID}. Now have ${Inventorys.count()}`);
      return docID;
    }
    return '';
  },
});

export const inventoryUpdateMethod = new ValidatedMethod({
  name: 'InventoryCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Inventorys.update(updateData.id, updateData);
    return true;
  },
});

export const inventoryRemoveItMethod = new ValidatedMethod({
  name: 'InventoryCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Inventorys.removeIt(instance);
  },
});
