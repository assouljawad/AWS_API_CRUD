import logging
import boto3
import json
from botocore.exceptions import ClientError

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(event)
    
    http_method = event.get('httpMethod')
    # if event.get('body'):
    #     id = event.get('body')
    if not http_method:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'httpMethod is required in the event'})
        }

    # Handle each HTTP method with its corresponding logic
    if http_method == 'GET':
        return handle_get()
    # if httpMethod == 'GET' and id:
    #     return handle_get_item(id)
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
        return handel_put(event)
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
# def handle_get_item(id):
#     dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
#     table = dynamodb.Table("notes")
#     try:
#         response = table.get_item(Key={'id': id})
#         item = response.get('Item')
#         if not item:
#             return {
#                 'statusCode': 404,
#                 'body': json.dumps({'error': 'Item not found'})
#             }
#     except ClientError as e:
#         logger.error(e)
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'error': 'Could not get item from table'})
#         }
#     return {
#         'statusCode': 200,
#         "headers": {
#             "Content-Type": "application/json",
#             "Access-Control-Allow-Origin": "*"
#         },
#         'body': json.dumps(item)
#     }    
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

def handel_put(event):
    # Parse the request body
    try:
        body = json.loads(event.get('body', '{}'))
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }

    # Check for the required keys
    required_keys = ['id', 'title', 'category', 'note', 'user']
    for key in required_keys:
        if key not in body:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': f'{key} is required in the request body'})
            }

    dynamodb_resource = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb_resource.Table('notes')
    
    try:
        response = table.update_item(
            Key={'id': body['id']},
            ExpressionAttributeNames={
                '#T': 'title',
                '#C': 'category',
                '#N': 'note',
                '#U': 'user'
            },
            ExpressionAttributeValues={
                ':t': body['title'],
                ':c': body['category'],
                ':n': body['note'],
                ':u': body['user']
            },
            UpdateExpression='SET #T = :t, #C = :c, #N = :n, #U = :u',
            ReturnValues="UPDATED_NEW"
        )
    except ClientError as e:
        logger.error(e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not update item in table'})
        }

    return {
        'statusCode': response['ResponseMetadata']['HTTPStatusCode'],
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        'body': f"Record {body['id']} updated"
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
