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
