import { create } from 'zustand'

interface AnnouncementStore {
  checkboxMaritalStatus: boolean
  checkboxFamilyRoles: boolean
  checkboxService: boolean
  checkboxFuneral: boolean
  includeRelativeNames: boolean
  includeRelativeCities: boolean
  includeSpecialThanks: boolean
  includeNonProfit: boolean

  setIncludeRelativeNames: (input: boolean) => void
  setIncludeRelativeCities: (input: boolean) => void
  setIncludeSpecialThanks: (input: boolean) => void
  setIncludeNonProfit: (input: boolean) => void
  setCheckboxService: (input: boolean) => void
  setCheckboxFuneral: (input: boolean) => void
  setCheckboxMaritalStatus: (input: boolean) => void
  setCheckboxFamilyRoles: (input: boolean) => void

  reset: () => void
}

const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  checkboxMaritalStatus: true,
  checkboxFamilyRoles: true,
  checkboxService: true,
  checkboxFuneral: true,
  includeRelativeNames: true,
  includeRelativeCities: true,
  includeSpecialThanks: true,
  includeNonProfit: true,

  setCheckboxMaritalStatus: (v) => set((_) => ({ checkboxMaritalStatus: v })),
  setCheckboxFamilyRoles: (v) => set((_) => ({ checkboxFamilyRoles: v })),
  setCheckboxService: (v) => set((_) => ({ checkboxService: v })),
  setCheckboxFuneral: (v) => set((_) => ({ checkboxFuneral: v })),
  setIncludeRelativeNames: (v) => set((_) => ({ includeRelativeNames: v })),
  setIncludeRelativeCities: (v) => set((_) => ({ includeRelativeCities: v })),
  setIncludeSpecialThanks: (v) => set((_) => ({ includeSpecialThanks: v })),
  setIncludeNonProfit: (v) => set((_) => ({ includeNonProfit: v })),

  reset: () =>
    set((_) => ({
      checkboxMaritalStatus: true,
      checkboxFamilyRoles: true,
      checkboxService: true,
      checkboxFuneral: true,
      includeRelativeNames: true,
      includeRelativeCities: true,
      includeSpecialThanks: true,
      includeNonProfit: true,
    })),
}))

export default useAnnouncementStore
