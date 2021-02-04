import * as i from 'types';
import { Container } from 'inversify';
import commander from 'commander';

import App from 'core/App';
import initCli from 'core/CLI';
import CLIMgr from 'core/CLIMgr';
import SERVICES from 'core/ioc/services';
import PackageMgr from 'core/utils/PackageMgr';
import getIocTargetName from 'core/utils/GetIocTargetName';

import installersConfig from 'modules/config';
import DefaultPrompt from 'modules/prompt/default/Prompt';


const container = new Container();

container.bind<i.AppType>(SERVICES.App).to(App);
container.bind<commander.Command>(SERVICES.CLI).toConstantValue(initCli());
container.bind<i.CLIMgrType>(SERVICES.CLIMgr).to(CLIMgr).inSingletonScope();
container.bind<i.PackageMgrType>(SERVICES.PackageMgr).to(PackageMgr);
container.bind<i.PromptType>(SERVICES.Prompt).to(DefaultPrompt).whenTargetNamed(getIocTargetName.prompt());

for (const lang in installersConfig) {
  const langCfg = installersConfig[lang];
  let stepsName = getIocTargetName.steps(lang as i.InstallLangs);
  let promptName = getIocTargetName.prompt(lang as i.InstallLangs);

  container.bind<i.StepsType>(SERVICES.Steps).to(langCfg.steps).whenTargetNamed(stepsName);

  if (langCfg.prompt) {
    container.bind<i.PromptType>(SERVICES.Prompt).to(langCfg.prompt).whenTargetNamed(promptName);
  }

  for (const boilerplate in langCfg.boilerplates) {
    const langTypeCfg = langCfg.boilerplates[boilerplate];

    container.bind<i.InstallerType>(SERVICES.Installer).to(langTypeCfg.installer).whenTargetNamed(langTypeCfg.name);

    if (langTypeCfg.steps) {
      stepsName = getIocTargetName.steps(lang as i.InstallLangs, boilerplate as i.BoilerplateTypes);
      container.bind<i.StepsType>(SERVICES.Steps).to(langTypeCfg.steps).whenTargetNamed(stepsName);
    }

    if (langTypeCfg.prompt) {
      promptName = getIocTargetName.prompt(lang as i.InstallLangs, boilerplate as i.BoilerplateTypes);
      container.bind<i.PromptType>(SERVICES.Prompt).to(langTypeCfg.prompt).whenTargetNamed(promptName);
    }
  }
}

export default container;
