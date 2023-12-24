const obituaryTemplates = [
  {
    id: 1,
    category: 'general',
    data: `
        <p>In love and gratitude, we share the news of the death of our beloved {{familyRoles}}</p>
        <p></p>
        <p>{{firstName}} {{lastName}}</p>
        <p>{{dateOfBirth}} - {{dateOfDeath}}</p>
        <p></p>
        <p>{{maritalStatus}} of {{partnerName}}</p>
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
        <p>
          People willing to honour her, can do so by donating to {{nonProfits}},
          Account {{bic}} {{iban}} at the BCEE, with the communication “Don {{firstName}} {{lastName}}”
        </p>
        <p></p>
        <p>{{specialThanks}}</p>
        `,
  },
  {
    id: 2,
    category: 'general',
    data: `
        <p>With love and gratitude we announce the death of our dear {{familyRoles}}</p>
        <p></p>
        <p>{{firstName}} {{lastName}}</p>
        <p>{{dateOfBirth}} - {{dateOfDeath}}</p>
        <p></p>
        <p>{{maritalStatus}} of {{partnerName}}</p>
        <p></p>
        <p>
          A mass for the deceased will be held on {{serviceDate}} at {{serviceTime}} in the church in {{servicePlace}}.
          The funeral will take place at {{funeralTime}} in {{funeralPlace}}.
        </p>
        <p></p>
        <p>Grieving:</p>
        <ul>{{relatives}}</ul>
        <p></p>
        <p>
          {{relativeCities}} the {{serviceDate}}
        </p>
        <p></p>
        <p>
          Those who wish to honour the memory of our dearly departed are welcome to do so
          by making a donation to the {{nonProfits}} to the account {{bic}} {{iban}} with the reference "Don {{firstName}} {{lastName}}"
        </p>
        <p></p>
        <p>{{specialThanks}}</p>
        `,
  },
]

export default obituaryTemplates
