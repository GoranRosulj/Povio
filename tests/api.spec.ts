import { test, expect } from '../base/pomFixture';
import { faker } from '@faker-js/faker';

test.describe('API Tests', () => {
    let randomName: string;
    let randomEmail: string;
    let randomPassword: string; 

    test.beforeEach(async () => {
        randomName = faker.person.firstName();
        randomEmail = faker.internet.email();
        // Ensure password meets minimum requirements
        randomPassword = faker.internet.password({ length: 12 });
    });

    test.afterEach(async ({ apiWebComponent }) => {
        // Sign in first
        await apiWebComponent.signIn(randomEmail, randomPassword);
        // Then delete the account
        await apiWebComponent.deleteAccount();
    });

    test('Register new user via API', async ({ apiWebComponent }) => {
        const response = await apiWebComponent.signUp(randomName, randomEmail, randomPassword);
        expect(response.success).toBeTruthy();
    });

    test('Sign in via API', async ({ apiWebComponent }) => {
        // First register the user
        const signUpResponse = await apiWebComponent.signUp(randomName, randomEmail, randomPassword);
        expect(signUpResponse.success).toBeTruthy();
        
        // Add a small delay to ensure the registration is processed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Then try to sign in
        const signInResponse = await apiWebComponent.signIn(randomEmail, randomPassword);
        expect(signInResponse.success).toBeTruthy();
    });

    test('Cannot register with existing email', async ({ apiWebComponent }) => {
        // First register a user
        const firstResponse = await apiWebComponent.signUp(randomName, randomEmail, randomPassword);
        expect(firstResponse.success).toBeTruthy();

        // Try to register another user with the same email
        const secondResponse = await apiWebComponent.signUp(
            faker.person.firstName(),
            randomEmail,
            faker.internet.password({length: 12})
        );
        expect(secondResponse.success).toBeFalsy();
    });

    test('Cannot register with short password', async ({ apiWebComponent }) => {
        const response = await apiWebComponent.signUp(randomName, randomEmail, 'short');
        expect(response.success).toBeFalsy();
    });

    test('Can register with empty name', async ({ apiWebComponent }) => {
        // Try to register with empty name
        const signUpResponse = await apiWebComponent.signUp('', randomEmail, randomPassword);
        expect(signUpResponse.success).toBeTruthy();

        // Try to sign in to verify the account
        await new Promise(resolve => setTimeout(resolve, 1000));
        const signInResponse = await apiWebComponent.signIn(randomEmail, randomPassword);
        expect(signInResponse.success).toBeTruthy();

        // Add a note that this might be a potential bug in the application
        test.info().annotations.push({
            type: 'issue',
            description: 'Application allows registration with empty name field'
        });
    });

    test('Cannot register with invalid email format', async ({ apiWebComponent }) => {
        const response = await apiWebComponent.signUp(randomName, 'invalid-email', randomPassword);
        expect(response.success).toBeFalsy();
    });
}); 