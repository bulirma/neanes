import './registerServiceWorker';

import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
//import { app as electronApp, BrowserWindow } from 'electron';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Pseudo from 'i18next-pseudo';
import I18NextVue from 'i18next-vue';
import { createApp } from 'vue';
import VueObserveVisibility from 'vue3-observe-visibility';

import { AudioService } from '@/services/audio/AudioService';
import { PlaybackService } from '@/services/audio/PlaybackService';

import App from './App.vue';
import { defaultNS, resources } from './i18n';
import { initalizeBrowserIpcListeners } from './ipc/browserIpcListeners';
import { initializeIpcListeners } from './ipc/ipcListeners';
import router from './router';
import { LatexExporter } from './services/integration/LatexExporter';
import { MusicXmlExporter } from './services/integration/MusicXmlExporter';
import { LyricService } from './services/LyricService';
// random generater service
import { RandomNeumeGenerator } from './services/RandomNeumeGenerator';
import { TextSearchService } from './services/TextSearchService';
import { isElectron } from './utils/isElectron';

//function createWindow() {
//  const win = new BrowserWindow({
//    show: false,
//    webPreferences: {
//      nodeIntegration: true,
//      contextIsolation: false,
//    },
//  });
//
//  if (process.env.VITE_DEV_SERVER_URL !== undefined) {
//    win.loadURL(process.env.VITE_DEV_SERVER_URL);
//  }
//
//  win.webContents.on('did-finish-load', () => {
//    console.log('Vue app loaded in headless mode');
//  });
//}

if (isElectron()) {
  initializeIpcListeners();
} else {
  initalizeBrowserIpcListeners();
}

i18next
  .use(LanguageDetector)
  .use(
    new Pseudo({
      enabled:
        'VITE_PSEUDOLOCALIZATION' in import.meta.env &&
        import.meta.env['VITE_PSEUDOLOCALIZATION'] === 'true',
      languageToPseudo: 'en-US',
    }),
  )
  .init({
    debug:
      'VITE_PSEUDOLOCALIZATION' in import.meta.env &&
      import.meta.env['VITE_PSEUDOLOCALIZATION'] === 'true',
    detection: {
      order: ['querystring', 'navigator'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: Object.keys(resources['en']),
    postProcess: ['pseudo'],
    defaultNS,
    resources,
  });

const app = createApp(App);
app.use(VueObserveVisibility);
app.use(CkeditorPlugin);
app.provide('audioService', new AudioService());
app.provide('playbackService', new PlaybackService());
app.provide('textSearchService', new TextSearchService());
app.provide('lyricService', new LyricService());
app.provide('latexExporter', new LatexExporter());
app.provide('musicXmlExporter', new MusicXmlExporter());
app.provide('randomNeumeGenerator', new RandomNeumeGenerator());
app.use(router);
app.use(I18NextVue, { i18next });

//if (isElectron()) {
//  electronApp.whenReady().then(() => {
//    createWindow();
//
//    electronApp.on('activate', () => {
//      if (BrowserWindow.getAllWindows().length === 0) {
//        createWindow();
//      }
//    });
//  });
//
//  electronApp.on('window-all-closed', () => {
//    electronApp.quit();
//  });
//}

app.mount('#app');

(window as any).generateRandomPages = function (n: number) {
  const editor = (window as any).editorInstance;
  for (let i = 0; i < n; ++i) {
    editor.generateRandomPage();
  }
};
