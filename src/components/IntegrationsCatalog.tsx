import useParagonAuth from "../hooks/useParagonAuth";
import useParagonGlobal from "../hooks/useParagonGlobal";

function IntegrationsCatalog() {
  // paragon is the SDK singleton or `undefined`
  const paragon = useParagonGlobal();
  const { user } = useParagonAuth(paragon);

  return (
    <div>
      <h1>Integrations Catalog</h1>
      <div className="catalog">
        {paragon &&
          paragon.getIntegrationMetadata().map((integration) => {
            const integrationEnabled = user?.integrations?.[integration.type]?.enabled;
            return (
              <div
                key={integration.type}
                onClick={() => paragon.connect(integration.type)}
              >
                <img src={integration.icon} width={20} height={20} />
                <p>{integration.name}</p>
                <p className="connection">{integrationEnabled ? "Connected" : "Not connected"}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default IntegrationsCatalog;
