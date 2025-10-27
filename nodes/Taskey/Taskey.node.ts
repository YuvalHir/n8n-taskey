import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Taskey implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Taskey',
		name: 'taskey',
		icon: 'file:../../icons/github.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Taskey API (Add Lead, Purchase, Task, Meeting)',
		defaults: {
			name: 'Taskey',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'taskeyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Add Lead',
						value: 'addLead',
						action: 'Add a new lead',
						description: 'Add a new lead to Taskey',
					},
					{
						name: 'Add Purchase',
						value: 'addPurchase',
						action: 'Add a new purchase',
						description: 'Add a new purchase to Taskey',
					},
					{
						name: 'Add Task',
						value: 'addTask',
						action: 'Add a new task',
						description: 'Add a new task to Taskey',
					},
					{
						name: 'Add Meeting',
						value: 'addMeeting',
						action: 'Add a new meeting',
						description: 'Add a new meeting to Taskey',
					},
				],
				default: 'addLead',
			},
			// Add Lead parameters
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the lead',
				displayOptions: {
					show: {
						operation: ['addLead'],
					},
				},
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'The phone number',
				displayOptions: {
					show: {
						operation: ['addLead', 'addPurchase', 'addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'name@email.com',
				description: 'The email address',
				displayOptions: {
					show: {
						operation: ['addLead', 'addPurchase', 'addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Additional comment',
				displayOptions: {
					show: {
						operation: ['addLead', 'addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'The status of the lead',
				displayOptions: {
					show: {
						operation: ['addLead'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				description: 'The associated user ID',
				displayOptions: {
					show: {
						operation: ['addLead'],
					},
				},
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'The source of the lead',
				displayOptions: {
					show: {
						operation: ['addLead'],
					},
				},
			},
			{
				displayName: 'Campaign',
				name: 'campaign',
				type: 'string',
				default: '',
				description: 'The campaign name',
				displayOptions: {
					show: {
						operation: ['addLead'],
					},
				},
			},
			// Add Purchase parameters
			{
				displayName: 'Product Name',
				name: 'productName',
				type: 'string',
				default: '',
				description: 'The name of the product',
				displayOptions: {
					show: {
						operation: ['addPurchase'],
					},
				},
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'The purchase amount',
				displayOptions: {
					show: {
						operation: ['addPurchase'],
					},
				},
			},
			// Add Task parameters
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				required: true,
				description: 'The title of the task',
				displayOptions: {
					show: {
						operation: ['addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'string',
				default: '',
				description: 'The description of the task or meeting',
				displayOptions: {
					show: {
						operation: ['addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'taskUserId',
				type: 'string',
				default: '',
				description: 'The user ID for the task',
				displayOptions: {
					show: {
						operation: ['addTask', 'addMeeting'],
					},
				},
			},
			{
				displayName: 'Follower User ID',
				name: 'followerUserId',
				type: 'string',
				default: '',
				description: 'The follower user ID for the task',
				displayOptions: {
					show: {
						operation: ['addTask', 'addMeeting'],
					},
				},
			},
			// Add Meeting parameters
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'The start date and time of the meeting (d-m-Y H:i)',
				displayOptions: {
					show: {
						operation: ['addMeeting'],
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'The end date and time of the meeting (d-m-Y H:i)',
				displayOptions: {
					show: {
						operation: ['addMeeting'],
					},
				},
			},
			{
				displayName: 'Follow ID',
				name: 'followId',
				type: 'string',
				default: '',
				description: 'The follow ID for the meeting',
				displayOptions: {
					show: {
						operation: ['addMeeting'],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				typeOptions: {
					multipleValues: true,
					multipleValueButtonText: 'Add Field',
				},
				default: {},
				options: [
					{
						displayName: 'Field Name',
						name: 'fieldName',
						type: 'string',
						default: '',
						description: 'Name of the additional field',
					},
					{
						displayName: 'Field Value',
						name: 'fieldValue',
						type: 'string',
						default: '',
						description: 'Value of the additional field',
					},
				],
				description: 'Additional fields to send',
				displayOptions: {
					show: {
						operation: ['addLead', 'addPurchase', 'addTask', 'addMeeting'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const credentials = await this.getCredentials('taskeyApi');
				const subdomain = credentials.subdomain as string;
				const apiKey = credentials.apiKey as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				// Construct URL based on operation
				let endpoint = '';
				switch (operation) {
					case 'addLead':
						endpoint = 'AddLead.php';
						break;
					case 'addPurchase':
						endpoint = 'AddPurchase.php';
						break;
					case 'addTask':
						endpoint = 'AddTask.php';
						break;
					case 'addMeeting':
						endpoint = 'AddMeeting.php';
						break;
				}
				const webhookUrl = `https://${subdomain}.taskey.co.il/webapi/${endpoint}`;

				// Get common parameters
				const phone = this.getNodeParameter('phone', itemIndex, '') as string;
				const email = this.getNodeParameter('email', itemIndex, '') as string;
				const comment = this.getNodeParameter('comment', itemIndex, '') as string;
				const additionalFields = this.getNodeParameter('additionalFields', itemIndex, []) as Array<{ fieldName: string; fieldValue: string }>;

				// Construct form data
				let body = `api_key=${encodeURIComponent(apiKey)}&`;
				if (phone) body += `phone=${encodeURIComponent(phone)}&`;

				// Email field name varies by operation
				if (email) {
					const emailField = operation === 'addPurchase' || operation === 'addTask' ? 'mail' : 'email';
					body += `${emailField}=${encodeURIComponent(email)}&`;
				}

				// Operation-specific parameters
				if (operation === 'addLead') {
					const name = this.getNodeParameter('name', itemIndex, '') as string;
					const status = this.getNodeParameter('status', itemIndex, '') as string;
					const userId = this.getNodeParameter('userId', itemIndex, '') as string;
					const source = this.getNodeParameter('source', itemIndex, '') as string;
					const campaign = this.getNodeParameter('campaign', itemIndex, '') as string;

					if (name) body += `name=${encodeURIComponent(name)}&`;
					if (comment) body += `comment=${encodeURIComponent(comment)}&`;
					if (status) body += `status=${encodeURIComponent(status)}&`;
					if (userId) body += `user_id=${encodeURIComponent(userId)}&`;
					if (source) body += `source=${encodeURIComponent(source)}&`;
					if (campaign) body += `campaign=${encodeURIComponent(campaign)}&`;
				} else if (operation === 'addPurchase') {
					const name = this.getNodeParameter('name', itemIndex, '') as string;
					const productName = this.getNodeParameter('productName', itemIndex, '') as string;
					const amount = this.getNodeParameter('amount', itemIndex, 0) as number;

					if (name) body += `name=${encodeURIComponent(name)}&`;
					if (productName) body += `productname=${encodeURIComponent(productName)}&`;
					if (amount > 0) body += `amount=${encodeURIComponent(amount.toString())}&`;
					if (comment) body += `comment=${encodeURIComponent(comment)}&`;
				} else if (operation === 'addTask') {
					const name = this.getNodeParameter('name', itemIndex, '') as string;
					const title = this.getNodeParameter('title', itemIndex, '') as string;
					const bodyParam = this.getNodeParameter('body', itemIndex, '') as string;
					const taskUserId = this.getNodeParameter('taskUserId', itemIndex, '') as string;
					const followerUserId = this.getNodeParameter('followerUserId', itemIndex, '') as string;

					if (name) body += `name=${encodeURIComponent(name)}&`;
					if (title) body += `title=${encodeURIComponent(title)}&`;
					if (bodyParam) body += `body=${encodeURIComponent(bodyParam)}&`;
					if (taskUserId) body += `user_id=${encodeURIComponent(taskUserId)}&`;
					if (followerUserId) body += `user_id_follower=${encodeURIComponent(followerUserId)}&`;
					if (comment) body += `comment=${encodeURIComponent(comment)}&`;
				} else if (operation === 'addMeeting') {
					const title = this.getNodeParameter('title', itemIndex, '') as string;
					const bodyParam = this.getNodeParameter('body', itemIndex, '') as string;
					const startDate = this.getNodeParameter('startDate', itemIndex, '') as string;
					const endDate = this.getNodeParameter('endDate', itemIndex, '') as string;
					const taskUserId = this.getNodeParameter('taskUserId', itemIndex, '') as string;
					const followerUserId = this.getNodeParameter('followerUserId', itemIndex, '') as string;
					const followId = this.getNodeParameter('followId', itemIndex, '') as string;

					if (title) body += `title=${encodeURIComponent(title)}&`;
					if (bodyParam) body += `body=${encodeURIComponent(bodyParam)}&`;
					if (startDate) body += `start_date=${encodeURIComponent(startDate)}&`;
					if (endDate) body += `end_date=${encodeURIComponent(endDate)}&`;
					if (taskUserId) body += `user_id=${encodeURIComponent(taskUserId)}&`;
					if (followerUserId) body += `user_id_follower=${encodeURIComponent(followerUserId)}&`;
					if (followId) body += `follow_id=${encodeURIComponent(followId)}&`;
					if (comment) body += `comment=${encodeURIComponent(comment)}&`;
				}

				// Add additional fields
				additionalFields.forEach(field => {
					if (field.fieldName && field.fieldValue) {
						body += `${encodeURIComponent(field.fieldName)}=${encodeURIComponent(field.fieldValue)}&`;
					}
				});

				if (body.endsWith('&')) body = body.slice(0, -1);

				// Make the POST request
				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: webhookUrl,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body,
				});

				returnData.push({
					json: {
						success: true,
						response,
					},
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: itemIndex },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}