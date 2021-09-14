
///////////////////////////////////
// Company Surge API
//////////////////////////////////
endpoint.getMetaData = function() {
    return endpoint._get({path:'/v2/Surge/GetMetaData'});
};

endpoint.getCompanySurgeReport = function(reportId,fileName) {
    return endpoint._get({
    path:'/v2/surge/TryGetResult?id='+reportId,
    forceDownload: true,
    downloadSync: true,
    fileName: fileName || 'bomboraFile'
    });
};

endpoint.getCompanySurgeReportInJsonObject = function(reportId) { //report has to have "JSON" type as response format
    var newFile = endpoint.getCompanySurgeReport(reportId);
    var fileReader = sys.files.open(newFile.fileId, 'text/plain');
    try {
      var line;
      var descriptor = fileReader.descriptor();
      var i = 0;
      var reportMap ={};
      try {
      while (line = fileReader.readLine()) {
        reportMap[i] = JSON.parse(line);
        i++;
        }
      }catch (e){
        if (e.message.substring(0, e.message.length -1) == "Unexpected token: ") {
          throw "Probably surge Report is not set to have JSON format"
        }
      }
    } finally {
    fileReader.close();
    }
    return reportMap;
}
endpoint.uploadDatabaseFileForCompanySurgeReport = function(fileId) {
    var fileReader = sys.files.open(fileId, 'text/plain');
    try {
      var descriptor = fileReader.descriptor();
      var fileName = descriptor.name();
    } finally {
      fileReader.close();
    }
    return endpoint._uploadFile ({
        path: '/v3/Surge/UploadSurgeFile',
        fileName: fileName,
        fileId: fileId
    });
};

endpoint.createCompanySurgeReport = function(body) {
    return endpoint._post({
        path: '/v4/Surge/Create',
        headers: {"Content-Type": "application/json"},
        body: body
    });
};
endpoint.estimatorEndpoint = function(body) {
    return endpoint._post({
        path: '/v4/Surge/Estimate',
        headers: {"Content-Type": "application/json"},
        body: body
    });
};
endpoint.getListOfCompanySurgeReports = function() {
    return endpoint._get({path:'/v4/Surge/GetList'});
};

endpoint.deleteCompanySurgeReports = function(ids) {
    return endpoint._post({
        path: '/v4/Surge/Delete',
        headers: {"Content-Type": "application/json"},
        body: {ids: ids}
    });
};

///////////////////////////////////
// Topic Taxonomy
///////////////////////////////////

endpoint.getCategoriesByTheme = function(themeId) {
    return endpoint._get({path:'/v2/Topic/CategoriesByTheme?theme_id='+themeId});
};

endpoint.getCategoriesCreatedAfterDate = function(date) {
    return endpoint._get({path:'/v2/Topic/CategoriesAfterDate?date='+date});
};

endpoint.getCategoriesByNameOrId = function(nameOrId) {
    if (typeof nameOrId == 'number') {
        return endpoint._get({path:'/v2/Topic/GetCategory?id='+nameOrId})
    } else if (typeof nameOrId == 'string') {
        return endpoint._get({path:'/v2/Topic/GetCategory?name='+encodeURIComponent(nameOrId)});
    }
};

endpoint.getListOfTopics = function(data,callback) {
    return endpoint._getAsync({path:'/v2/cmp/GetAllTopics'},data,callback);
};

endpoint.getListOfTopicsHierarchy = function() {
    return endpoint._get({path:'/v2/cmp/GetAllTopicsHierarchy'});
};

endpoint.getMyTopics = function (data,callback) {
    return endpoint._getAsync({path:'/v2/cmp/GetMyTopics'},data,callback);
};

endpoint.getThemeByNameOrId = function (nameOrId) {
       if (typeof nameOrId == 'number') {
            return endpoint._get({path:'/v2/Topic/GetTheme?id='+nameOrId})
       } else if (typeof nameOrId == 'string') {
            return endpoint._get({path:'/v2/Topic/GetTheme?name='+encodeURIComponent(nameOrId)});
       }
};

endpoint.getThemesCreatedAfterDate = function(date,data,callback) {
    return endpoint._getAsync({path:'/v2/Topic/ThemesAfterDate?date='+date},data,callback);
};

endpoint.getTopicByNameOrId = function (nameOrId) {
       if (typeof nameOrId == 'number') {
            return endpoint._get({path:'/v2/Topic/GetTopic?id='+nameOrId})
       } else if (typeof nameOrId == 'string') {
            return endpoint._get({path:'/v2/Topic/GetTopic?name='+encodeURIComponent(nameOrId)});
       }
};
endpoint.getTopicsByCategory = function(categoryId) {
    return endpoint._get({path:'/v2/Topic/TopicsByCategory?cat_id='+categoryId});
};
endpoint.getTopicsCreatedAfterDate = function(date,data,callback) {
    return endpoint._getAsync({path:'/v2/Topic/TopicsAfterDate?date='+date},data,callback);
};

