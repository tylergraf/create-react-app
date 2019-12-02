import React from 'react'
import { css } from '@emotion/core'
import { Button, Card, CardContent, TextField, ZionForm, Autosuggest, TypeBlock, Checkbox, colors } from '@fs/zion-ui'
import InputRow from '@fs/zion-ui/input-row'
import * as Yup from 'yup'

const FormCard = () => {
  const [data, setData] = React.useState()

  const handleFormSubmit = (formData) => {
    setData(formData)
  }

  const handleStartOver = () => setData(null)

  return (
    <Card>
      <CardContent>
        {data ? (
          <PurposeStatement data={data} handleStartOver={handleStartOver} />
        ) : (
          <InputForm handleFormSubmit={handleFormSubmit} />
        )}
      </CardContent>
    </Card>
  )
}

const InputForm = ({ handleFormSubmit }) => {
  // Create a list of options for the autosuggest form element
  const emotions = ['joy', 'surprise', 'glee', 'astonishment', 'thirst', 'surprise']
  const emotionOptions = emotions.map((emotion, idx) => ({ id: idx, primaryText: emotion }))

  // Yup is a 3rd party library for validating
  // objects. It has a similar api to prop-types.
  // Docs here: https://www.npmjs.com/package/yup
  const validationSchema = Yup.object().shape({
    adjective1: Yup.string()
      .matches(/ing$/, 'must end with "ing"')
      .required(),
    pluralNoun3: Yup.string()
      .min(3)
      .max(10)
      .required(),

    pluralNoun1: Yup.string().required(),
    emotion1: Yup.string().required(),
    pluralNoun2: Yup.string().required(),
    verb1: Yup.string().required(),
    verb2: Yup.string().required(),
    verb3: Yup.string().required(),
    timePeriod1: Yup.string().required(),
  })

  const defaultValues = {
    adjective1: 'inspiring',
    pluralNoun1: 'experiences',
    emotion1: emotionOptions[0],
    pluralNoun2: 'people',
    pluralNoun3: 'families',
    verb1: 'discover',
    verb2: 'gather',
    verb3: 'connect',
    timePeriod1: 'future',
  }
  return (
    <>
      <TypeBlock
        header="Purpose Statement Generator"
        overline="Zion Form Example"
        subHeader="Fill in the following form to generate a new purpose statement."
      />
      <ZionForm
        onSubmit={(formData) => {
          handleFormSubmit(formData)
        }}
        initialValues={defaultValues}
        validationSchema={validationSchema}
        mustTouchToError
        render={({ values, errors, ...props }) => (
          <>
            <TextField label="Adjective that ends with *ing" name="adjective1" placeholder="inspiring" />
            <TextField label="Plural Noun" name="pluralNoun1" placeholder="experiences" />
            <Autosuggest label="Emotion" name="emotion1" placeholder="joy" options={emotionOptions} />
            <TextField label="Plural Noun" name="pluralNoun2" placeholder="people" />
            <TextField label="Verb" name="verb1" placeholder="discover" />
            <TextField label="Verb" name="verb2" placeholder="gather" />
            <TextField label="Verb" name="verb3" placeholder="connect" />
            <TextField label="Plural Noun" name="pluralNoun3" placeholder="families" />
            <TextField
              label="Time Period (i.e Christmas, September 8th, next week, etc) "
              name="timePeriod1"
              placeholder="future"
            />

            <Checkbox label="Debug Form" name="debug" />
            {values.debug && <pre>{JSON.stringify({ errors, values }, null, 2)}</pre>}

            <InputRow>
              <Button type="submit" emphasis="high">
                Submit
              </Button>
              <Button onClick={props.handleReset}> Reset </Button>
            </InputRow>
          </>
        )}
      />
    </>
  )
}

const PurposeStatement = ({
  handleStartOver,
  data: { adjective1, pluralNoun1, emotion1, pluralNoun2, pluralNoun3, verb1, verb2, verb3, timePeriod1 },
}) => {
  const containerCss = css`
    margin-top: 15px;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-size: 20px;
    color: ${colors.text.secondary};
  `

  return (
    <>
      <TypeBlock header="Our Purpose Statement" />

      <div css={containerCss}>
        We create {adjective1} {pluralNoun1} that bring {emotion1.primaryText} to all {pluralNoun2} as they {verb1},{' '}
        {verb2} and {verb3} their {pluralNoun3} - past, present and {timePeriod1}.
      </div>
      <Button keyline="left" onClick={handleStartOver}>
        Start Over
      </Button>
    </>
  )
}

// Use React.memo() to keep our component from re-rendering if the props haven't changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(FormCard)
