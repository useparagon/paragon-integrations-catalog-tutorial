import { useEffect, useState } from "react";
import { AuthenticatedConnectUser, ConnectSDK, ConnectUser } from "../paragon";

// You can remove this after replacing with the logic your app uses for token generation below.
import jsonwebtoken from "jsonwebtoken";

// DO NOT USE THIS IN PRODUCTION!
const PARAGON_PROJECT_ID = "";
const PARAGON_SIGNING_KEY =
  "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n";

// DO NOT USE THIS IN PRODUCTION!
async function getParagonUserToken(
  userId: string = "REPLACE_USER_ID"
): Promise<string> {
  // Replace this with the logic that your app uses for
  // generating the Paragon User Token.
  const createdAt = Math.floor(Date.now() / 1000);
  try {
    return Promise.resolve(
      jsonwebtoken.sign(
        {
          sub: userId,
          iat: createdAt,
          exp: createdAt + 60 * 60,
        },
        PARAGON_SIGNING_KEY,
        { algorithm: "RS256" }
      )
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export default function useParagonAuth(paragon?: ConnectSDK): {
  user?: AuthenticatedConnectUser;
  error?: Error;
} {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthenticatedConnectUser | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    getParagonUserToken().then(setToken).catch(setError);
  }, []);

  // Listen for account state changes
  useEffect(() => {
    const listener = () => {
      if (paragon) {
        const authedUser = paragon.getUser();
        if (authedUser.authenticated) {
          setUser({ ...authedUser });
        }
      }
    };
    paragon?.subscribe("onIntegrationInstall", listener);
    paragon?.subscribe("onIntegrationUninstall", listener);
    return () => {
      paragon?.unsubscribe("onIntegrationInstall", listener);
      paragon?.unsubscribe("onIntegrationUninstall", listener);
    };
  }, [paragon]);

  useEffect(() => {
    if (paragon && token && !error) {
      paragon
        .authenticate(PARAGON_PROJECT_ID, token)
        .then(() => {
          const authedUser = paragon.getUser();
          if (authedUser.authenticated) {
            setUser(authedUser);
          }
        })
        .catch(setError);
    }
  }, [paragon, token, error]);

  return { user, error };
}
