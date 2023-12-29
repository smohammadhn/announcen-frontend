export const DATE_FORMAT = 'YYYY-MM-DD'
export const UI_DATE_FORMAT = 'DD/MM/YYYY'
export const REGEX_TIME = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

export const defaultAnnouncementObject = {
  relatives: [{ name: '{{relatives}}', partnerName: '{{relative partners}}', city: '{{relative cities}}' }],
  nonProfits: [{ name: '{{non-Profits}}' }],
  familyRoles: ['{{familyRole1}}'],
  firstName: '{{ firstName }}',
  lastName: '{{ lastName }}',
  partnerName: '{{ partnerName }}',
  funeralTime: '{{ funeralTime }}',
  serviceTime: '{{ serviceTime }}',
  funeralPlace: '{{ funeralPlace }}',
  servicePlace: '{{ servicePlace }}',
  specialThanks: '{{ specialThanks }}',
  maritalStatus: '{{ maritalStatus }}',
  bic: '{{ bic }}',
  iban: '{{ iban }}',
  serviceDate: '{{ serviceDate }}',
  dateOfBirth: '{{ dateOfBirth }}',
  dateOfDeath: '{{ dateOfDeath }}',
}
