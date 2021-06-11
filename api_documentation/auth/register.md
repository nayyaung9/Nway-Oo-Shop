```POST "/api/auth/register"```

This API is used to create new user ( Registration ).

Params 

```
{
    "email" 	: "<email>",
    "password" 	: "<string>",
    "fullname": "<string>",
}
```

Response Errors
```
    400 -> Missing Field (s)
    403 -> The email has already been used
    500 -> Server Error
```

Response Success

```
    200 	-> success 
    header  -> Authorization (Bearer Token)
```

Use Bearer Token to Call Every API after Login to check Valid User.