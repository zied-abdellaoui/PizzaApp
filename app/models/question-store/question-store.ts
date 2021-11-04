import { flow } from "mobx"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetQuestionsResult } from "../../services/api"
import { withEnvironment } from "../extensions/with-environment"
import { QuestionModel, QuestionSnapshot, Question } from "../question/question"

/**
 * Model description here for TypeScript hints.
 */
export const QuestionStoreModel = types
  .model("QuestionStore")
  .props({ questions: types.optional(types.array(QuestionModel), []) })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveQuestions: (questionSnapshots: QuestionSnapshot[]) => {
      const questionModels: Question[] = questionSnapshots.map((c) => QuestionModel.create(c)) // create model instances from the plain objects
      self.questions.replace(questionModels) // Replace the existing data with the new data
    },
  }))
  .actions((self) => ({
    getQuestions: flow(function* () {
      __DEV__ && console.tron.log("getQuestions")
      const result: GetQuestionsResult = yield self.environment.api.getQuestions()

      if (result.kind === "ok") {
        self.saveQuestions(result.questions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
type QuestionStoreType = Instance<typeof QuestionStoreModel>
export interface QuestionStore extends QuestionStoreType {}
type QuestionStoreSnapshotType = SnapshotOut<typeof QuestionStoreModel>
export interface QuestionStoreSnapshot extends QuestionStoreSnapshotType {}
export const createQuestionStoreDefaultModel = () => types.optional(QuestionStoreModel, {})
