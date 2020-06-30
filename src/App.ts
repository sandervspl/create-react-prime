import fs from 'fs';
import * as i from 'types';
import { injectable, inject } from 'inversify';
import container from 'ioc';
import SERVICES from 'ioc/services';
import { TEXT, LOG_PREFIX } from './constants';

@injectable()
export default class App implements i.AppType {
  private installer!: i.InstallerType;

  constructor(
    @inject(SERVICES.CLIMgr) private readonly cliMgr: i.CLIMgrType,
    @inject(SERVICES.Logger) private readonly logger: i.LoggerType,
  ) {}


  async start(): Promise<void> {
    // Get installer for the type that was specified by the user
    this.installer = container.getNamed(SERVICES.Installer, this.cliMgr.installType);

    // Prepare installer environment
    this.installer.init();

    // Check if directory already exists to prevent overwriting existing data
    if (fs.existsSync(this.cliMgr.projectName)) {
      return this.logger.error(`directory '${this.cliMgr.projectName}' already exists.`);
    }

    try {
      // Start the installation process
      await this.installer.install();

      // eslint-disable-next-line no-console
      console.log(
        `${LOG_PREFIX} ⚡️ ${TEXT.BOLD}Succesfully installed ${this.cliMgr.installRepository}!${TEXT.DEFAULT}`,
      );

      process.exit();
    } catch (err) {
      this.logger.error(err);
    }
  }
}