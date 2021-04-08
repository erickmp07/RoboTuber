<h1 align="center">RoboTuber</h1>
<h2 align="center">Credentials format</h2>

<p align="center">
  <a href="#algorithmia">Algorithmia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#google-custom-search-api">Google Custom Search API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#youtube">YouTube</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#watson-natural-language-understanding">Watson Natural Language Understanding</a>
</p>

<br>

Some API credentials must be added for run the project.

All the credentials are listed below:

### Algorithmia

See [this guideline](https://algorithmia.com/developers/platform/customizing-api-keys#default-api-key) that helps to generate the Algorithmia API Key. Copy it and create a file in this path as shown in the example below. 

File: `algorithmia.json`

Example:

```json
{
  "apiKey": "API_KEY_HERE"
}
```

### Google Custom Search API

Configures the [Google Custom Search Engine](https://cse.google.com/cse/create/new) as:
- **Sites to search** - google.com
- **Language** - English
- **Search engine name** - RoboTuber, for example
- **Image search** - Turned on
- **Search the entire web** - Turned on
- **Restrict pages that use Schema.org types** - Thing

Create it.

Click the **Control Panel** button on the new page, then click the **Copy to clipboard** button.

File: `google-search.json`

Example:

```json
{
    "apiKey": "API_KEY_HERE",
    "searchEngineID": "SEARCH_ENGINE_ID"
}
```

### YouTube

First of all, [Get started for free](https://cloud.google.com/) and set up your profile by following the steps.

In the [home panel](https://console.cloud.google.com/home/dashboard), go to the sidebar menu and click **APIs and services** then click **Library**.

Search for YouTube and click **YouTube Data API v3** or similar. Activate it.

Create the credentials (API key and OAuth). Download the credentials file e rename it as shown in the example below.

File: `google-youtube.json`

Example:

```json
{
  "web":{
    "client_id":"CLIENT_ID",
    "project_id":"PROJECT_ID",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"CLIENT_SECRET",
    "redirect_uris":["http://localhost:5000/oauth2callback"],
    "javascript_origins":["http://localhost:5000"]
  }
}
```

### Watson Natural Language Understanding

Register with [IBM](https://cloud.ibm.com/login) to create Watson credentials.

Click **Catalog** and then search for [**Natural Language Understanding**](https://cloud.ibm.com/catalog/services/natural-language-understanding)

On the new page, click **Create** and, in the sidebar menu, click **Service credentials**.

Click **Auto-generated service credentials** and copy the credentials.

Create a file as shown in the example below.

File: `watson-nlu.json`

Example:

```json
{
  "apikey": "...",
  "iam_apikey_description": "...",
  "iam_apikey_name": "...",
  "iam_role_crn": "...",
  "iam_serviceid_crn": "...",
  "url": "..."
}
```