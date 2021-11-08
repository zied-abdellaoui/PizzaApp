import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PropertyModel = types
  .model("Property")
  .props({ aquisitionCost: types.optional(types.integer, 120000) })
  .views((self) => ({
    get fraisNotaire() {
      return self.aquisitionCost * 2
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAquisitionCost(value: number) {
      self.aquisitionCost = value
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PropertyType = Instance<typeof PropertyModel>
export interface Property extends PropertyType {}
type PropertySnapshotType = SnapshotOut<typeof PropertyModel>
export interface PropertySnapshot extends PropertySnapshotType {}
export const createPropertyDefaultModel = () => types.optional(PropertyModel, {})
