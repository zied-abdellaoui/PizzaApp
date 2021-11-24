import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */

const DEFAULT_AQUISITION_COST = 120000
const DEFAULT_TVA_RATE = 0.2
const DEFAULT_DROIT_DEPARTEMENTAL = 0.045
const DEFAULT_TAXE_COMMUNAL = 0.012
const DEFAULT_FRAIS_ASSIETE = 0.00107
const DEFAULT_TAXE_PUBLICITE_FONCIERE = 0.00715
const DEFAULT_CONTRIBUTION_SECURITE_IMMOBILIERE = 0.001
const DEFAULT_FORMALITY_AMOUNT = 1360
const EMOLUTION_THRESHOLD_1 = 6500
const EMOLUTION_THRESHOLD_2 = 17000
const EMOLUTION_THRESHOLD_3 = 60000
const EMOLUTION_RATE_1 = 3.945 / 100
const EMOLUTION_RATE_2 = 1.627 / 100
const EMOLUTION_RATE_3 = 1.085 / 100
const EMOLUTION_RATE_4 = 0.814 / 100

export const PropertyModel = types
  .model("Property")
  .props({
    aquisitionCost: types.optional(types.integer, DEFAULT_AQUISITION_COST),
    _tvaRate: types.optional(types.number, DEFAULT_TVA_RATE),
    _droit_departemental_enregistrement: types.optional(types.number, DEFAULT_DROIT_DEPARTEMENTAL),
    _taxe_communal: types.optional(types.number, DEFAULT_TAXE_COMMUNAL),
    _frais_assiette: types.optional(types.number, DEFAULT_FRAIS_ASSIETE),
    _taxe_publicite_fonciere: types.optional(types.number, DEFAULT_TAXE_PUBLICITE_FONCIERE),
    _contribution_securite_immobiliere: types.optional(
      types.number,
      DEFAULT_CONTRIBUTION_SECURITE_IMMOBILIERE,
    ),
    _formality: types.optional(types.number, DEFAULT_FORMALITY_AMOUNT),
    _new: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get emolument_rate_1() {
      return EMOLUTION_RATE_1 * 100
    },

    get emolument_rate_2() {
      return EMOLUTION_RATE_2 * 100
    },

    get emolument_rate_3() {
      return EMOLUTION_RATE_3 * 100
    },

    get emolument_rate_4() {
      return EMOLUTION_RATE_4 * 100
    },

    get emolument_threshold_1() {
      return EMOLUTION_THRESHOLD_1
    },

    get emolument_threshold_2() {
      return EMOLUTION_THRESHOLD_2
    },

    get emolument_threshold_3() {
      return EMOLUTION_THRESHOLD_3
    },

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
      return self.emolument_ht + self.emolument_ht * self._tvaRate
    },

    get droitDepartemental() {
      if (self._new) {
        return 0
      }
      return self.aquisitionCost * self._droit_departemental_enregistrement
    },

    get taxeCommunale() {
      if (self._new) {
        return 0
      }
      return self._taxe_communal * self.aquisitionCost
    },

    get fraisAssiete() {
      if (self._new) {
        return 0
      }
      return self._frais_assiette * self.aquisitionCost
    },

    get taxePubliciteFonciere() {
      if (self._new === false) {
        return 0
      }
      return self._taxe_publicite_fonciere * self.aquisitionCost
    },

    get contributionSecuriteImmobiliere() {
      return self._contribution_securite_immobiliere * self.aquisitionCost
    },

    get droitDepartementalRate() {
      return 100 * self._droit_departemental_enregistrement
    },

    get taxeCommunaleRate() {
      return 100 * self._taxe_communal
    },

    get fraisAssieteRate() {
      return self._frais_assiette * 100
    },

    get taxePubliciteFonciereRate() {
      return self._taxe_publicite_fonciere * 100
    },

    get contributionSecuriteImmobiliereRate() {
      return self._contribution_securite_immobiliere * 100
    },

    get formalityAndDebours() {
      return self._formality
    },

    get taxes() {
      return (
        self.droitDepartemental +
        self.taxeCommunale +
        self.fraisAssiete +
        self.contributionSecuriteImmobiliere +
        self.taxePubliciteFonciere
      )
    },

    get price() {
      return self.aquisitionCost
    },

    get tvaRate() {
      return self._tvaRate * 100
    },

    get fraisNotaire() {
      return self.emolument_ttc + self.taxes + self.formalityAndDebours
    },

    get isNew() {
      return self._new
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

    setNew(newAquisition: boolean) {
      self._new = newAquisition
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PropertyType = Instance<typeof PropertyModel>
export interface Property extends PropertyType {}
type PropertySnapshotType = SnapshotOut<typeof PropertyModel>
export interface PropertySnapshot extends PropertySnapshotType {}
export const createPropertyDefaultModel = () => types.optional(PropertyModel, {})
