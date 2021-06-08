import { Command } from 'commander';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', options) => {
    console.log(filename, options);
  });
