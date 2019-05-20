# Typescript

[![Build Status](https://travis-ci.com/Pod-Point/typescript.svg?branch=master)](https://travis-ci.com/Pod-Point/typescript)
[![codecov](https://codecov.io/gh/Pod-Point/typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/Pod-Point/typescript)

A library of re-usable TypeScript components.

## Installation

To install this, simply run:
```bash
npm install @pod-point/typescript
```

## Usage

This package contains a HTTP client, an abstract HTTP repository & service class, an abstract model class and model factories.

### Client

Create a client instance to make http requests.

```js
// path/to/client
import { Client } from '@pod-point/typescript';

export default new Client(...args);
```

### Repositories & Services

Create and use a repository to wrap a RESTful API endpoint and handle the json as a model rather than a plain old JavaScript object.

```js
// path/to/ExampleRepository
import { Repository } from '@pod-point/typescript';
import ExampleModel from 'path/to/ExampleModel';

export default class ExampleRepository extends Repository<ExampleModel> {
    //
```

```js
// path/to/anywhere
import ExampleRepository from 'path/to/ExampleRepository';
import client from 'path/to/client';

const exampleRepository = new ExampleRepository(client);
```

### Models & Factories

Create a and use model factories to generate: 
- fake model instances
- fake objects representing a models attributes
- fake objects representing a models payload

```js
// path/to/ExampleModelFactory
import { Factory } from '@pod-point/typescript';
import ExampleModel from 'path/to/ExampleModel';
import ExampleModelAttributes from 'path/to/ExampleModelAttributes';

export default class ExampleModelFactory extends Factory<ExampleModel, ExampleModelAttributes> {
    //
```

```js
import { ExampleModelFactory } from 'path/to/ExampleModelFactory';

const exampleModelFactory = new ExampleModelFactory();
const fakeExampleModelAttributes = exampleModelFactory.attributes();
const fakeExampleModel = exampleModelFactory.model();
```

Overrides can be passed into all of these methods, and there is also a method available to generate any of these objects in a pre-defined "state".

This is styled on the [Laravel factories](https://laravel.com/docs/5.6/database-testing#factory-states).

Example:
```js
import { ExampleModelFactory } from 'path/to/ExampleModelFactory';

const exampleModelFactory = new ExampleModelFactory();
const exampleModel = exampleModelFactory.states(['deleted']).model();
```

In the example above we have applied the "deleted" state before generating the model, this would basically apply some pre-defined overrides to the fake attributes.

## Development

### Testing

This package uses jest. To run the test suites for this project, run the following command:

```bash
npm run test
```

### Releases

This package is distributed via NPM and published automatically by Travis when creating a tagged commit. This can be done in one of 2 ways:

#### 1. Pre-merge via the CLI

**Before** merging your PR following code review & QA, run the following commands to update the package version and create a new release/tag.
```
npm version <major|minor|patch|prerelease>
git push && push --tags
```

If you forget to do this before merging, this is not a problem, just create a new branch from master and run these same commands, remembering to open and merge a PR for this branch so that the `package.json` file is updated, alternatively, see option 2.

#### 2. Post-merge via code & GitHub

**After** merging your code changes, create a new branch/PR from master and update the package version in `package.json` to whatever you wish the next release to be.

**Before** merging this PR, create a release via GitHub with a tag version to match this package version number, this will trigger the tagged commit and in turn the automatic deployment to NPM.
