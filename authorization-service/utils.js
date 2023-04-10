module.exports = {
    getAuthorizationHeader: (headers, context) => {
        const authorization = (headers.Authorization || '').replace('Basic ', '')
        if (!authorization || authorization === 'null') context.fail('Unauthorized');

        return authorization;
    },
    decodeAuthorizationHeader: (encodedHeader) => {
        return Buffer.from(encodedHeader, 'base64').toString('utf-8');
    },
    buildPolicyDocument: (effect, resource) => ({
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        }]
    })
}