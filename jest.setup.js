import '@testing-library/jest-dom';
import { mswServer } from './mocks/server-mocks';
import 'whatwg-fetch';
import { loadEnvConfig } from '@next/env';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

const projectDir = process.cwd();
loadEnvConfig(projectDir);
