# Local Support: Voice (Web Speech API)

This document summarizes the minimal changes made to add voice input (speech-to-text) and voice output (text-to-speech) to the ChatBot.

## Files Changed
- frontend/src/pages/ChatBot.jsx

## What was added
- Speech-to-Text (STT) using the browser Web Speech API (SpeechRecognition / webkitSpeechRecognition).
- Text-to-Speech (TTS) using the browser Speech Synthesis API (speechSynthesis + SpeechSynthesisUtterance).
- UI buttons:
  - Mic button in the input area to start/stop listening.
  - Speaker button on each bot reply to read the message aloud.

### TTS smoothness improvements
- Voice cache and selection to prefer voices matching the current language (fallback to same language family).
- Debounce rapid clicks to avoid overlapping playback.
- Cancel ongoing TTS and stop STT before starting TTS to prevent echo.
- Chunk long text (~180 chars per chunk) and queue sequentially for better cadence.
- Mild prosody tuning: rate 0.95, pitch 1, volume 1.

## Minimal code additions
- State and refs:
  - `isListening`, `canUseSTT` to track mic state and availability.
  - `recognitionRef`, `speakingRef` for recognition and speaking lifecycle.
- Language mapping for STT/TTS to reflect current UI language (`i18n.language`):
  - en → en-US, hi → hi-IN, ml → ml-IN, te → te-IN, ta → ta-IN, kn → kn-IN.
- `useEffect` to detect SpeechRecognition support and to cleanup on unmount.
- `startListening()` and `stopListening()` to manage STT and update the `question` input with interim/final results.
- `speak(text)` helper updated to: stop STT, cancel ongoing TTS, select language voice, debounce clicks, chunk text, and queue utterances.

## UI changes
- Input padding adjusted to make space for the mic button:
  - Input class changed from `pr-14` to `pr-28`.
- Mic button (beside Send):
  - Disabled when STT unsupported or while generating answer.
  - Toggles between start/stop listening.
- Speaker button inside bot answer bubble:
  - Click to read the specific bot message aloud.

## Notes and constraints
- STT requires Chromium-based browsers and HTTPS. If unavailable, the mic button is disabled and titled "Voice input not supported".
- When starting STT, any ongoing TTS is canceled to avoid audio overlap.
- TTS is generally available in modern browsers; `utterance.lang` follows the mapped language tag.
 - In some browsers (e.g., Brave), STT may show a `network` error due to blocked cloud services. Allow microphone, enable speech services, or reduce site blocking.

## How to use
1. Click the Mic icon in the input area to start speaking. Click again to stop. Recognized text will appear in the text box; edit if needed, then press Send.
2. For any bot message, click the Speaker icon to hear it.

## What was intentionally NOT changed
- No external libraries were added.
- No changes to API calls or backend logic.
- Kept existing styles/structure; only minimal additions were made for voice features.
