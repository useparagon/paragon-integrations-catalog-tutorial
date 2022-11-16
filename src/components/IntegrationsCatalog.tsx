import { useState } from "react";
import useParagonAuth from "../hooks/useParagonAuth";
import useParagonGlobal from "../hooks/useParagonGlobal";
import IntegrationDetailView from "./IntegrationDetailView";

function IntegrationsCatalog() {
  // paragon is the SDK singleton or `undefined`
  const paragon = useParagonGlobal();
  const { user } = useParagonAuth(paragon);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  return (
    <div>
      <h1>Integrations Catalog</h1>
      <div className="catalog">
        <IntegrationDetailView
          integrationType={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
        />
        {paragon &&
          paragon.getIntegrationMetadata().map((integration) => {
            const integrationEnabled =
              user?.integrations?.[integration.type]?.enabled;
            return (
              <div
                key={integration.type}
                onClick={() => setSelectedIntegration(integration.type)}
              >
                <img src={integration.icon} width={20} height={20} />
                <p>{integration.name}</p>
                <p className="connection">
                  {integrationEnabled ? "Connected" : "Not connected"}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default IntegrationsCatalog;
