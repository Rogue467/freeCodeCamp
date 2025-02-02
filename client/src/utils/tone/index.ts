import store from 'store';
import { FlashMessages } from '../../components/Flash/redux/flash-messages';
import { Themes } from '../../components/settings/theme';

const TRY_AGAIN = 'https://campfire-mode.freecodecamp.org/try-again.mp3';
const CHAL_COMP = 'https://campfire-mode.freecodecamp.org/chal-comp.mp3';

const toneUrls = {
  [Themes.Default]: 'https://campfire-mode.freecodecamp.org/day.mp3',
  [Themes.Night]: 'https://campfire-mode.freecodecamp.org/night.mp3',
  donation: 'https://campfire-mode.freecodecamp.org/donate.mp3',
  'tests-completed': CHAL_COMP,
  'block-toggle': 'https://tonejs.github.io/audio/berklee/guitar_chord1.mp3',
  'tests-failed': TRY_AGAIN,
  completion: CHAL_COMP,
  [FlashMessages.AccountDeleted]: TRY_AGAIN,
  [FlashMessages.AddNameSuccess]: CHAL_COMP,
  [FlashMessages.AlreadyClaimed]: TRY_AGAIN,
  [FlashMessages.CertClaimSuccess]:
    'https://campfire-mode.freecodecamp.org/cert.mp3',
  [FlashMessages.CertificateMissing]: TRY_AGAIN,
  [FlashMessages.CertsPrivate]: TRY_AGAIN,
  [FlashMessages.ChallengeSaveTooBig]: TRY_AGAIN,
  [FlashMessages.ChallengeSubmitTooBig]: TRY_AGAIN,
  [FlashMessages.CodeSaved]: CHAL_COMP,
  [FlashMessages.CodeSaveError]: TRY_AGAIN,
  [FlashMessages.CompleteProjectFirst]: TRY_AGAIN,
  [FlashMessages.DeleteTokenErr]: TRY_AGAIN,
  [FlashMessages.EmailValid]: CHAL_COMP,
  [FlashMessages.HonestFirst]: TRY_AGAIN,
  [FlashMessages.IncompleteSteps]: TRY_AGAIN,
  [FlashMessages.LocalCodeSaved]: CHAL_COMP,
  [FlashMessages.LocalCodeSaveError]: TRY_AGAIN,
  [FlashMessages.NameNeeded]: TRY_AGAIN,
  // [FlashMessages.None]: '',
  [FlashMessages.NotEligible]: TRY_AGAIN,
  [FlashMessages.NotHonest]: TRY_AGAIN,
  [FlashMessages.NotRight]: TRY_AGAIN,
  [FlashMessages.ProfilePrivate]: TRY_AGAIN,
  [FlashMessages.ProgressReset]: TRY_AGAIN,
  [FlashMessages.ProvideUsername]: TRY_AGAIN,
  [FlashMessages.ReallyWeird]: TRY_AGAIN,
  [FlashMessages.ReportSent]: CHAL_COMP,
  [FlashMessages.SigninSuccess]: CHAL_COMP,
  [FlashMessages.StartProjectErr]: TRY_AGAIN,
  [FlashMessages.TokenDeleted]: CHAL_COMP,
  [FlashMessages.UpdatedPreferences]: CHAL_COMP,
  [FlashMessages.UsernameNotFound]: TRY_AGAIN,
  [FlashMessages.UsernameTaken]: TRY_AGAIN,
  [FlashMessages.UsernameUpdated]: CHAL_COMP,
  [FlashMessages.UsernameUsed]: TRY_AGAIN,
  [FlashMessages.UserNotCertified]: TRY_AGAIN,
  [FlashMessages.WrongName]: TRY_AGAIN,
  [FlashMessages.WrongUpdating]: TRY_AGAIN,
  [FlashMessages.WentWrong]: TRY_AGAIN
} as const;

type ToneStates = keyof typeof toneUrls;

export async function playTone(state: ToneStates): Promise<void> {
  const playSound = !!store.get('fcc-sound');
  if (playSound && toneUrls[state]) {
    const tone = await import('tone');
    if (tone.context.state !== 'running') {
      tone.context.resume().catch(err => {
        console.error('Error resuming audio context', err);
      });
    }
    const player = new tone.Player(toneUrls[state]).toDestination();
    player.autostart = true;
  }
}
