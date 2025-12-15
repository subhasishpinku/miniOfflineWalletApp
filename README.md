 Architecture (clearly explained)

Why each folder exists

What logic lives where (UI vs hooks vs services)

How data flows through the app

 AUTH & APP STATE

Why Keychain is used

Why Redux is in-memory only

Token expiry & logout lifecycle

 TRANSACTION ENGINE (core test)

Idempotency (UUID + processing lock)

App kill & retry handling

Why duplicates are impossible

 OFFLINE-FIRST + AUTO-SYNC

SQLite persistence

Kill → reopen → sync scenario

Crash recovery logic

 PERFORMANCE (5,000+ items)

FlatList optimizations

Why getItemLayout matters

Memoization explanation

 ERROR HANDLING

Global error boundary

No red screen in release

 ANDROID NATIVE MODULE

Battery + network

Kotlin → React Native bridge

Where and how it’s used