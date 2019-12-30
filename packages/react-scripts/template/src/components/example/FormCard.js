import React from 'react'
import { css } from '@emotion/core'
import {
  Button,
  Card,
  CardContent,
  TextField,
  ZionForm,
  Autosuggest,
  Checkbox,
  colors,
  HeaderBlock,
  Grid,
  Cell,
} from '@fs/zion-ui'
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
      <HeaderBlock
        heading="Purpose Statement Generator"
        size="md"
        overline="Zion Form Example"
        subHeading="Fill in the following form to generate a new purpose statement."
      />
      <ZionForm
        onSubmit={(formData) => {
          handleFormSubmit(formData)
        }}
        initialValues={defaultValues}
        validationSchema={validationSchema}
        mustTouchToError
      >
        {({ handleReset, ...props }) => (
          <>
            <Grid>
              {/* Row 1 */}
              <Cell columns={5}>
                <TextField label="Adjective that ends with *ing" name="adjective1" placeholder="inspiring" />
              </Cell>
              <Cell columns={3}>
                <TextField label="Plural Noun" name="pluralNoun1" placeholder="experiences" />
              </Cell>

              {/* Row 2 */}
              <Cell columns={4}>
                <Autosuggest label="Emotion" name="emotion1" placeholder="joy" suggestions={emotionOptions} />
              </Cell>
              <Cell columns={4}>
                <TextField label="Plural Noun" name="pluralNoun2" placeholder="people" />
              </Cell>

              {/* Row 3 */}
              <Cell columns={2}>
                <TextField label="Verb" name="verb1" placeholder="discover" />
              </Cell>
              <Cell columns={2}>
                <TextField label="Verb" name="verb2" placeholder="gather" />
              </Cell>
              <Cell columns={2}>
                <TextField label="Verb" name="verb3" placeholder="connect" />
              </Cell>
              <Cell columns={2}>
                <TextField label="Plural Noun" name="pluralNoun3" placeholder="families" />
              </Cell>
              <Cell columns={8}>
                <TextField
                  label="Time Period (i.e Christmas, September 8th, next week, etc) "
                  name="timePeriod1"
                  placeholder="future"
                />
              </Cell>
              <Cell columns={8}>
                <Checkbox label="Debug Form" name="debug" />
              </Cell>
              <Cell columns={8}>
                {props.values.debug && (
                  <pre>{JSON.stringify({ errors: props.errors, values: props.values }, null, 2)}</pre>
                )}
              </Cell>
            </Grid>
            <InputRow>
              <Button type="submit" emphasis="high">
                Submit
              </Button>
              <Button onClick={handleReset}> Reset </Button>
            </InputRow>
          </>
        )}
      </ZionForm>
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
      <HeaderBlock heading="Our Purpose Statement" size="md" />

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
