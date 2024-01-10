import { formatToUiDate } from '@/lib/utils'
import generalService from '@/services/generalService'
import _ from 'lodash'
import moment from 'moment'

export default function Template1({ data }: { data: AnnouncementFrontend }) {
  const { data: allCities } = generalService.read()
  const { data: allOrg } = generalService.getAllOrganizations()

  const relativeCitiesList = _.uniq(
    data.relatives
      ?.map(({ city }) => allCities?.find((other) => other.id === city))
      .filter((e) => e != null)
      .map((e) => _.upperFirst(e?.name))
  )

  const nonProfitsList = _.uniq(
    data.nonProfits?.map((itemId) => allOrg?.find(({ _id }) => _id === itemId)).filter((e) => e != null)
  )

  return (
    <>
      <p>With love and gratitude we announce the death of our dear {data.familyRoles?.join(', ')}</p>
      <p></p>
      <p>
        <strong>
          {data.firstName} {data.lastName}
        </strong>
      </p>
      <p>
        {formatToUiDate(data.dateOfBirth)} - {formatToUiDate(data.dateOfDeath)}
      </p>
      {data.maritalStatus && (
        <p>
          {_.upperFirst(data.maritalStatus)} {data.partnerName && `of ${data.partnerName}`}
        </p>
      )}

      <p></p>

      {data.servicePlace && (
        <p>
          {data.servicePlace &&
            `A mass for the deceased will be held on ${formatToUiDate(data.serviceDate)} at ${data.serviceTime} in the
            church in ${data.servicePlace}.`}
        </p>
      )}

      {(data.funeralPlace || data.closestFamilyCircle) && (
        <>
          <p>
            {data.closestFamilyCircle
              ? `The funeral will take place in the closest family circle.`
              : `The funeral will take place at ${data.funeralTime} in ${data.funeralPlace}.`}
          </p>
          <p></p>
        </>
      )}

      {data.relatives && data.relatives?.length > 0 && (
        <>
          <p>Grieving:</p>
          <ul>
            {data.relatives?.map((e, i) => (
              <li key={e.name + i}>
                {e.name} {e.partnerName && `and ${e.partnerName}`} {e.children === 'yes' && 'with their children'}
              </li>
            ))}
          </ul>
          <p></p>
        </>
      )}

      {data.specialThanks && (
        <>
          <p>{data.specialThanks}</p>
          <p></p>
        </>
      )}

      {relativeCitiesList.length > 0 && (
        <>
          <p>
            {relativeCitiesList.join(', ')} {`the ${formatToUiDate(moment().toISOString())}`}
          </p>
          <p></p>
        </>
      )}

      {nonProfitsList.length > 0 && (
        <p>
          Those who wish to honour the memory of our dearly departed are welcome to do so by making a donation to{' '}
          {nonProfitsList.map((e) => `\"${_.upperFirst(e?.name)}\" to the account ${e?.bic} ${e?.iban}`).join(' or ')},
          with the reference “Don {data.firstName} {data.lastName}”
        </p>
      )}
    </>
  )
}
