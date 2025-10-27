import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TaskeyApi implements ICredentialType {
	name = 'taskeyApi';

	displayName = 'Taskey API';

	icon: Icon = { light: 'file:../icons/github.svg', dark: 'file:../icons/github.dark.svg' };

	documentationUrl = 'https://docs.taskey.co.il';

	properties: INodeProperties[] = [
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			placeholder: 'your-subdomain',
			description: 'Your Taskey account subdomain',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Taskey API key',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '=Bearer {{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials?.subdomain}}.taskey.co.il',
			url: '/webapi/AddLead.php',
			method: 'POST',
			body: '=api_key={{$credentials.apiKey}}&test=1',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	};
}