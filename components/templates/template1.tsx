import { formatToUiDate } from '@/lib/utils'
import useAuthStore from '@/store/auth'
import _ from 'lodash'

export default function Template1({ data }: { data: AnnouncementFrontend }) {
  const user = useAuthStore((s) => s.user)

  return (
    <>
      <p>In love and gratitude, we share the news of the death of our beloved {data.familyRoles?.join(', ')}</p>
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
            {data.closestFamilyCircle
              ? 'The funeral will take place in the closest family circle'
              : `The funeral takes place on ${formatToUiDate(data.serviceDate)} at ${
                  data.funeralTime
                } o&apos;clock at the
            cemetery in ${data.funeralPlace}`}
            , {data.servicePlace && `followed by a ceremony in the ${data.servicePlace}`}
          </p>
          <p></p>
        </>
      )}

      {data.relatives && data.relatives?.length > 0 && (
        <>
          <p>Mourning:</p>
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
            {data.serviceDate && `on the ${formatToUiDate(data.serviceDate)}`}
          </p>
          <p></p>
        </>
      )}

      {data.nonProfits && data.nonProfits?.length > 0 && (
        <p>
          People willing to honour her, can do so by donating to{' '}
          {data.nonProfits?.map((e) => `\"${e.name}\"`).join(', ')}, Account {user.bic} {user.iban} at the BCEE, with
          the communication “Don {data.firstName} {data.lastName}”
        </p>
      )}
    </>
  )
}
