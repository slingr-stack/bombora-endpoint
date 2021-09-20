package io.slingr.endpoints.bombora;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.framework.annotations.*;
import io.slingr.endpoints.services.AppLogs;
import io.slingr.endpoints.services.rest.RestMethod;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;

import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.file.FileDataBodyPart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.slingr.endpoints.services.rest.DownloadedFile;
import org.glassfish.jersey.media.multipart.ContentDisposition;

import javax.ws.rs.client.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.util.Date;

/**
 * <p>Sample endpoint
 *
 * <p>Created by jGuardiola 20/09/21
 */
@SlingrEndpoint(name = "bombora")
public class BomboraEndpoint extends HttpEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(BomboraEndpoint.class);
    private static final String BOMBORA_API_URL = "https://sentry.bombora.com";

    @ApplicationLogger
    private AppLogs appLogger;

    @EndpointProperty
    private String apiKey;

    public BomboraEndpoint() {
    }

    @Override
    public String getApiUri() {
        return BOMBORA_API_URL;
    }

    @Override
    public void endpointStarted() {
        // the loggers, endpoint properties, data stores, etc. are initialized at this point. the endpoint is ready to be used
        logger.info("Endpoint is started");
    }

    @Override
    public void endpointStopped(String cause) {
        logger.info(String.format("Endpoint is stopping - cause [%s]", cause));
    }
    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        setRequestHeaders(request);
        return defaultGetRequest(request);
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        setRequestHeaders(request);
        return defaultPostRequest(request);
    }

    @EndpointFunction (name = "_getAsync")
    public String getAsync(FunctionRequest request) {
        final Json data = get(request);
        Json body = request.getJsonParams();
        events().send("res", data, request.getFunctionId());
        return "ok";
    }
    @EndpointFunction (name = "_uploadFile")
    public String uploadCsv(FunctionRequest request) {
        Json body = request.getJsonParams();
        String fileName = body.string("fileName");
        String fileId = body.string("fileId");

        Client client = ClientBuilder.newClient();
        WebTarget webTarget = client.target(BOMBORA_API_URL);
        WebTarget path = webTarget.path("/v3/Surge/UploadSurgeFile");

        Invocation.Builder invocationBuilder = path.request();
        invocationBuilder.header("Authorization","Basic " + apiKey);
        invocationBuilder.header("Referer","bombora.com ");
        invocationBuilder.header("Content-Type","text/csv");
        invocationBuilder.header("Content-Disposition","attachment; fileName=\""+fileName+"\"");

        DownloadedFile file = files().download(fileId);

        final Response response = invocationBuilder.post(Entity.entity(file.getFile(), MediaType.TEXT_PLAIN_TYPE));
        String output = response.readEntity(String.class);
        return  output;
    }

    private void setRequestHeaders(FunctionRequest request) {
        Json body = request.getJsonParams();
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        headers.set("Content-Disposition", "attachment;");
        headers.set("Authorization", "Basic " + apiKey);
        headers.set("Referer", "bombora.com ");

        if (headers.isEmpty("Accept")) {
            headers.set("Accept", "application/json");
        }
        body.set("headers", headers);
    }

}
