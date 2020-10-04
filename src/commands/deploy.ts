import { SPFetchClient } from '@pnp/nodejs';
import { sp, AppCatalog } from '@pnp/sp';
import { readFileSync } from 'fs';
import * as chalk from 'chalk';

export const deploy = async (deployType: string, siteUrl: string, clientId: string, clientSecret: string): Promise<void> => {
    const packageSolutionJson = JSON.parse(readFileSync('./config/package-solution.json', 'utf8'));
    const solutionId: string = packageSolutionJson.solution.id;
    const zippedPackage: string = packageSolutionJson.paths.zippedPackage;
    const zippedPackageName: string = zippedPackage.substring(9);
    const file: ArrayBuffer = readFileSync(`./sharepoint/solution/${zippedPackageName}`, null).buffer;

    sp.setup({
        sp: {
            fetchClientFactory: () => {
                return new SPFetchClient(siteUrl, clientId, clientSecret);
            }
        }
    });

    try {
        let catalog: AppCatalog;

        if (deployType === 'site') {
            catalog = await sp.web.getSiteCollectionAppCatalog();
        } else {
            catalog = await sp.web.getAppCatalog();
        }

        console.log(chalk.yellow(`Solution ID: ${solutionId}`));
        console.log(chalk.yellow(`SPPKG file: ${zippedPackageName}`));
        console.log(chalk.yellow('Uploading .sppkg file to app catalog...'));

        await catalog.add(zippedPackageName, file, true);

        console.log(chalk.green('File uploaded successfully.'));
        console.log(chalk.yellow('Deploying .sppkg contents to CDN...'));

        await catalog.getAppById(solutionId).deploy();

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}