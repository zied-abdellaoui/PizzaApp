import { PropertyModel } from "./property"

test("can be created", () => {
  const instance = PropertyModel.create({})

  expect(instance).toBeTruthy()
})
