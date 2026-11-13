
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    storageState: '.auth/user.json',
});

export { expect };