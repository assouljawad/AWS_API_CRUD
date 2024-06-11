import logging
import boto3
import json
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(event)
    
    http_method = event.get('httpMethod')
    if not http_method:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'httpMethod is required in the event'})
        }

    # Handle each HTTP method with its corresponding logic
    if http_method == 'GET':
        return handle_get()
    elif http_method == 'POST':
        body = event.get('body')
        if not body:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'body is required for POST requests'})
            }
        try:
            body = json.loads(body)
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid JSON in request body'})
            }
        return handle_post(body)
    elif http_method == 'PUT':
        return handle_put()
    elif http_method == 'DELETE':
        body = event.get('body')
        try:
            body = json.loads(body)
        except json.JSONDecodeError:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Invalid JSON in request body'})
            }
        return handle_delete(body)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method Not Allowed'})
        }
    
def handle_get():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table("notes")
    try:
        items = table.scan()['Items']
    except ClientError as e:
        logger.error(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not scan the table'})
        }
    return {
        'statusCode': 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(items)
    }

def handle_post(reqbody):
    dynamodb = boto3.client('dynamodb')
    item = {
        'id': {'S': reqbody['id']},
        'title': {'S': reqbody['title']},
        'note': {'S': reqbody['note']},
        'category': {'S': reqbody['category']},
        'user': {'S': reqbody['user']}
    }
    try:
        dynamodb.put_item(TableName='notes', Item=item)
    except ClientError as e:
        logger.error(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not put item in table'})
        }
    body = {
        'Operation': 'SAVE',
        'Message': 'SUCCESS',
        'Item': reqbody
    }
    return {
        'statusCode': 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(body)
    }

def handle_put():
    # Your logic for handling PUT requests
    return {
        'statusCode': 200,
        'body': 'PUT request handled'
    }

def handle_delete(reqbody):
    dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb_resource.Table('notes')
    id = reqbody['id']
    try:
        table.delete_item(Key={"id": id})
    except ClientError as e:
        logger.error(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not put item in table'})
        }
    body = {
        'Operation': 'DELETE',
        'Message': 'SUCCESS',
        'Item': id
    }
    return {
        'statusCode': 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(body)
    }
