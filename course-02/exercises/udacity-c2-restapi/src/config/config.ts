export const config = {
  "dev": {
    "username": process.env.UD_DB_USER,
    "password": process.env.UD_DB_PASSWORD,
    "database": process.env.UD_DB_DB,
    "host": process.env.UD_DB_HOST,
    "dialect": "postgres",
    "aws_region": process.env.UD_AWS_REGION,
    "aws_profile": "default",
    "aws_media_bucket": process.env.UD_AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret": process.env.API_SECRET
  }
}
