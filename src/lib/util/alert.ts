import { toast } from '@zerodevx/svelte-toast';

const infoTheme = {
  '--toastBackground': 'hsla(var(--in) / 0.1)',
  '--toastColor': 'hsla(var(--in) / 1)',
  '--toastBorderRadius': 'var(--rounded-box)',
  '--toastBarBackground': 'hsla(var(--in) / 1)'
};

const infoIcn = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

const warningTheme = {
  '--toastBackground': 'hsla(var(--wa) / 0.1)',
  '--toastColor': 'hsla(var(--wa) / 1)',
  '--toastBorderRadius': 'var(--rounded-box)',
  '--toastBarBackground': 'hsla(var(--wa) / 1)'
};

const warningIcn = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;

const dangerTheme = {
  '--toastBackground': 'hsla(var(--er) / 0.1)',
  '--toastColor': 'hsla(var(--er) / 1)',
  '--toastBorderRadius': 'var(--rounded-box)',
  '--toastBarBackground': 'hsla(var(--er) / 1)'
};

const dangerIcn = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`;

export const info = (message: string) => {
  toast.push(`<div class="flex place-items-center">${infoIcn}<div>${message}</div></div>`, {
    theme: infoTheme
  });
};

export const warning = (message: string) => {
  toast.push(`<div class="flex place-items-center">${warningIcn}<div>${message}</div></div>`, {
    theme: warningTheme
  });
};

export const danger = (message: string) => {
  toast.push(`<div class="flex place-items-center">${dangerIcn}<div>${message}</div></div>`, {
    theme: dangerTheme
  });
};
