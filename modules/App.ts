import CRPApp from 'core/CRPApp';

import { CleanupStep, CloneStep, NpmInstallStep, NpmPackageUpdateStep } from './defaults/steps';
import { BoilerplateQuestion, OpenEditorQuestion, ProjectNameQuestion } from './defaults/questions';
import ReactViteInstaller from './react-vite/ReactVite.installer';
import DiscordBotInstaller from './discord-bot/DiscordBot.installer';
import NodeAppInstaller from './node-app/NodeApp.installer';
import NestjsAppInstaller from './nestjs-app/NestjsApp.installer';


export default class App extends CRPApp {
  /** Do not add installer specific modules to defaults */
  defaults = {
    steps: [
      CloneStep,
      NpmPackageUpdateStep,
      NpmInstallStep,
      CleanupStep,
    ],
    questions: [
      BoilerplateQuestion,
      ProjectNameQuestion,
      OpenEditorQuestion,
    ],
  };

  installers = [
    ReactViteInstaller,
    DiscordBotInstaller,
    NodeAppInstaller,
    NestjsAppInstaller,
  ];
}
