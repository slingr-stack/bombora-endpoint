---
title: Bombora endpoint
keywords: 
last_updated: September 20, 2021
tags: []
summary: "Detailed description of the API of the Bombora endpoint."
---

## Overview

The Bombora endpoint allows to make use of the Company Surge API and the Topic Taxonomy API from the Bombora web application. 

In order to make it easy to work with the endpoint, some helpers are provided.

## Configuration

### API key

The API key provided by bombora needed to validate requests.

## Quick start

Once you have configured the endpoint, you can do a request to get the meta data of the Bomobora API like this:

```js
var metaData = app.endpoints.bombora.getMetaData();
log('List of reports: '+JSON.stringify(metaData));
```

## Javascript API

The Bombora endpoint allows direct access to the API. This means you can make HTTP requests
to access the API documented.

Additionally, the endpoint provides shortcuts and helpers for the most common use cases.

### HTTP requests

You can make `GET`, `POST` requests to the 
[Bombora Api](https://bombora-partners.atlassian.net/wiki/spaces/DOC/pages/524307/API+Documentation) like this:

```js
var res = app.endpoints.bombora._get({path:'/v2/Surge/GetMetaData'});
```

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### REST API shortcuts

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint. Check [API Documentation](https://bombora-partners.atlassian.net/wiki/spaces/DOC/pages/524307/API+Documentation) These
shortcuts follow these rules :

``` js
// Company Surge API:

- endpoint.getMetaData();

- endpoint.getCompanySurgeReport();

- endpoint.getCompanySurgeReportInJsonObject(); // If the report was set up to be sended as JSON then this method will handle the response in order to get one JSON object.

- endpoint.uploadDatabaseFileForCompanySurgeReport(slingrFileId);

- endpoint.createCompanySurgeReport(body);

- endpoint.estimatorEndpoint(body);

- endpoint.getListOfCompanySurgeReports();

- endpoint.deleteCompanySurgeReports(ids);

// Topic Taxonomy API :

- endpoint.getCategoriesByTheme(themeId);

- endpoint.getCategoriesCreatedAfterDate(date);

- endpoint.getCategoriesByNameOrId(nameOrId);

- endpoint.getListOfTopics(data,callback);

- endpoint.getListOfTopicsHierarchy();

- endpoint.getMyTopics(data,callback);

- endpoint.getThemeByNameOrId(nameOrId);

- endpoint.getThemesCreatedAfterDate(date,data,callback);

- endpoint.getTopicsByCategory(categoryId);

- endpoint.getTopicsCreatedAfterDate(date,data,callback);
```

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
