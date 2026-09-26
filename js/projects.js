// Content for the project detail view (opened from each project card).
// The keys match data-project on the cards in index.html. Every field except title is optional.
// List the most important technologies first in each stack: the project cards on the home page show the first three.
// Facts come from the résumé, details Sougandh supplied and, for FlagMaster, the GitHub README; keep them accurate.
const PROJECTS = {
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
      ['Team', 'Led a 3–5 person Android payments pod'],
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
      ['Security', [
        'OTP and step-up authentication before payments are confirmed.',
        'OAuth2 and JWT token-based sessions.',
        'Certificate pinning on the payment APIs.',
        'Code obfuscation and app-integrity checks with DexGuard, R8 and the Play Integrity API.',
      ]],
      ['Testing & automation', [
        'Unit tests with JUnit, MockK and Turbine across payment workflows.',
        'Appium UI automation for payment journeys.',
        'Scripts that set up test data, such as beneficiaries, so QA could test payment flows quickly.',
      ]],
      ['Recognition', [
        'Named Top Engineer of the Month (February 2026) for technical contribution and delivery on the payments platform.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'MVI', 'Hilt', 'Coroutines & Flow', 'Retrofit', 'OkHttp', 'JUnit', 'MockK', 'Turbine', 'Appium', 'DexGuard', 'Play Integrity API'],
    note: 'Client work, not public',
  },

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
        'Used GitHub Copilot to speed up feature development and day-to-day engineering work.',
      ]],
      ['MEGA Cloud features', [
        'File browser and sharing: features across the cloud drive, shared links and shared folders.',
        'Photos and media: features in the photo and media experience.',
        'Settings and account: account and settings screens.',
      ]],
      ['Moving to Jetpack Compose', [
        'Rewrote whole screens from XML layouts in Jetpack Compose.',
        'Built shared design-system components and theming, reused across the app.',
        'Migrated gradually, with ComposeView and AndroidView bridging Compose and existing Views.',
        'Covered migrated screens with Compose UI tests.',
      ]],
      ['Cutting production bugs by 15%', [
        'Added unit tests for ViewModels and use cases.',
        'Added UI tests for key screens.',
        'Triaged Crashlytics reports and fixed the top crashes.',
        'Tightened code reviews around shared standards.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Java', 'XML', 'MVVM', 'Hilt', 'JUnit', 'MockK', 'Turbine', 'Compose UI Testing', 'Coroutines & Flow', 'ViewModel', 'WorkManager', 'Room', 'DataStore', 'GitLab', 'Crashlytics'],
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
      ['Search', [
        'Runs entirely on the device over decrypted data. The vault is end-to-end encrypted, so the server can’t search it.',
        'Results update as you type.',
        'Matches across several fields: title, username, URL and notes.',
        'Recent searches and filters by item type.',
      ]],
      ['TOTP authentication', [
        'Add a two-factor account by scanning its QR code or entering the setup key by hand.',
        'Shows the live code with a countdown to the next refresh.',
        'Copy the code, or have it auto-filled.',
      ]],
      ['Making auto-fill 33% faster', [
        'Faster matching of the current app or website to saved logins.',
        'Less decryption and disk work on each request.',
        'Moved work off the main thread with coroutines.',
        'A lighter, faster auto-fill suggestion UI.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'MVVM', 'Coroutines & Flow', 'Android Autofill Framework'],
    links: [
      ['About MEGA Pass', 'https://mega.io/pass'],
    ],
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
      ['Team', 'Led 3–5 engineers'],
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
        'Raised unit-test coverage to 80%, reducing production bugs by 20%, and added UI tests.',
        'Monitored the app in production, diagnosed issues and shipped stability fixes.',
      ]],
      ['The app', [
        'Captures field observations with photos and location.',
        'Identifies weeds and plants, and detects crop diseases and pests, from a camera photo.',
        'Runs the AI models on the device, so identification and data capture work offline in the field.',
      ]],
      ['Custom Flutter plugins', [
        'Ran TensorFlow Lite and PyTorch models natively on the device, exposed to Flutter.',
        'Native camera capture and image pre-processing before inference.',
        'Access to platform services that existing plugins didn’t cover.',
      ]],
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'Riverpod', 'TensorFlow', 'PyTorch', 'GraphQL', 'GitLab CI/CD', 'Fastlane'],
    note: 'Client work, not public',
  },

  'postal-delivery': {
    title: 'Postal & Parcel Delivery Apps',
    kicker: 'Professional work · Tata Consultancy Services',
    summary: 'A suite of Android apps for a UK postal-service client, covering customer parcel tracking, couriers on their rounds, depot and warehouse operations, and internal staff tools.',
    meta: [
      ['Role', 'Systems Engineer'],
      ['Company', 'Tata Consultancy Services'],
      ['When', '2016 – 2018'],
      ['Where', 'Kochi, India'],
      ['Architecture', 'MVP'],
    ],
    sections: [
      ['The apps', [
        'Customer parcel tracking.',
        'Courier and delivery-staff apps for the delivery round.',
        'Depot and warehouse operations.',
        'Internal enterprise tools for staff.',
      ]],
      ['What I did', [
        'Built barcode scanning with the phone camera and with rugged hardware scanners through the vendor SDK.',
        'Built proof of delivery: capturing a signature, a photo and the location at hand-over.',
        'Built offline sync, so staff could keep working without signal and data synced to the backend later.',
        'Built parcel-tracking screens and notifications for customers.',
        'Wrote the apps in Java with MVP, and brought in Kotlin.',
      ]],
    ],
    stack: ['Java', 'Kotlin', 'MVP', 'Barcode scanning', 'Hardware scanner SDKs', 'Offline sync'],
    note: 'Client work, not public',
  },

  'telematics-insurance': {
    title: 'Telematics Insurance App',
    kicker: 'Professional work · Tata Consultancy Services',
    summary: 'An Android telematics app for a leading US insurer. It collected GPS data from the phone and a connected in-car device to understand how each customer drives, feeding their insurance data.',
    meta: [
      ['Role', 'Systems Engineer'],
      ['Company', 'Tata Consultancy Services'],
      ['When', '2014 – 2016'],
      ['Where', 'Kochi, India'],
      ['Architecture', 'MVP'],
    ],
    sections: [
      ['The app', [
        'Collected GPS data from the phone during trips and processed it to understand driving behaviour.',
        'Paired with a connected in-car device.',
        'Detected likely crashes.',
        'Fed the driving data into the customer’s insurance data.',
      ]],
      ['What I did', [
        'Built trip and GPS data collection with background location tracking, using Google Play Services location APIs.',
        'Built the screens showing trips and the driving score, with trip routes drawn on Google Maps.',
        'Wrote the app in Java, then brought in Kotlin after its 1.0 release in 2016.',
      ]],
    ],
    stack: ['Java', 'Kotlin', 'MVP', 'Google Play Services Location', 'Google Maps SDK', 'Android SDK'],
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
        'Jetpack Compose UI with type-safe navigation, Hilt for dependency injection, and ViewModels exposing StateFlow UI state.',
        'Google Sign-In through Credential Manager, with Firebase Auth and Cloud Firestore behind the leaderboard.',
      ]],
      ['Engineering challenges', [
        'Timer accuracy and resume: each countdown runs as its own cancellable coroutine job, and quiz state is saved to DataStore as you play, so a quiz picks up at the right question even after the app is closed.',
        'Scheduled challenges: a challenge is set for an exact start time, and the app counts down and starts it automatically.',
        'Modular build: six Gradle modules along Clean Architecture boundaries, split by feature (flags, auth, leaderboard and profile).',
        'Offline-first: questions sync from Firebase into a Room cache with WorkManager, and the game falls back to 255 bundled flags with no connection.',
      ]],
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Clean Architecture', 'Multi-module', 'Hilt', 'Coroutines & Flow', 'Room', 'DataStore', 'WorkManager', 'Firebase', 'Coil', 'JUnit'],
    links: [
      ['View on GitHub', 'https://github.com/sougandhmp/FlagMaster'],
    ],
  },

  racehub: {
    title: 'RaceHub',
    kicker: 'Personal project',
    summary: 'A Formula 1 companion app for Android and iOS: the race calendar, driver and constructor standings, a circuit guide for every Grand Prix, and a community forum. Everything except the views is shared in one Kotlin Multiplatform module, including the MVI ViewModels. Jetpack Compose and SwiftUI just render them.',
    meta: [
      ['Type', 'Personal, open source'],
      ['Started', 'May 2026'],
      ['Platforms', 'Android 7.0+ · iOS 18.2+'],
      ['Architecture', 'Clean Architecture · shared MVI ViewModels · Navigation 3 (Android)'],
    ],
    screenshots: [
      ['assets/images/projects/racehub/android-race.png', 'Android, light theme: Race tab with the next Grand Prix, weekend schedule and driver standings'],
      ['assets/images/projects/racehub/android-race-dark.png', 'Android, dark theme: Race tab with the next Grand Prix, weekend schedule and driver standings'],
      ['assets/images/projects/racehub/ios-race.png', 'iOS, light theme: Race tab with the next Grand Prix and standings'],
      ['assets/images/projects/racehub/ios-race-dark.png', 'iOS, dark theme: Race tab with the next Grand Prix and standings'],
      ['assets/images/projects/racehub/android-race-detail-dark.png', 'Android race detail: location, circuit, local start time, weather, a circuit map and track facts'],
      ['assets/images/projects/racehub/ios-race-detail-dark.png', 'iOS race detail showing the circuit, local start time, weather and track facts'],
      ['assets/images/projects/racehub/android-schedule-dark.png', 'Android full calendar with race dates and circuit maps'],
      ['assets/images/projects/racehub/ios-schedule-dark.png', 'iOS full calendar with race dates and circuit maps'],
      ['assets/images/projects/racehub/android-forum.png', 'Android forum feed with Latest, Most popular and Most commented filters, thread cards with likes and comments, and a button to start a thread'],
      ['assets/images/projects/racehub/ios-forum.png', 'iOS forum feed with thread cards and community activity'],
      ['assets/images/projects/racehub/android-thread-detail-dark.png', 'Android thread detail showing a post, replies and thread actions'],
      ['assets/images/projects/racehub/ios-thread-detail-dark.png', 'iOS thread detail showing the full post and an inline reply box'],
      ['assets/images/projects/racehub/android-profile.png', 'Android profile with account details, stats and appearance settings'],
      ['assets/images/projects/racehub/android-profile-dark.png', 'Android profile in dark theme with account details and appearance settings'],
      ['assets/images/projects/racehub/ios-profile.png', 'iOS profile with account details, stats and appearance settings'],
      ['assets/images/projects/racehub/ios-profile-dark.png', 'iOS profile in dark theme with account details and appearance settings'],
      ['assets/images/projects/racehub/ios-login.png', 'iOS sign-in screen'],
      ['assets/images/projects/racehub/ios-signup.png', 'iOS sign-up screen with username, email, password and country fields'],
    ],
    sections: [
      ['Features', [
        'Sign-in and sign-up, with email verification by one-time code and a forgot-password flow, on both platforms. The session token is encrypted at rest: AES-256 EncryptedSharedPreferences on Android, the Keychain on iOS.',
        'Sign-out always clears the session on the device and revokes the token on the server when it can, so it works offline too.',
        'Next-race card with the round, date, country flag, circuit outline and the full weekend timetable (FP1, FP2, FP3, Qualifying, Race).',
        'Driver and constructor standings with team colours, plus a full season calendar with each race’s status, date, weather and circuit map.',
        'Race detail with the local start time, weather, a large circuit map and track facts: laps, corners, distance and lap record.',
        'Community forum: Latest, Most popular and Most commented feeds, new threads by category, and thread detail with likes and inline replies.',
        'Profile with stats, recent and saved posts, and a System, Dark or Light theme that’s remembered across launches.',
        'Offline cache: races, standings and trending threads are stored locally. When the network is down, the app shows the last data it had.',
      ]],
      ['How it’s built', [
        'One shared Kotlin Multiplatform module holds every layer except the views. The presentation layer has one ViewModel per screen (ten in total), with no ViewModels left in the Android or iOS apps. The domain layer has models, repository interfaces and use cases, and the data layer has a Ktor GraphQL client, a SQLDelight cache and session storage.',
        'MVI with one contract for every screen: an immutable State, sealed Intents, one-off Effects on a separate flow, and internal Mutations applied by a pure Reducer, the only place state changes.',
        'Jetpack Compose (Material 3) on Android and SwiftUI on iOS render the same Kotlin ViewModels.',
        'iOS bridging with KMP-NativeCoroutines. It exposes each ViewModel’s StateFlow and effects to Swift, and a SharedViewModelHost republishes the state for SwiftUI. When a SwiftUI screen goes away, the host clears the Kotlin ViewModel, like Android does.',
        'Android uses Navigation 3, with separate signed-out and signed-in graphs. The race and forum ViewModels only exist while signed in, and are thrown away on sign-out.',
        'One result type, DataResult<T, E>: race, forum and profile fail with DataError, and auth with AuthFailure. Each platform maps errors to localised text, shown as a snackbar on Android or an alert on iOS.',
        'Koin for dependency injection. Repositories, use cases and the data layer are internal to the shared module, so Swift only sees the ViewModels.',
        'expect/actual for platform code: OkHttp or Darwin for HTTP, the Android or native SQLite driver, EncryptedSharedPreferences or the Keychain, and DI start-up.',
        'Localised strings on both platforms (strings.xml and Localizable.strings).',
      ]],
      ['Engineering details', [
        'Offline-first caching. The calendar waits for a network refresh (capped at 5 seconds), then falls back to the cache. Standings and trending threads come from one dashboard request: a sync that’s already running is joined, and a recent successful one is reused, so the Race tab sends one request instead of three. If a refresh fails, the cached data is still served.',
        'Request timeouts on the HTTP client, so a stalled server fails with a network error instead of loading forever.',
        'Cancellation-safe error handling: failures become typed errors at the repository boundary, while coroutine cancellation is always rethrown, so leaving a screen still cancels its requests.',
        'Secure sessions. The auth token is encrypted at rest with EncryptedSharedPreferences (AES-256-GCM values, AES-256-SIV keys) on Android. On iOS it’s kept in the Keychain as “after first unlock, this device only”.',
        'Android backups exclude the encrypted session, because the Keystore key it needs is never backed up and a restored copy couldn’t be decrypted. Theme preferences are still backed up.',
        'Network logging in debug builds only. Headers and bodies are never logged, so passwords, one-time codes and bearer tokens never reach the logs. Release builds log nothing.',
        'The API base URL is set per build type: Gradle properties compiled into BuildConfig on Android, and an .xcconfig on iOS.',
        'Testable threading: repositories take an injected CoroutineDispatcher (the platform IO dispatcher by default), and dispatchers and logging are expect/actual.',
        'Compose performance: a stability configuration marks the shared domain models as stable, so screens skip needless recompositions. State is collected with collectAsStateWithLifecycle.',
        'The country picker filters ISO region data down to actual countries.',
      ]],
      ['Testing & CI', [
        '198 tests: 185 in the shared module and 13 in the Android app. They cover use cases against fake repositories, the Race feature’s reducer and ViewModel, and repositories against a Ktor MockEngine and an in-memory SQLite database. The shared tests run on the JVM and the iOS simulator.',
        'Compose UI tests for the sign-in flow run under Robolectric, and XCTest covers the iOS error messages and SharedViewModelHost.',
        'Kover coverage reports focused on the shared logic.',
        'GitHub Actions builds the Android APK and the iOS app on every pull request to develop.',
      ]],
    ],
    stack: ['Kotlin Multiplatform', 'Jetpack Compose', 'SwiftUI', 'KMP-NativeCoroutines', 'Navigation 3', 'Clean Architecture', 'MVI', 'Ktor', 'GraphQL', 'SQLDelight', 'Koin', 'Coroutines & Flow', 'kotlinx.serialization', 'kotlinx-datetime', 'Material 3', 'EncryptedSharedPreferences', 'Keychain', 'Robolectric', 'Kover', 'GitHub Actions'],
    links: [
      ['View on GitHub', 'https://github.com/sougandhmp/RaceHub'],
    ],
  },
};
