# AstroCMS

## Setup

1. Some magic

### Create your first user

1. Go to the admin dashboard `/admin`
2. Fill the form to register
3. Congrats! You are now logged in.

Subsequent users will not be able to register. They need to be invited by another existing user.

## Supported

Supported Zod primitive:

- z.string()
- z.date()
- z.number()
- z.boolean()
- z.enum()

Supported Zod method:

- .optional()
- .default()
- .describe()

Supported file format:

- .yml
- .json
- .md

To be tested:

- Having two files (e.g: a `yaml` and `json` file) with the same name
- Having custom slugs
