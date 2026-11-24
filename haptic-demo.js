const demo = document.querySelector('.haptic-demo');
const angleInput = document.querySelector('#dial-input');
const dialBody = document.querySelector('.dial-body');
const ticks = document.querySelector('.dial-ticks');
const positionOutput = document.querySelector('#dial-value');
const unit = document.querySelector('#dial-unit');
const description = document.querySelector('#profile-description');

const profiles = {
  bounded: {
    max: 16,
    spacing: 15,
    label: 'bounded positions',
    description: 'A 15° step between positions, with virtual end stops at 0 and 16.'
  },
  coarse: {
    max: 24,
    spacing: 15,
    label: 'positions per revolution',
    description: 'Coarse clicks every 15° create 24 positions per revolution. The physical profile continues across multiple turns.'
  },
  fine: {
    max: 72,
    spacing: 5,
    label: 'positions per revolution',
    description: 'Fine clicks every 5° create 72 positions per revolution. The physical profile continues across multiple turns.'
  },
  free: {
    max: 360,
    spacing: 1,
    label: 'degrees of rotation',
    description: 'The motor applies no detent spring. The shaft turns freely while the firmware still counts positions.'
  }
};

let selectedProfile = 'bounded';

function updateDial() {
  const profile = profiles[selectedProfile];
  const position = Number(angleInput.value);
  const angle = position * profile.spacing;
  dialBody.style.transform = 'rotate(' + angle + 'deg)';
  positionOutput.value = position + ' / ' + profile.max;
  angleInput.setAttribute('aria-valuetext', position + ' of ' + profile.max + ', ' + profile.label);
}

function selectProfile() {
  selectedProfile = document.querySelector('input[name="haptic-profile"]:checked').value;
  const profile = profiles[selectedProfile];
  angleInput.max = profile.max;
  angleInput.value = Math.floor(profile.max / 2);
  unit.textContent = profile.label;
  description.textContent = profile.description;
  const tickSpacing = selectedProfile === 'free' ? 90 : profile.spacing;
  ticks.style.setProperty('--tick-spacing', tickSpacing + 'deg');
  updateDial();
}

angleInput.addEventListener('input', updateDial);
document.querySelectorAll('input[name="haptic-profile"]').forEach(input => {
  input.addEventListener('change', selectProfile);
});
selectProfile();
demo.hidden = false;
