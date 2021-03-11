# moralis-pics-demo

Intragram clone demo<br>
https://moralis-pics-demo.netlify.app/

## Setup

To use the Moralis in the browser add the CDN links in the `<head>` tag. The latest version at time of writing is `0.0.6`.

```javascript
<head>
  <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
  <script src="https://npmcdn.com/moralis@0.0.6/dist/moralis.js"></script>
</head>
```

Next intialize an instance of `Moralis`. Log into the Moralis site and create a new Moralis Server. Copy the "Sever URL" and "Application ID" into the following code:

```javascript
<script>
  // i.e. O1aDE...QOV9
  Moralis.initialize("your app ID");

  // ie. https://pft...g8bn.moralis.io:2053/server
  Moralis.serverURL = "your server URL";
</script>
```

## Adding data to Moralis Cloud

The demo app stores image files in the Moralis Cloud. Moralis does all the heavy lifting! Storing data is as simple as creating objects and calling `.save()`.

### Saving images as files

First we need a form to get the file to upload.

```javascript
<form>
  <input type="text" id="input-search" name="address" placeholder="search address">
  <button type="submit" id="btn-search">Search</button>
</form>
```

Then in the javascript file:

```javascript
// get file from input form
const imgInput = document.getElementById("input-img-file");
const file = imgInput.files[0];

// save file to Moralis Cloud
const moralisImg = new Moralis.File(file.name, file);
await moralisImg.save();
```

### Saving objects

Now that the image file is saved to the Cloud it can be bundled into another object to tie it to a user's profile:

```javascript
// get the current user
const user = Moralis.User.current();

// create a new object of type "UserImage"
const userImg = new Moralis.Object("UserImage");

// set the object properties
userImg.set("userId", user.id);
userImg.set("img", moralisImg);

// save the object to Moralis Cloud
await userImg.save();
```

### Searching

Each object stored in Moralis Cloud has a set of permissions associated with it. This is defined in the `ACL` list (Access Control List). By default users can only query objects which are associated with themselves. To perform a search for the profile of another user requires a Cloud Function and the `{useMasterKey: true}` option.

Cloud Functions are created with

```javascript
Moralis.Cloud.define("myCloudFunction", async function (request) {});
```

Parameters to the Cloud Function are passed as object properties and can be accessed via `request.params`. For more details check out the <a href="https://docs.parseplatform.org/cloudcode/guide/" target="_blank">Parse Cloud Code Guide</a> and <a href="https://docs.parseplatform.org/js/guide/#queries" target="_blank">Parse Query Guide</a>.

```javascript
// @@@ Paste this code into the Moralis Cloud Functions section on the server @@@
Moralis.Cloud.define("getProfileForAddress", async function (request) {
  // convert address to lower case to remove any checksum capitalization
  const address = request.params.address.toLowerCase();
  if (!address) {
    return null;
  }

  // find user
  let query = new Moralis.Query(Moralis.User);
  query.equalTo("ethAddress", address);
  const user = await query.first({ useMasterKey: true });
  if (!user) {
    return null;
  }

  // get user posted pics
  query = new Moralis.Query("UserImage");
  query.equalTo("userId", user.id);
  const results = await query.find({ useMasterKey: true });
  const pics = results.map(function (r) {
    return {
      url: r.attributes.img.url(),
      name: r.attributes.img.name(),
    };
  });

  // return profile and pics
  return {
    userId: user.id,
    address: user.get("ethAddress"),
    pics,
  };
});
```
