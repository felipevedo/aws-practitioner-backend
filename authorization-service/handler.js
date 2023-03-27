'use strict';

const { getAuthorizationHeader, decodeAuthorizationHeader, buildPolicyDocument } = require('./utils');

const { felipevedo } = process.env;

module.exports.basicAuthorizer = async (event, context) => {
  const { headers, methodArn } = event;
  const principalId = 'felipevedo';
  const validCredentials = `${principalId}:${felipevedo}`;
  const encodedHeader = getAuthorizationHeader(headers, context);
  const authorizationHeader = decodeAuthorizationHeader(encodedHeader);
  const effectValue = validCredentials === authorizationHeader ? 'Allow' : 'Deny';

  console.log(`
  validCredentials: ${validCredentials} |
  headers.Authorization: ${headers.Authorization} |
  authorizationHeader: ${authorizationHeader} |
  effectValue: ${effectValue} |
  `);

  return {
    principalId,
    policyDocument: buildPolicyDocument(effectValue, methodArn)
  };
};
