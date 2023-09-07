import type {
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
	UploadValidationOptions,
	QueryRequestOptions,
	MutationRequestOptions,
	ClientOperationErrors,
	ExtractProfileName,
	ExtractMeta,
	GraphQLError,
} from "@wundergraph/sdk/client";
import { Client } from "@wundergraph/sdk/client";
import type { OperationErrors } from "./ts-operation-errors";

import type { PublicCustomClaims } from "./claims";
import type {
	ContinentsResponse,
	ContinentsResponseData,
	CountriesResponse,
	CountriesInput,
	CountriesResponseData,
	RelayC11158afcc8e55409b96972f20e26fa1Response,
	RelayC11158afcc8e55409b96972f20e26fa1ResponseData,
	RelayCe2342daed4e1960717c581d645e335dResponse,
	RelayCe2342daed4e1960717c581d645e335dResponseData,
	UsersGetResponse,
	UsersGetInput,
	UsersGetResponseData,
	UsersSubscribeResponse,
	UsersSubscribeInput,
	UsersSubscribeResponseData,
	UsersUpdateResponse,
	UsersUpdateInput,
	UsersUpdateResponseData,
} from "./models";
export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = true;

export enum AuthProviderId {
	"google" = "google",
}

export interface AuthProvider {
	id: AuthProviderId;
	login: (redirectURI?: string) => void;
}

export const defaultClientConfig: ClientConfig = {
	applicationHash: "ae1b4768",
	baseURL: "http://localhost:9991",
	sdkVersion: "0.177.0",
};

export const operationMetadata: OperationMetadata = {
	Continents: {
		requiresAuthentication: false,
	},
	Countries: {
		requiresAuthentication: false,
	},
	"relay/c11158afcc8e55409b96972f20e26fa1": {
		requiresAuthentication: false,
	},
	"relay/ce2342daed4e1960717c581d645e335d": {
		requiresAuthentication: false,
	},
	"users/get": {
		requiresAuthentication: false,
	},
	"users/subscribe": {
		requiresAuthentication: false,
	},
	"users/update": {
		requiresAuthentication: false,
	},
};

export type PublicUser = User<UserRole, PublicCustomClaims>;

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Response extends Operations["queries"][OperationName]["response"] = Operations["queries"][OperationName]["response"]
	>(options: OperationName extends string ? QueryRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Response extends Operations["mutations"][OperationName]["response"] = Operations["mutations"][OperationName]["response"]
	>(options: OperationName extends string ? MutationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Response extends Operations["subscriptions"][OperationName]["response"] = Operations["subscriptions"][OperationName]["response"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb?: SubscriptionEventHandler<Response["data"], Response["error"]>
	) {
		return super.subscribe<OperationRequestOptions, Response["data"], Response["error"]>(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends PublicUser = PublicUser>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: true,
	});
};

export type Queries = {
	Continents: {
		input?: undefined;
		response: { data?: ContinentsResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	Countries: {
		input: CountriesInput;
		response: { data?: CountriesResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"relay/c11158afcc8e55409b96972f20e26fa1": {
		input?: undefined;
		response: { data?: RelayC11158afcc8e55409b96972f20e26fa1Response["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"relay/ce2342daed4e1960717c581d645e335d": {
		input?: undefined;
		response: { data?: RelayCe2342daed4e1960717c581d645e335dResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponseData; error?: OperationErrors["users/get"] };
		requiresAuthentication: false;
		liveQuery: boolean;
	};
};

export type Mutations = {
	"users/update": {
		input: UsersUpdateInput;
		response: { data?: UsersUpdateResponseData; error?: OperationErrors["users/update"] };
		requiresAuthentication: false;
	};
};

export type Subscriptions = {
	"users/subscribe": {
		input: UsersSubscribeInput;
		response: { data?: UsersSubscribeResponseData; error?: OperationErrors["users/subscribe"] };
		requiresAuthentication: false;
	};
	Continents: {
		input?: undefined;
		response: { data?: ContinentsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	Countries: {
		input: CountriesInput;
		response: { data?: CountriesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"relay/c11158afcc8e55409b96972f20e26fa1": {
		input?: undefined;
		response: { data?: RelayC11158afcc8e55409b96972f20e26fa1Response["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"relay/ce2342daed4e1960717c581d645e335d": {
		input?: undefined;
		response: { data?: RelayCe2342daed4e1960717c581d645e335dResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export type LiveQueries = {
	Continents: {
		input?: undefined;
		response: { data?: ContinentsResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	Countries: {
		input: CountriesInput;
		response: { data?: CountriesResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"relay/c11158afcc8e55409b96972f20e26fa1": {
		input?: undefined;
		response: { data?: RelayC11158afcc8e55409b96972f20e26fa1Response["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"relay/ce2342daed4e1960717c581d645e335d": {
		input?: undefined;
		response: { data?: RelayCe2342daed4e1960717c581d645e335dResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
	"users/get": {
		input: UsersGetInput;
		response: { data?: UsersGetResponse["data"]; error?: ClientOperationErrors };
		liveQuery: true;
		requiresAuthentication: false;
	};
};

export interface Operations
	extends OperationsDefinition<
		Queries,
		Mutations,
		Subscriptions,
		LiveQueries,
		UserRole,
		{},
		keyof typeof AuthProviderId
	> {}
