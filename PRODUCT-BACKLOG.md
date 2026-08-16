# Mission OS — Product Backlog

This backlog is intentionally separate from the Stable Freeze baseline.

## Known issues to audit
- UI consistency and responsive layout issues
- Timer reliability and execution-state edge cases
- Full coordination between Mission, Next Action, Timer, Engine and Guide
- Priority display/calculation edge cases
- Daily-state edge cases around midnight and manual corrections
- Performance/loading and deployment regressions

## Planned additions
- Account sign-in/sign-out and password recovery
- Cloud synchronization across devices
- Offline-first cache with conflict-safe sync
- Daily study history editor
- Better Mission execution feedback
- Adaptive execution by learning domain
- Review/error-log synchronization
- Account/profile settings
- Device/session management

## Rule
Do not remove or rewrite working learning logic just to add a UI feature. New work should be modular, tested, and reversible.
