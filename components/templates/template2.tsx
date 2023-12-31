import { formatToUiDate } from '@/lib/utils'
import useAuthStore from '@/store/auth'
import _ from 'lodash'

export default function Template1({ data }: { data: AnnouncementFrontend }) {
  const user = useAuthStore((s) => s.user)

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
          {_.upperFirst(data.maritalStatus || undefined)} {data.partnerName && `of ${data.partnerName}`}
        </p>
      )}

      <p></p>

      {(data.servicePlace || data.funeralPlace) && (
        <>
          <p>
            {data.servicePlace &&
              `A mass for the deceased will be held on ${formatToUiDate(data.serviceDate)} at ${data.serviceTime} in the
            church in ${data.servicePlace}.`}
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

      {data.relatives && data.relatives?.length > 0 && (
        <>
          <p>
            {_.uniq(data.relatives?.map((e) => e.city).filter((e) => e != null)).join(', ')}{' '}
            {data.serviceDate && `the ${formatToUiDate(data.serviceDate)}`}
          </p>
          <p></p>
        </>
      )}

      {data.nonProfits && data.nonProfits?.length > 0 && (
        <p>
          Those who wish to honour the memory of our dearly departed are welcome to do so by making a donation to{' '}
          {data.nonProfits?.map((e) => `\"${e.name}\"`).join(', ')}, to the account {user.bic} {user.iban} with the
          reference “Don {data.firstName} {data.lastName}”
        </p>
      )}
    </>
  )
}
