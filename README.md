# Technical Test Setup Guide

This document provides instructions on how to set up and run the technical test project using `bun`, along with details on utilizing linting tools to ensure code quality.

## Prerequisites

Before you begin, ensure you have `bun` installed on your system. If you do not have `bun` installed, you can find installation instructions [here](https://bun.sh/).

## Project Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/FrankDeWitt/EventsTravel-TechCase.git
   ```

2. Navigate into the project directory:

   ```bash
   cd EventsTravel-TechCase
   ```

3. Install the dependencies using `bun`:

   ```bash
   bun install
   ```

## Running the Project

To start the project, run the following command in your terminal:

```bash
 bun run dev
```

## Linting Commands

The project includes several linting commands to help maintain code quality and consistency. These commands utilize ESLint for TypeScript linting and Prettier for code formatting.

Lint TypeScript and Vue files: To lint .ts and .vue files, ensuring they adhere to the project's coding standards, run:

```bash
 bun run lint:ts
```

Check code formatting with Prettier: To check all files in the project for formatting issues without making any changes, use:

```bash
 bun run lint:prettier
```

Run all linting checks: To execute both ESLint and Prettier checks at once, you can use:

```bash
 bun run lint
```

Automatically fix linting and formatting issues: For automatically fixing any detectable issues and listing any differences that need manual intervention, the following command can be used:

```bash
 bun run lintfix
```

## Further Help

For more information on working with `bun`, `Nuxt`, `ESLint`, or `Prettier`, please refer to their respective documentation.

- [Bun Documentation](https://bun.sh/docs/installation)
- [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction)
- [ESLint Getting Started with ESLint](https://eslint.org/docs/latest/use/getting-started)
- [Prettier Documentation](https://prettier.io/docs/en/install)

## Extra information

For the database implementation, the Nuxt server is utilized to populate the initial data from a JSON file. This approach avoids direct manipulation of the JSON file, which could restrict its utility. Instead, the server creates a duplicate of the data in a persistent variable. This variable is designed to share the state across all devices connecting to the server, ensuring a synchronized view of the data for every user.

To maintain the integrity and initial state of the data, the server does not modify the original JSON directly. Any changes to the data during runtime are made to the persistent variable copy. This design choice ensures that the original dataset remains unaltered and accessible in its initial form.

Resetting Data State:
The persistent variable's data is stored in memory and remains constant across sessions and devices until the server undergoes a restart. Restarting the server is the designated method for resetting the data stored in the persistent variable back to its original state, as defined by the initial JSON file. This process ensures that any runtime modifications to the data are cleared, and the system is restored to its baseline configuration.
