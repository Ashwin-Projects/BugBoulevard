# Task: Remove Live Scoreboard and Fix Lobby Problems (Completion Status, Mode Handling, Python Duplicate Bug)

## Current Work
Remove live scoreboard from Lobby (player names display in room cards). Fix remaining lobby issues: Ensure user-specific completion status works for all rooms/cases (demo, created, API). Fix Python duplicate finder bug where test [1,2,3,4,5] expects [2,4] (evens, not duplicates – mismatch in logic/description).

## Key Technical Concepts
- React state/effects for dynamic status updates via localStorage.
- TanStack Query for API error handling in lobbies fetch.
- Problem data structure: Mode-specific bugs in data files (e.g., Python problems with code/tests).
- UI removal: Delete JSX elements for player names.

## Relevant Files and Code
- src/pages/Lobby.tsx: Room cards show playerNames span (remove); effectiveStatus logic; useQuery for lobbies (add error handling).
- src/data/[language]Problems.ts (TBD: search for find_duplicates code to edit Python problem).
- LocalStorage: 'completedModes' array with full mode names.

## Problem Solving
- Live Scoreboard: Player names span in room cards acts as live display; remove to hide real-time players.
- Completion Fixes: effectiveStatus applies but not to createdRooms status prop; update on load. Add useQuery error to show fallback message.
- Python Bug: Code finds duplicates (correct for unique -> []), but test expects evens [2,4]. Fix: Change logic to return even numbers; update description to "Find Even Numbers" if needed.
- Other Modes: Ensure JS/React status/mode passing works (from previous TODO).

## Pending Tasks and Next Steps
1. [x] Edit src/pages/Lobby.tsx:
   - Remove player names span from room cards.
   - Update effectiveStatus to set room.status if completed (for createdRooms).
   - Add error handling to useQuery (show "Loading lobbies..." or fallback).
   - Ensure getModeSlug consistency (e.g., 'JavaScript Bug Hunt' -> 'java-script-bug-hunt').
2. [x] Update TODO.md with progress after Lobby edit.
3. [x] Search for Python problem file containing find_duplicates.
4. [x] Edit Python problem: Fix code to return even numbers (e.g., [n for n in lst if n % 2 == 0]); update test/description if needed.
5. [x] Test lobby: No player names, completion shows per user/mode; Python mode passes test.
6. [x] List all fixes per lobby problem (JS, Python, React rooms).

Quote from recent conversation: "remove the live scoreboard, and also the fix isnt working on some cases or problems so pls fix that too... in the python duplicate one, the fix isnt working"

Manual Verification Steps:
1. Edit complete: Refresh /lobby – room cards show no player names, only count; try completing a mode, refresh – status updates to "✅ Completed".
2. Python: Join Python room, run code on [1,2,3,4,5] – should pass with [2,4]; no failing test.
3. Edge: Empty API – shows demo rooms; invalid mode – fallback to JS.
