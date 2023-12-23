const obituaryTemplates = [
  {
    id: 1,
    data: `
        <p>In love and gratitude, we share the news of the death of our beloved {{familyRoles}}</p>
        <p></p>
        <p>{{firstName}} {{lastName}}</p>
        <p>{{dateOfBirth}} - {{dateOfDeath}}</p>
        <p></p>
        <p>Widower of {{partnerName}}</p>
        <p>
          The funeral takes place on {{serviceDate}} at {{funeralTime}} o&apos;clock at the
          cemetery in {{funeralPlace}}, followed by a ceremony in the {{servicePlace}}
        </p>
        <p></p>
        <p>Mourning:</p>
        <ul>{{relatives}}</ul>
        <p></p>
        <p>
          {{relativeCities}} on the {{serviceDate}}
        </p>
        <p></p>
        <p>{{specialThanks}}</p>
        `,
  },
]

export default obituaryTemplates
