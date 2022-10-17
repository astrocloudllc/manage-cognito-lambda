import { Callback, Context } from 'aws-lambda';
import { default as AWS, CognitoIdentityServiceProvider } from 'aws-sdk';

interface Event {
	operation:
		| 'AdminCreateUser'
		| 'AdminDeleteUser'
		| 'AdminResetUserPassword'
		| 'AdminAddUserToGroup'
		| 'ListUsers';
	payload: any;
}

export async function main(
	{ operation, payload }: Event,
	context: Context,
	callback: Callback,
) {
	const cisp = new CognitoIdentityServiceProvider({
		apiVersion: 'latest',
		region: 'us-east-2',
	});

	if (operation === 'AdminCreateUser') {
		// parameters { UserPoolId: string!, Username: string!, DesiredDeliveryMediums: ["EMAIL"|"PHONE"], UserAttributes: [] }
		callback(null, await cisp.adminCreateUser(payload).promise());
	} else if (operation === 'AdminDeleteUser') {
		// parameters { UserPoolId: string!, Username: string! }
		callback(null, await cisp.adminDeleteUser(payload).promise());
	} else if (operation === 'AdminResetUserPassword') {
		// parameters { UserPoolId: string!, Username: string! }
		callback(null, await cisp.adminResetUserPassword(payload).promise());
	} else if (operation === 'AdminAddUserToGroup') {
		// parameters { UserPoolId: string!, Username: string!, GroupName: string! }
		callback(null, await cisp.adminAddUserToGroup(payload).promise());
	} else if (operation === 'ListUsers') {
		// parameters { UserPoolId: string!, AttributesToGet: [string!], Limit: int(0-60), PaginationToken: string }
		callback(null, await cisp.listUsers(payload).promise());
	} else {
		callback('invalid operation');
	}
}
