import {sortEmailObjects} from '@src/libs/ContactUtils';

import {localeCompare} from '../utils/TestHelper';

import getDecodedContactMethodFromUriParam from '@pages/settings/Profile/Contacts/utils';

describe('ContactUtils', () => {
    describe('sortEmailObjects', () => {
        it('Should sort email objects with Expensify emails first', () => {
            const emails = [{value: 'user2@gmail.com'}, {value: 'user2@expensify.com'}, {value: 'user1@gmail.com'}, {value: 'user1@expensify.com'}];
            const sortedEmails = sortEmailObjects(emails, localeCompare);
            expect(sortedEmails).toEqual(['user1@expensify.com', 'user2@expensify.com', 'user1@gmail.com', 'user2@gmail.com']);
        });
    });

    describe('getDecodedContactMethodFromUriParam', () => {
        it('handles email addresses with percent characters without throwing URIError', () => {
            expect(getDecodedContactMethodFromUriParam('test%alias@gmail.com')).toBe('test%alias@gmail.com');
            expect(getDecodedContactMethodFromUriParam('user%25@example.com')).toBe('user%25@example.com');
        });

        it('does not double-decode valid email addresses containing hex-like escapes', () => {
            expect(getDecodedContactMethodFromUriParam('user%40tag@gmail.com')).toBe('user%40tag@gmail.com');
        });

        it('returns standard email addresses unchanged', () => {
            expect(getDecodedContactMethodFromUriParam('john@gmail.com')).toBe('john@gmail.com');
        });

        it('appends SMS domain to phone numbers', () => {
            expect(getDecodedContactMethodFromUriParam('+15551234567')).toBe('+15551234567@expensify.sms');
        });

        it('leaves phone numbers already having SMS domain unchanged', () => {
            expect(getDecodedContactMethodFromUriParam('+15551234567@expensify.sms')).toBe('+15551234567@expensify.sms');
        });
    });
});
