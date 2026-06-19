-- One-time cleanup: remove leaderboard entries left by cheaters.
-- A full game (~10 questions) completed in under 20 seconds is not humanly
-- possible, so any such entry is a cheat (e.g. screenshot -> OCR -> autotype).
--
-- Run once in the Neon SQL console (https://console.neon.tech) against the
-- production database. Going forward, POST /api/leaderboard rejects the same
-- submissions, so the table stays clean.
--
-- Preview which rows would be removed:
--   SELECT profile_name, category, score, time_ms
--   FROM leaderboard_entries
--   WHERE time_ms < 20000
--   ORDER BY time_ms ASC;

DELETE FROM leaderboard_entries WHERE time_ms < 20000;
