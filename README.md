# login.dfe.notifications

[![Build Status](https://travis-ci.org/DFE-Digital/login.dfe.notifications.svg?branch=master)](https://travis-ci.org/DFE-Digital/login.dfe.notifications)

[![VSTS Build Status](https://sfa-gov-uk.visualstudio.com/_apis/public/build/definitions/aa44e142-c0ac-4ace-a6b2-0d9a3f35d516/710/badge)](https://sfa-gov-uk.visualstudio.com/DfE%20New%20Secure%20Access/_build/index?definitionId=710&_a=completed)

Service for processing user notifications

## Getting started

### Install dependencies

```
npm i
```

### Start

```
npm run dev
```


## Queue request manually

```
node tools/createPasswordResetV1.js
node tools/createInvitationV1.js
```

Where createPasswordResetV1.js is the type of message to queue. Currently available messages are:

* createPasswordResetV1.js - Will queue v1 password reset notification.
* createInvitationV1.js - Will queue v1 invitation notification.


## Change email delivery method

Currently the supported email delivery methods are:

* Disk - Will write notification data to ./app_data/email/[template]/[date].json
* S3 - Will write notification data to the configured bucket in /notifications/email/[template]/[date].json

Example settings exist for both types in the config folder.