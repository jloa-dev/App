import {addSMSDomainIfPhoneNumber} from '@libs/PhoneNumber';

/**
 * Decodes the contact method from the route params
 */
function getDecodedContactMethodFromUriParam(contactMethodParam: string) {
    return addSMSDomainIfPhoneNumber(contactMethodParam);
}

export default getDecodedContactMethodFromUriParam;
