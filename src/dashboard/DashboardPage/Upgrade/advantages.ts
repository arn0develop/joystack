type TitleList = {
  imageUrl: string
  name: string
  id: number
}

type FreeAndProList = {
  imageUrl?: string | null
  description?: string | null
  id: number
}

type ProUpgradeList = [TitleList[], FreeAndProList[], FreeAndProList[]]

const advantages: ProUpgradeList =[
  [
    {
      imageUrl: '/images/pro_settings.png',
      name: 'START_IMPORT_SERVER',
      id: 1,
    },
    {
      imageUrl: '/images/pro_speaker.png',
      name: 'ADVERTISING',
      id: 2,
    },
    {
      imageUrl: '/images/pro_start.png',
      name: 'WAITING_TIME_FOR_START_IMPORT',
      id: 3,
    },
    {
      imageUrl: '/images/pro_upload.png',
      name: 'UPLOAD_YOUR_OWN_PLUGINS',
      id: 4,
    },
    {
      imageUrl: '/images/pro_manager.png',
      name: 'ADD_PROJECT_MANAGER',
      id: 5,
    },
    {
      imageUrl: '/images/pro_diamond.png',
      name: 'EXCLUSIVE_CONTENT',
      id: 6,
    },
    {
      imageUrl: '/images/pro_delete.png',
      name: 'INACTIVITY_DELETION',
      id: 7,
    },
    {
      imageUrl: '/images/pro_email_support.png',
      name: 'EMAIL_SUPPORT',
      id: 8,
    },
    {
      imageUrl: '/images/pro_edit.png',
      name: 'OWN_SERVER_MOTD',
      id: 9,
    },
    {
      imageUrl: '/images/pro_slots.png',
      name: 'SLOTS',
      id: 10,
    },
    {
      imageUrl: '/images/pro_badge.png',
      name: 'PRO_BADGE',
      id: 11,
    },
    {
      imageUrl: '/images/pro_folder.png',
      name: 'NUMBER_OF_SERVER_PROJECTS',
      id: 12,
    },
  ],
  [
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 1,
    },
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 2,
    },
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 3,
    },
    {
      imageUrl: '/images/pro_unchecked.png',
      description: null,
      id: 4,
    },
    {
      imageUrl: '/images/pro_unchecked.png',
      description: null,
      id: 5,
    },
    {
      imageUrl: '/images/pro_unchecked.png',
      description: null,
      id: 6,
    },
    {
      description: 'AFTER_14_DAYS',
      imageUrl: null,
      id: 7,
    },
    {
      description: 'LOW_PRIORITY',
      imageUrl: null,
      id: 8,
    },
    {
      imageUrl: '/images/pro_unchecked.png',
      description: null,
      id: 9,
    },
    {
      description: '4',
      imageUrl: null,
      id: 10,
    },
    {
      imageUrl: '/images/pro_unchecked.png',
      id: 11,
    },
    {
      description: '2',
      imageUrl: null,
      id: 12,
    },
  ],
  [
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 1,
    },
    {
      description: 'AD_FREE',
      imageUrl: null,
      id: 2,
    },
    {
      description: 'INSTANT_START_IMPORT',
      imageUrl: null,
      id: 3,
    },
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 4,
    },
    {
      imageUrl: '/images/pro_checked.png',
      description: null,
      id: 5,
    },
    {
      description: 'ALL',
      imageUrl: null,
      id: 6,
    },
    {
      description: 'UNLIMITED_TIME',
      imageUrl: null,
      id: 7,
    },
    {
      description: 'HIGHEST_PRIORITY',
      imageUrl: null,
      id: 8,
    },
    {
      description: 'FULLY_ADJUSTABLE',
      imageUrl: null,
      id: 9,
    },
    {
      description: '24',
      imageUrl: null,
      id: 10,
    },
    {
      description: 'IN_THE_FORUM_WEBSITE',
      imageUrl: null,
      id: 11,
    },
    {
      description: '5',
      imageUrl: null,
      id: 12,
    },
  ],
]

export default advantages