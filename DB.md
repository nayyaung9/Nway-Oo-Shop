## Nweoo Snacks Database Model v1
<br />
**User**

```
_id: String
email: String
password: String
fullname: String
createdAt: Date
```
____________________________

**Shop**
```
_id: String
shopname: String
phoneNumber: String
shopOwnerId: Ref => User
orderSystem: String
shopAddress: String
createdAt: Date
```
____________________________

**Products**

```
_id: String
title: String
content: HTMLContent
price: String
social: Array Object
userId: Ref => User
tags: Array
shopId: Ref => Shop
productImages: Array
delivery: String
payment: String
estimatedPrice: Number
createdAt: Date
```
____________________________

**Category**

```
_id: String
name: String
parent: String 
path: String

```