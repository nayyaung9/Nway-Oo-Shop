```POST "/api/auth/login"```

This API is used to authenticate user.

Params 

```
{
    "email" 	: "<email>",
    "password" 	: "<string>"
}
```

Response Errors
```
    500 -> Server Error
```

Response Success

```
    200 	-> success 
    header  -> Authorization (Bearer Token)
```

Use Bearer Token to Call Every API after Login to check Valid User.