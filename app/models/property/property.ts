import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */

const DEFAULT_AQUISITION_COST = 120000

const EMOLUTION_THRESHOLD_1 = 6500
const EMOLUTION_THRESHOLD_2 = 17000
const EMOLUTION_THRESHOLD_3 = 60000
const EMOLUTION_RATE_1 = 3.945 / 100
const EMOLUTION_RATE_2 = 1.627 / 100
const EMOLUTION_RATE_3 = 1.085 / 100
const EMOLUTION_RATE_4 = 0.814 / 100

export const PropertyModel = types
  .model("Property")
  .props({ aquisitionCost: types.optional(types.integer, DEFAULT_AQUISITION_COST) })
  .views((self) => ({
    get emolument_1() {
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_1) {
        return self.aquisitionCost * EMOLUTION_RATE_1
      }
      return EMOLUTION_RATE_1 * EMOLUTION_THRESHOLD_1
    },

    get emolument_2() {
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_1) {
        return 0
      }
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_2) {
        return (self.aquisitionCost - EMOLUTION_THRESHOLD_1) * EMOLUTION_RATE_2
      }

      return EMOLUTION_RATE_2 * (EMOLUTION_THRESHOLD_2 - EMOLUTION_THRESHOLD_1)
    },

    get emolument_3() {
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_2) {
        return 0
      }
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_3) {
        return (self.aquisitionCost - EMOLUTION_THRESHOLD_2) * EMOLUTION_RATE_3
      }

      return EMOLUTION_RATE_3 * (EMOLUTION_THRESHOLD_3 - EMOLUTION_THRESHOLD_2)
    },

    get emolument_4() {
      if (self.aquisitionCost < EMOLUTION_THRESHOLD_3) {
        return 0
      }
      return (self.aquisitionCost - EMOLUTION_THRESHOLD_3) * EMOLUTION_RATE_4
    },

    get emolument_ht() {
      return self.emolument_1 + self.emolument_2 + self.emolument_3 + self.emolument_4
    },

    get emolument_ttc() {
      return self.emolument_ht + self.emolument_ht * 0.2
    },

    get fraisNotaire() {
      return self.aquisitionCost * 2
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAquisitionCost(value: number) {
      if (isNaN(value)) {
        self.aquisitionCost = DEFAULT_AQUISITION_COST
      } else {
        self.aquisitionCost = value
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PropertyType = Instance<typeof PropertyModel>
export interface Property extends PropertyType {}
type PropertySnapshotType = SnapshotOut<typeof PropertyModel>
export interface PropertySnapshot extends PropertySnapshotType {}
export const createPropertyDefaultModel = () => types.optional(PropertyModel, {})
