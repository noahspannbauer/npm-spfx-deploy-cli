#! /usr/bin/env node

import * as program from 'commander';
import * as chalk from 'chalk';
import { deploy } from './commands/deploy';

program
    .version('1.0.0');

program
    .command('deploy <type>')
    .description('Upload .sppkg file to SharePoint tenant app catalog or a site collection app catalog.')
    .requiredOption('-u, --siteUrl [value]', 'SharePoint site URL')
    .requiredOption('-i, --clientId [value]', 'Client ID')
    .requiredOption('-s, --clientSecret [value]', 'Client secret')
    .action(async (deployType: string, options: { siteUrl: string; clientId: string; clientSecret: string; }) => {
        try {
            await deploy(deployType, options.siteUrl, options.clientId, options.clientSecret);
        } catch (error) {
            console.log(chalk.red(error.toString()));
            process.exitCode = 1;
        }
    });

program
    .parse(process.argv);