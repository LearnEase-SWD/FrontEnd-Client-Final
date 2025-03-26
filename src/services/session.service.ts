import { SESSION_API } from "../constants/api/session";
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model";
import { GetSessions, Session, SessionRequest } from "../models/Session.model";
import { getRequest, postRequest, putRequest, deleteRequest } from "./httpsMethod";

const SessionService = {
    // Create a new session
    createSession(params: SessionRequest): Promise<ApiResponse> {
        return postRequest(SESSION_API.CREATE_SESSION, params);
    },

    // Get a list of sessions with optional search filters
    getSessions(params: GetSessions): Promise<ApiResponse<APIResponseData<Session>>> {
        return postRequest(SESSION_API.GET_SESSIONS, params);
    },

    // Get details for a specific session by ID
    getSession(sessionId: string): Promise<ApiResponse<Session>> {
        return getRequest(SESSION_API.GET_SESSION(sessionId));
    },

    // Update a session by ID
    updateSession(sessionId: string, params: SessionRequest): Promise<ApiResponse<Session>> {
        return putRequest(SESSION_API.UPDATE_SESSION(sessionId), params);
    },

    // Delete a session by ID
    deleteSession(sessionId: string): Promise<ApiResponse> {
        return deleteRequest(SESSION_API.DELETE_SESSION(sessionId));
    }
};

export default SessionService;
