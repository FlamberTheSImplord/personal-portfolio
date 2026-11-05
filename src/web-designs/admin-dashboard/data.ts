// Sample data transcribed from the Admin Dashboard V2 reel frames. Values that
// the reel crops out (later payout rows, second-row listings) are illustrative.

export type Screen = 'overview' | 'finance' | 'moderation' | 'announcements'
export type Scene = 'villa' | 'palm-villa' | 'gallery-lounge' | 'bright-lounge' | 'red-chair' | 'plant-lounge' | 'loft' | 'garden-house' | 'studio'

export const months8 = [
  { month: 'Apr', value: 31200, deals: 5 }, { month: 'May', value: 28400, deals: 4 },
  { month: 'Jun', value: 35700, deals: 6 }, { month: 'Jul', value: 34000, deals: 5 },
  { month: 'Aug', value: 41000, deals: 7 }, { month: 'Sep', value: 38600, deals: 6 },
  { month: 'Oct', value: 44900, deals: 7 }, { month: 'Nov', value: 42500, deals: 6 },
]
export const periods = { '3 months': 3, '6 months': 6, '8 months': 8 } as const
export type Period = keyof typeof periods

// Clockwise from twelve o'clock, as the donut is drawn in the reel.
export const offices = [
  { name: 'Podil (HQ)', value: 48080, color: '#2a6fd6' },
  { name: 'Pechersk', value: 26360, color: '#de5d3c' },
  { name: 'Obolon', value: 109260, color: '#14a073' },
  { name: 'Left Bank', value: 53000, color: '#e0901a' },
]

export const financeMonths = [
  { month: 'Apr', value: 31000 }, { month: 'May', value: 27400 }, { month: 'Jun', value: 33700 }, { month: 'Jul', value: 31000 },
  { month: 'Aug', value: 35800 }, { month: 'Sep', value: 31000 }, { month: 'Oct', value: 31000 }, { month: 'Nov', value: 23700 },
]

export type Payout = { id: string; initials: string; agent: string; ref: string; property: string; client: string; commission: number; share: number; pay: number; status: 'overdue' | 'due' | 'paid' }
export const payouts: Payout[] = [
  { id: 'p1', initials: 'TL', agent: 'Taras Lytvyn', ref: 'SA-2026/139 · Oct 26', property: '3-bed, Lypky', client: 'Hanna Stelmakh', commission: 5600, share: 45, pay: 2520, status: 'overdue' },
  { id: 'p2', initials: 'AM', agent: 'Anna Moroz', ref: 'RA-2026/141 · Oct 28', property: 'Studio rental, Osokorky', client: 'Ihor Pavlenko', commission: 480, share: 50, pay: 240, status: 'overdue' },
  { id: 'p3', initials: 'MT', agent: 'Maryna Tkachenko', ref: 'SA-2026/144 · Nov 1', property: '2-bed, Obolon', client: 'Olena Kravets', commission: 3360, share: 45, pay: 1512, status: 'due' },
  { id: 'p4', initials: 'MB', agent: 'Maksym Bondar', ref: 'SA-2026/147 · Nov 2', property: 'House, Koncha-Zaspa', client: 'Petro Shevchuk', commission: 8850, share: 40, pay: 3540, status: 'due' },
  { id: 'p5', initials: 'NL', agent: 'Natalia Lysenko', ref: 'RA-2026/148 · Nov 3', property: '1-bed rental, Podil', client: 'Dmytro Koval', commission: 650, share: 50, pay: 325, status: 'due' },
  { id: 'p6', initials: 'TL', agent: 'Taras Lytvyn', ref: 'RA-2026/150 · Nov 4', property: 'Room rental, Solomianka', client: 'Iryna Hrytsenko', commission: 440, share: 50, pay: 220, status: 'due' },
  { id: 'p7', initials: 'NL', agent: 'Natalia Lysenko', ref: 'SA-2026/131 · Oct 12', property: '3-bed, Pechersk', client: 'Yurii Melnyk', commission: 4800, share: 45, pay: 2160, status: 'paid' },
  { id: 'p8', initials: 'MT', agent: 'Maryna Tkachenko', ref: 'SA-2026/133 · Oct 15', property: 'Townhouse, Teremky', client: 'Oksana Boiko', commission: 4200, share: 45, pay: 1890, status: 'paid' },
  { id: 'p9', initials: 'MB', agent: 'Maksym Bondar', ref: 'SA-2026/135 · Oct 19', property: '1-bed, Pozniaky', client: 'Serhii Tkach', commission: 2973, share: 45, pay: 1338, status: 'paid' },
]

export type Check = { ok: boolean; label: string }
export type Listing = { id: string; price: string; title: string; address: string; initials: string; agent: string; code: string; checks: Check[]; type: 'Sale' | 'Rent'; photos: number; scene: Scene; status: 'review' | 'approved' | 'rejected' }
const passed = [{ ok: true, label: 'All checks passed' }]
export const listings: Listing[] = [
  { id: 'CX-1077', price: '$420,000', title: '4-bed penthouse overlooking the Dnipro', address: 'Pecherskyi · 2 Drahomyrova St', initials: 'TL', agent: 'Taras Lytvyn', code: 'CX-1077 · 6 h ago', checks: passed, type: 'Sale', photos: 18, scene: 'villa', status: 'review' },
  { id: 'CX-1076', price: '$480/mo', title: 'New-build studio, Osokorky', address: 'Darnytskyi · 40 Revutskoho St', initials: 'NL', agent: 'Natalia Lysenko', code: 'CX-1076 · 4 h ago', checks: [{ ok: false, label: 'Short description' }, { ok: false, label: 'Check address' }], type: 'Rent', photos: 9, scene: 'palm-villa', status: 'review' },
  { id: 'CX-1075', price: '$112,000', title: 'Renovated 2-bed apartment, Obolon embankment', address: 'Obolonskyi · 15 Obolonska Embankment', initials: 'MT', agent: 'Maryna Tkachenko', code: 'CX-1075 · 3 h ago', checks: passed, type: 'Sale', photos: 11, scene: 'gallery-lounge', status: 'review' },
  { id: 'CX-1074', price: '$295,000', title: '180 m² house on an 8-are plot, Koncha-Zaspa', address: 'Holosiivskyi · 7 Desnianska St', initials: 'MB', agent: 'Maksym Bondar', code: 'CX-1074 · 2 h ago', checks: [{ ok: false, label: 'No documents' }], type: 'Sale', photos: 22, scene: 'bright-lounge', status: 'review' },
  { id: 'CX-1073', price: '$650/mo', title: '1-bed flat with balcony, Lukianivka', address: 'Shevchenkivskyi · 11 Dehtiarivska St', initials: 'AM', agent: 'Anna Moroz', code: 'CX-1073 · 1 h ago', checks: [{ ok: false, label: 'Blurry photos' }], type: 'Rent', photos: 6, scene: 'red-chair', status: 'review' },
  { id: 'CX-1072', price: '$138,500', title: 'Sunny 2-bed with a reading nook, Podil', address: 'Podilskyi · 24 Kostiantynivska St', initials: 'TL', agent: 'Taras Lytvyn', code: 'CX-1072 · 40 min ago', checks: passed, type: 'Sale', photos: 14, scene: 'plant-lounge', status: 'review' },
  { id: 'CX-1069', price: '$910/mo', title: 'Loft with city view, Pecherskyi', address: 'Pecherskyi · 6 Lesi Ukrainky Blvd', initials: 'NL', agent: 'Natalia Lysenko', code: 'CX-1069 · yesterday', checks: passed, type: 'Rent', photos: 16, scene: 'loft', status: 'approved' },
  { id: 'CX-1068', price: '$240,000', title: 'Family house with garden, Bortnychi', address: 'Darnytskyi · 3 Sadova St', initials: 'MB', agent: 'Maksym Bondar', code: 'CX-1068 · yesterday', checks: passed, type: 'Sale', photos: 20, scene: 'garden-house', status: 'approved' },
  { id: 'CX-1066', price: '$74,000', title: 'Compact studio near Lukianivska', address: 'Shevchenkivskyi · 9 Melnykova St', initials: 'MT', agent: 'Maryna Tkachenko', code: 'CX-1066 · 2 days ago', checks: passed, type: 'Sale', photos: 10, scene: 'studio', status: 'approved' },
  { id: 'CX-1064', price: '$300/mo', title: 'Room in shared flat, Troieshchyna', address: 'Desnianskyi · 18 Zakrevskoho St', initials: 'AM', agent: 'Anna Moroz', code: 'CX-1064 · 2 days ago', checks: [{ ok: false, label: 'No photos of rooms' }], type: 'Rent', photos: 3, scene: 'red-chair', status: 'rejected' },
]
export const moderationRules = [
  'Sale listings need at least 8 photos and a floor plan.',
  'Descriptions are 300 characters or longer.',
  'The address must match the cadastral record.',
  'Ownership documents are attached before approval.',
]

export type Audience = 'Everyone' | 'Agents' | 'Managers'
export type Announcement = { id: string; title: string; body: string; audience: Audience; date: string; read: number; total: number; status: 'sent' | 'scheduled'; pinned: boolean }
export const announcements: Announcement[] = [
  { id: 'a1', title: 'New moderation rules start Monday', body: 'Every sale listing now needs at least 8 photos and a floor plan. Listings without them are sent back automatically.', audience: 'Everyone', date: 'Nov 3, 9:30 AM', read: 8, total: 11, status: 'sent', pinned: true },
  { id: 'a2', title: 'Office closed for the public holiday', body: 'All offices are closed next Friday. Showings can be moved in the calendar.', audience: 'Everyone', date: 'Nov 6, 9:00 AM', read: 0, total: 11, status: 'scheduled', pinned: false },
  { id: 'a3', title: 'Quarterly targets are live', body: 'Your personal targets are on your profile. Talk to your manager if something looks off.', audience: 'Agents', date: 'Oct 31, 10:00 AM', read: 6, total: 6, status: 'sent', pinned: false },
  { id: 'a4', title: 'Managers’ meeting moved to 11:00', body: 'Same room, one hour later. Please bring the office pipeline numbers.', audience: 'Managers', date: 'Oct 29, 4:15 PM', read: 3, total: 4, status: 'sent', pinned: false },
]
export const audienceSize: Record<Audience, number> = { Everyone: 11, Agents: 6, Managers: 4 }
