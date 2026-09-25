// Content for the project detail view (opened from each project card).
// The keys match data-project on the cards in index.html. Every field except title is optional.
// List the most important technologies first in each stack: the project cards on the home page show the first three.
// Facts come from the résumé and, for FlagMaster, the GitHub README; keep them accurate.
const PROJECTS = {
  'mega-android': {
    title: 'MEGA Android',
    kicker: 'Professional work · MEGA',
    summary: 'MEGA’s open-source Android app for end-to-end encrypted cloud storage, part of a privacy product used by 300M+ registered users.',
    meta: [
      ['Role', 'Senior Android Engineer'],
      ['Company', 'MEGA (MEGA Privacy)'],
      ['When', 'Jan 2023 – May 2025'],
      ['Where', 'Remote'],
      ['Architecture', 'Clean Architecture · MVVM'],
    ],
    impact: [
      ['300M+', 'registered users on MEGA products'],
      ['15%', 'fewer production bugs'],
    ],
    sections: [
      ['What I did', [
        'Delivered features end to end across MEGA Cloud and Password Manager, covering implementation, release management, performance analysis and quality improvements.',
        'Migrated legacy XML-based UI to Jetpack Compose using Kotlin, modernising the app’s UI and improving rendering performance.',
        'Reduced the production bug count by 15% through stronger automated testing, debugging and code-review practices.',
        'Worked with cross-functional engineering teams to integrate features and optimise app performance.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Java', 'XML', 'MVVM', 'Hilt', 'JUnit', 'Coroutines & Flow', 'ViewModel', 'WorkManager', 'Room', 'DataStore', 'GitLab', 'Crashlytics'],
    links: [
      ['About MEGA', 'https://mega.io/mobile'],
      ['Google Play', 'https://play.google.com/store/apps/details?id=mega.privacy.android.app'],
      ['GitHub', 'https://github.com/meganz/android'],
    ],
  },

  'mega-pass': {
    title: 'MEGA Password Manager',
    kicker: 'Professional work · MEGA',
    summary: 'MEGA’s password manager, part of the same privacy product used by 300M+ registered users. I owned two of its features from design to release and made auto-fill a third faster.',
    meta: [
      ['Role', 'Senior Android Engineer'],
      ['Company', 'MEGA (MEGA Privacy)'],
      ['When', 'Jan 2023 – May 2025'],
      ['Where', 'Remote'],
      ['Architecture', 'Clean Architecture · MVVM'],
    ],
    impact: [
      ['33%', 'faster auto-fill'],
    ],
    sections: [
      ['What I did', [
        'Owned the technical architecture, implementation and release of Search.',
        'Owned the technical architecture, implementation and release of TOTP authentication (time-based one-time codes).',
        'Improved auto-fill performance by 33%, making password entry faster and more responsive.',
        'Moved the UI to Jetpack Compose.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'MVVM'],
    links: [
      ['About MEGA Pass', 'https://mega.io/pass'],
    ],
  },

  'banking-payments': {
    title: 'NextGen Retail Banking App',
    kicker: 'Professional work · Synechron',
    award: 'Top Engineer of the Month · Feb 2026',
    summary: 'A next-generation retail banking Android app for a leading UAE retail bank. I was a core contributor, owning major functionality in the Payments module.',
    meta: [
      ['Role', 'Senior Software Engineer / Technology Lead'],
      ['Company', 'Synechron'],
      ['When', 'Oct 2025 – Apr 2026'],
      ['Where', 'Bengaluru, India'],
      ['Architecture', 'Clean Architecture · MVI'],
    ],
    sections: [
      ['What I did', [
        'Designed and delivered payment workflows for fund transfers, bill payments and beneficiary management, with a focus on reliability, security and maintainability.',
        'Contributed to technical design, implementation, defect resolution and release readiness across the payments workstream.',
        'Increased automated unit-test coverage across payment workflows, reducing regression risk and improving release confidence.',
        'Built automation scripts that streamlined testing and cut manual QA effort across release cycles.',
        'Worked with developers, QA, product and business teams throughout, including business demos and stakeholder feedback.',
        'Used GitHub Copilot and Claude Code for development, code reviews and test generation.',
      ]],
      ['Recognition', [
        'Named Top Engineer of the Month (February 2026) for technical contribution and delivery on the payments platform.',
      ]],
    ],
    stack: ['Kotlin', 'Android', 'Clean Architecture', 'MVI'],
    note: 'Client work, not public',
  },

  fieldcatcher: {
    title: 'FieldCatcher',
    kicker: 'Professional work · Tata Consultancy Services',
    summary: 'A mobile app for a digital farming portfolio. I led the team that built the native Android app, then led its move to Flutter and added on-device AI.',
    meta: [
      ['Role', 'IT Analyst, team lead'],
      ['Company', 'Tata Consultancy Services'],
      ['When', 'Aug 2019 – Jan 2023'],
      ['Where', 'Cologne, Germany · Kochi, India'],
      ['Architecture', 'Clean Architecture · Riverpod'],
    ],
    impact: [
      ['80%', 'unit-test coverage'],
      ['20%', 'fewer production bugs'],
      ['25%', 'faster loading'],
    ],
    sections: [
      ['What I did', [
        'Led a team of engineers delivering the FieldCatcher Android app, coordinating development and delivery across locations.',
        'Led the migration from Android to Flutter, helped the team adopt the framework and delivered the MVP on schedule.',
        'Integrated TensorFlow models and built custom Flutter plugins for on-device AI, and later integrated PyTorch models.',
        'Set up GitLab and Fastlane CI/CD pipelines, speeding up releases and cutting manual deployment work.',
        'Implemented automated data sync using GraphQL.',
        'Upgraded the app to Flutter 3.0 and cut loading time by 25% through image-size optimisation.',
        'Raised unit-test coverage to 80%, reducing production bugs by 20%.',
      ]],
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Riverpod', 'TensorFlow', 'PyTorch', 'GraphQL', 'GitLab CI/CD', 'Fastlane'],
    note: 'Client work, not public',
  },

  flagmaster: {
    title: 'FlagMaster',
    kicker: 'Personal project',
    summary: 'An Android quiz game where you race the clock to identify world flags. Pick a difficulty and a number of questions, schedule a challenge or jump straight in, and climb a live leaderboard.',
    meta: [
      ['Type', 'Personal, open source'],
      ['Started', 'July 2025'],
      ['Platform', 'Android 7.0 and later'],
      ['Architecture', 'Clean Architecture · MVVM'],
    ],
    screenshots: [
      ['assets/images/projects/flagmaster/start-screen.png', 'Start screen with difficulty and question-count choices, and buttons to start now or schedule the challenge'],
      ['assets/images/projects/flagmaster/results-screen.png', 'Results screen showing a final score of 4 out of 10 and the answer given for each flag'],
      ['assets/images/projects/flagmaster/question-screen.png', 'A question showing the flag of Spain with four country options'],
      ['assets/images/projects/flagmaster/game-over-screen.png', 'Game over screen with a grade ring and a Play again button'],
    ],
    sections: [
      ['Features', [
        'Three difficulty levels (45, 30 or 15 seconds per question) and games of 5, 10, 15 or 20 questions.',
        'Schedule a challenge for an exact start time; the app counts down and starts it automatically.',
        'A fun fact about the correct country after every answer.',
        'A real-time leaderboard, with sign-in by email or Google.',
        'Progress is saved as you play, so a quiz resumes at the right question even after the app is closed.',
        'Eight colour themes that change with the state of the game.',
      ]],
      ['How it’s built', [
        'Six Gradle modules following Clean Architecture, split by feature: flags, auth, leaderboard and profile.',
        'Jetpack Compose UI with type-safe navigation, Hilt for dependency injection, and ViewModels exposing StateFlow UI state.',
        'Questions sync from Firebase into a Room cache with WorkManager, falling back to 255 bundled flags when offline.',
        'Quiz state persists in DataStore; countdowns run on coroutines with separately cancellable timer jobs.',
        'Google Sign-In through Credential Manager, with Firebase Auth and Cloud Firestore behind the leaderboard.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Multi-module', 'Hilt', 'Coroutines & Flow', 'Room', 'DataStore', 'WorkManager', 'Firebase', 'Coil', 'JUnit'],
    links: [
      ['View on GitHub', 'https://github.com/sougandhmp/FlagMaster'],
    ],
  },
};
