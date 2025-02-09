// tools/update-version.js

import fs from 'fs/promises';
import path from 'path';
import { createInterface } from 'readline/promises';
import semver from 'semver';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptForAction() {
  console.log(chalk.cyan('\nAvailable actions:'));
  console.log(chalk.white('1. Update package version'));
  console.log(chalk.white('2. Add file paths as comments'));

  const action = await rl.question(
    chalk.yellow('\nChoose an action (1 or 2): '),
  );
  return action.trim();
}

async function updatePackageVersion(currentVersion) {
  const input = await rl.question(
    chalk.yellow(
      '\nEnter the new version or increment type (p|n|m or patch|minor|major): ',
    ),
  );

  let newVersion;
  const incrementMap = {
    p: 'patch',
    n: 'minor',
    m: 'major',
  };

  const normalizedInput =
    incrementMap[input.toLowerCase()] || input.toLowerCase();

  if (['patch', 'minor', 'major'].includes(normalizedInput)) {
    newVersion = semver.inc(currentVersion, normalizedInput);
  } else if (semver.valid(input)) {
    if (semver.lt(input, currentVersion)) {
      console.log(
        chalk.yellow(
          `\nWarning: New version (${input}) is lower than the current version (${currentVersion})`,
        ),
      );
    }
    newVersion = input;
  } else {
    console.log(chalk.red('\nInvalid version or increment type'));
    return null;
  }

  return newVersion;
}

async function updateFileComment(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const fileExtension = path.extname(filePath);

    let commentStart, commentEnd;

    switch (fileExtension) {
      case '.js':
        commentStart = '//';
        commentEnd = '';
        break;
      case '.ts':
        commentStart = '//';
        commentEnd = '';
        break;
      case '.jsx':
        commentStart = '//';
        commentEnd = '';
        break;
      case '.tsx':
        commentStart = '//';
        commentEnd = '';
        break;
      case '.css':
        commentStart = '/*';
        commentEnd = '*/';
        break;
      default:
        console.log(chalk.yellow(`Unsupported file type: ${filePath}`));
        return;
    }

    const relativePath = path.relative(process.cwd(), filePath);
    const commentLine = `${commentStart} ${relativePath} ${commentEnd}`;

    let updatedContent;
    if (fileContent.startsWith(commentStart)) {
      updatedContent = fileContent.replace(/^.*\n/, `${commentLine}\n`);
    } else {
      updatedContent = `${commentLine}\n${fileContent}`;
    }

    await fs.writeFile(filePath, updatedContent);
    console.log(chalk.green(`Updated: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error updating file: ${filePath}`), error);
  }
}

async function processDirectory(directory) {
  const spinner = ora(`Processing ${directory} directory...`).start();

  try {
    // First check if directory exists
    try {
      await fs.access(directory);
    } catch (error) {
      spinner.warn(
        `Directory ${directory} does not exist or is not accessible`,
      );
      return;
    }

    const files = await fs.readdir(directory);
    const processingPromises = [];

    for (const file of files) {
      // Skip node_modules directory & package-lock.json
      if (
        file === 'node_modules' ||
        file === 'package-lock.json' ||
        file === 'pnpm-lock.json'
      ) {
        continue;
      }

      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        processingPromises.push(processDirectory(filePath));
      } else if (
        ['.js', '.css', '.jsx', '.ts', '.tsx'].includes(path.extname(filePath))
      ) {
        processingPromises.push(updateFileComment(filePath));
      }
    }

    // Wait for all processing to complete
    await Promise.all(processingPromises);

    spinner.succeed(`Finished processing ${directory}`);
  } catch (error) {
    spinner.fail(`Error processing ${directory}: ${error.message}`);
    console.error(error);
  }
}

async function main() {
  try {
    console.log(chalk.cyan('\n=== Version and File Path Update Tool ===\n'));

    const packageJsonPath = 'package.json';
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    const currentVersion = packageJson.version;

    console.log(chalk.white(`Current version: ${chalk.green(currentVersion)}`));

    const action = await promptForAction();

    if (action === '1') {
      const newVersion = await updatePackageVersion(currentVersion);

      if (newVersion) {
        const spinner = ora('Updating package.json...').start();

        try {
          packageJson.version = newVersion;
          await fs.writeFile(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
          );
          spinner.succeed(
            chalk.green(`Version successfully updated to ${newVersion}`),
          );
        } catch (error) {
          spinner.fail('Failed to update package.json');
          throw error;
        }
      }
    } else if (action === '2') {
      console.log(chalk.cyan('\nUpdating file comments...'));

      // Process all directories concurrently
      const directories = ['src', 'tools'];
      await Promise.all(directories.map((dir) => processDirectory(dir)));

      console.log(
        chalk.green('\nFile comments have been updated successfully.'),
      );
    } else {
      console.log(
        chalk.red('\nInvalid action selected. Please choose 1 or 2.'),
      );
    }
  } catch (error) {
    console.error(chalk.red('\nAn error occurred:'), error);
  } finally {
    rl.close();
  }
}

main();
