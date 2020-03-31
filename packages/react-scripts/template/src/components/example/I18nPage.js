import React from 'react'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next/icu.macro'
import { i18n, listOfMonths, listOfYears, listOfDaysInWeek, daysOfMonth, formatValue } from '@fs/zion-locale'
import {
  format,
  formatDistanceStrict,
  add,
  sub,
  subDays,
  subYears,
  setDate,
  setDay,
  setYear,
  setMonth,
  parseISO,
  addHours,
  addWeeks,
  startOfWeek,
} from '@fs/zion-locale/date-fns'
import { css } from '@emotion/core'
import {
  Body1,
  Cell,
  Grid,
  HeaderBlock,
  Separator,
  useAtSize,
  colors,
  SubheaderBlock,
  DataBlock,
  Select,
  InputRow,
  Divider,
  LayoutBand,
  List,
  ListItem,
} from '@fs/zion-ui'
import { Link } from '@fs/zion-router'

// normally we would use lodash-es for this, but trying to reduce dependencies for demo
const random = (lower, upper) => lower + Math.floor(Math.random() * (upper - lower + 1))
const sample = (array) => array[Math.floor(Math.random() * array.length)]

const purposeStatementCss = css`
  height: 100%;
  color: ${colors.feedback.confirmation.accent};
  background-color: ${colors.background.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 50px;
  text-align: center;
`
const highlightCss = css`
  color: ${colors.billboard.blue20};
`

const currentLocaleCss = css`
  color: ${colors.text.secondary};
  background-color: ${colors.background.secondary};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
`

const PurposeStatement = () => {
  return (
    <div css={purposeStatementCss}>
      <HeaderBlock
        size="md"
        heading={
          <Trans
            i18nKey="familysearch.purpose.statement"
            defaults="We create inspiring experiences that bring joy <span css={highlightCss}>to all people</span> as they
            discover, gather and connect their families — past, present and future."
            values={{ highlightCss }}
          />
        }
      />
    </div>
  )
}

const DatePicker = () => {
  const [t] = useTranslation()
  const [calculatedDate, setCalculatedDate] = React.useState(new Date())
  const currentYear = new Date().getFullYear()

  return (
    <>
      <InputRow>
        <Select
          name="days-of-week"
          label={t('common-ui:day.label', 'Day')}
          options={listOfDaysInWeek().map((day, index) => ({
            value: String(index),
            label: day,
          }))}
          value={String(calculatedDate.getDay())}
          onChange={(e) => setCalculatedDate(setDay(calculatedDate, e.target.value))}
        />
        <Select
          name="days"
          label={t('common-ui:day.label', 'Day')}
          options={daysOfMonth(calculatedDate).map((day) => ({
            value: String(day),
            label: day,
          }))}
          value={String(calculatedDate.getDate())}
          onChange={(e) => setCalculatedDate(setDate(calculatedDate, e.target.value))}
        />
        <Select
          name="months"
          label={t('common-ui:month.label', 'Month')}
          options={listOfMonths().map((month, index) => ({
            value: String(index),
            label: month,
          }))}
          value={String(calculatedDate.getMonth())}
          onChange={(e) => setCalculatedDate(setMonth(calculatedDate, e.target.value))}
        />
        <Select
          name="years"
          label={t('common-ui:year.label', 'Year')}
          options={listOfYears(currentYear - 110, currentYear).map((year) => ({
            value: String(year),
            label: year,
          }))}
          value={String(calculatedDate.getFullYear())}
          onChange={(e) => setCalculatedDate(setYear(calculatedDate, e.target.value))}
        />
        <Separator size="lg" />
        <DataBlock
          heading=""
          data={
            <>
              Formatted Date:
              <br />
              {format(calculatedDate, 'PPPP')}
            </>
          }
        />
      </InputRow>
    </>
  )
}

// If you need to conditionally calculate a translation key, do not pass a calculated key name to the `t` function
// NOT RECOMMENDED: i18n.t(`${event.type}.label`)
// Instead, create a mapping object or mapping function that contains all the possible values specifically listed
// and look up from that list.
const eventLabels = {
  BIRTH: i18n.t('birth.label', 'Birth'),
  DEATH: i18n.t('death.label', 'Death'),
}

const I18nPage = () => {
  const [t] = useTranslation()
  const atSize = useAtSize()
  const smallNumber = random(0, 10)
  const largeNumber = random(1000, 10000000)
  const yesterday = subDays(new Date(), 1)
  const somePastDate = sub(new Date(), {
    years: random(0, 100),
    months: random(0, 12),
    days: random(0, 31),
    hours: random(0, 24),
    minutes: random(0, 60),
    seconds: random(0, 60),
  })
  const imageThirdPartyURL = 'https://billiongraves.com/'
  const imageThirdPartyProvider = 'BillionGraves'
  const contribution = {
    title: 'Halifax County, North Carolina Genealogy',
    name: 'Debbie Gurtler',
    date: subYears(new Date(), 1),
  }
  const attribution = {
    name: 'Fred Jones',
    date: yesterday,
  }
  const event = {
    type: Math.random() > 0.5 ? 'BIRTH' : 'DEATH',
    timestamp: '1891-09-27T07:00:00.000Z',
    place: 'Wilcox, Cochise, Arizona, United States',
  }
  // maintenance begins 1 hour after the start of next week
  const maintenance = {
    start: addHours(addWeeks(startOfWeek(new Date()), 1), 1),
    duration: { hours: random(0, 4), minutes: sample([0, 15, 30, 45]) },
  }

  return (
    <LayoutBand>
      <Separator size="sm" />
      <Grid>
        <Cell columns={atSize({ sm: 8 })}>
          <HeaderBlock
            size={atSize({ default: 'md', md: 'lg', lg: 'xl' })}
            heading={t('familysearch.purpose.all-people.title', 'To All People')}
            subHeading={t('i18n-page.sub-title', 'Internationalization in Frontier')}
          />
        </Cell>

        <Cell>
          <div css={currentLocaleCss}>
            <Body1>
              The currently active locale code is <strong>{i18n.language}</strong>.
            </Body1>
            <Separator />
            <Body1>
              You can use the Language menu in the footer to change the language. All of the strings below should be
              localized in our core 10 languages.
            </Body1>
          </div>
        </Cell>

        <Cell>
          <PurposeStatement />
        </Cell>

        <Cell>
          <HeaderBlock heading="Simple Strings" size="sm" />
          <Divider />

          <Cell>
            <Body1>{t('try.new.experience.feedback', 'Please try the new experience, and give feedback.')}</Body1>
            <HeaderBlock size="xs" heading={t('nav.overview', 'Overview')} />
            <Body1>{t('error.try.again.message', 'An error occurred. Please try again.')}</Body1>
            <Link to="sample-images">{t('sample.images', 'Sample Images')}</Link>
            <Body1>
              {t(
                'error.message.body',
                'An error has occurred that may affect your ability to use this page. FamilySearch has been notified.'
              )}
            </Body1>
          </Cell>

          <HeaderBlock heading="Interpolation" size="sm" />
          <Divider />

          <Cell>
            <Body1>
              <Trans
                i18nKey="changes.feedback"
                defaults="We've made a few changes to give you a better experience. We'd love to hear your <Link to='feedback'>feedback</Link> for further improvements."
              />
            </Body1>
            <Body1>
              {t('modified.attribution', 'Modified: {date, date} by {user}', {
                date: attribution.date,
                user: attribution.name,
              })}
            </Body1>
            <Body1>
              {t(
                'app.unavailable.alert',
                '{app} will be unavailable as we make improvements to the site starting {weekday}, {month} {ordinalDayOfMonth} at {time} (UTC{utcOffset}) and lasting about {duration}.  We apologize for the inconvenience.',
                {
                  weekday: listOfDaysInWeek()[maintenance.start.getDay()],
                  month: listOfMonths()[maintenance.start.getMonth()],
                  ordinalDayOfMonth: format(maintenance.start, 'do'),
                  time: format(maintenance.start, 'p'),
                  utcOffset: format(new Date(), 'xxx'),
                  duration: formatDistanceStrict(maintenance.start, add(maintenance.start, maintenance.duration)),
                  app: 'Frontier',
                }
              )}
            </Body1>
            <Body1>
              <Trans
                i18nKey="image.permissions.action"
                defaults="At <a target='_blank' href={imageThirdPartyURL} itemProp='image'>{imageThirdPartyProvider}</a>. By clicking here you will be leaving FamilySearch.org (fees and other terms may apply)."
                values={{
                  imageThirdPartyURL,
                  imageThirdPartyProvider,
                }}
              />
            </Body1>

            <List>
              <ListItem
                primaryText={t(
                  'pending.members',
                  '{count, plural, =0 {No Pending Members} one {# Pending Member} other {# Pending Members}}',
                  { count: 0 }
                )}
              />
              <ListItem
                primaryText={t(
                  'pending.members',
                  '{count, plural, =0 {No Pending Members} one {# Pending Member} other {# Pending Members}}',
                  { count: 1 }
                )}
              />
              <ListItem
                primaryText={t(
                  'pending.members',
                  '{count, plural, =0 {No Pending Members} one {# Pending Member} other {# Pending Members}}',
                  { count: 2 }
                )}
              />
              <ListItem
                primaryText={t(
                  'pending.members',
                  '{count, plural, =0 {No Pending Members} one {# Pending Member} other {# Pending Members}}',
                  { count: 3 }
                )}
              />
              <ListItem
                primaryText={t(
                  'pending.members',
                  '{count, plural, =0 {No Pending Members} one {# Pending Member} other {# Pending Members}}',
                  { count: 1000 }
                )}
              />
            </List>
          </Cell>

          <HeaderBlock heading="Numbers" size="sm" />
          <Divider />

          <Cell>
            <Body1>
              {t(
                'displaying.film.count',
                '(This family history center has {location_count, number} of {total_count, number} films',
                { location_count: smallNumber, total_count: largeNumber }
              )}
            </Body1>
            <Body1>
              {t('upload.progress', '{percent, number, percent} of {totalSize, number}', {
                percent: Math.random(),
                totalSize: largeNumber,
              })}
            </Body1>
            <Body1>
              {t('attach.error.message', '{errorCount, number} of {totalCount, number} Attachments Failed', {
                errorCount: smallNumber,
                totalCount: largeNumber,
              })}
            </Body1>
            <Body1>{formatValue(Math.random() / smallNumber, 'percent')}</Body1>
          </Cell>

          <HeaderBlock heading="Dates & Times" size="sm" />
          <Divider />

          <Cell>
            <DataBlock
              heading={eventLabels[event.type]}
              data={
                <>
                  {format(parseISO(event.timestamp))}
                  <br />
                  {event.place}
                </>
              }
            />
            <SubheaderBlock
              size="sm"
              heading={contribution.title}
              subHeading={`${t('common-ui:by.contributor.label', 'by {contributorName}', {
                contributorName: contribution.name,
              })} | ${format(contribution.date)}`}
            />
            <DatePicker />
            <Body1>{t('auto-save.label', 'Saved automatically at {time, time, short}', { time: new Date() })}</Body1>
            <Body1>
              {t('lesson.plan.title.placeholder', 'Lesson {number, number} ({date, date, medium})', {
                number: smallNumber,
                date: somePastDate,
              })}
            </Body1>
          </Cell>
        </Cell>
      </Grid>
    </LayoutBand>
  )
}
export default I18nPage
